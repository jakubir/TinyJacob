import { Controller, Post, Body } from '@nestjs/common';
import { Response, sequelize, Hash } from '../app.service'
import { createHash } from 'crypto'

@Controller('link')
export class LinkController {
@Post(':link')
async uploadHash(@Body() par): Promise<Response> {
  try {
    await sequelize.authenticate();

    const urlPattern = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/;
    if (urlPattern.test(par.link) == false)
      return {content: '', error: 'notALink'};

    let link: any = par.link.split('//');
    link = link[link.length - 1];
    par.link = link

    const hashes = await Hash.findAndCountAll({
      where: { link: par.link }
    });
    if (hashes.count !== 0) // jeśli link jest już w bazie
    return {content: hashes.rows[0].dataValues.hash, error: ''};
    
    for (let i = 0; i < 10; i++) {
      const hash = createHash('md5');
      hash.update(link);
      const hashedLink = hash.digest('hex').substring(0, 8);

      const numHash = await Hash.count({
        where: { hash: hashedLink }
      });
      if(numHash !== 0) // jeśli link nie istnieje w bazie, a mimo to hash jest w bazie
        link += Math.floor(Math.random() * 1000);
      else {
        await Hash.create({
          link: par.link, 
          hash: hashedLink
        });

        return {content: hashedLink, error: ''};
      }
    }
    return {content: '', error: 'hashNotCreated'};
  } catch (error) {
    console.log(error);
    return {content: '', error: 'dbConnection'};
  }
}}
