"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = exports.Hash = exports.sequelize = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: 'src/db/tiny-jacob.sqlite'
});
exports.Hash = exports.sequelize.define('Hash', {
    link: { type: sequelize_1.DataTypes.TEXT },
    hash: { type: sequelize_1.DataTypes.TEXT }
}, {
    freezeTableName: true,
    timestamps: false
});
let AppService = class AppService {
    async linkFromHash(par) {
        try {
            await exports.sequelize.authenticate();
            console.log('Connection has been established successfully.');
            const links = await exports.Hash.findAndCountAll({
                where: { hash: par.hash }
            });
            if (links.count === 0) {
                return { content: '', error: 'unknownHash' };
            }
            return { content: 'http://' + links.rows[0].dataValues.link, error: '' };
        }
        catch (error) {
            console.log(error);
            return { content: '', error: 'dbConnection' };
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map