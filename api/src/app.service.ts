import { Injectable} from '@nestjs/common';
import { Sequelize, DataTypes } from 'sequelize';

export type Response = {
  content: string,
  error: string
};

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/db/tiny-jacob.sqlite'
});

export const Hash = sequelize.define('Hash', {
  link: {type: DataTypes.TEXT},
  hash: {type: DataTypes.TEXT}
}, {
  freezeTableName: true,
  timestamps: false
});

@Injectable()
export class AppService {
  async linkFromHash(par): Promise<Response> {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const links = await Hash.findAndCountAll({
      where: { hash: par.hash }
    });
    if (links.count === 0) { // jeśli podany hash nie istnieje jeszcze w bazie
      return {content: '', error: 'unknownHash'};
    }

    return {content: 'http://' + links.rows[0].dataValues.link, error: ''};
  } catch (error) {
    console.log(error);
    return {content: '', error: 'dbConnection'};
  }
}}
