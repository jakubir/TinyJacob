"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
const crypto_1 = require("crypto");
let LinkController = class LinkController {
    async uploadHash(par) {
        try {
            await app_service_1.sequelize.authenticate();
            const urlPattern = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/;
            if (urlPattern.test(par.link) == false)
                return { content: '', error: 'notALink' };
            let link = par.link.split('//');
            link = link[link.length - 1];
            par.link = link;
            const hashes = await app_service_1.Hash.findAndCountAll({
                where: { link: par.link }
            });
            if (hashes.count !== 0)
                return { content: hashes.rows[0].dataValues.hash, error: '' };
            for (let i = 0; i < 10; i++) {
                const hash = (0, crypto_1.createHash)('md5');
                hash.update(link);
                const hashedLink = hash.digest('hex').substring(0, 8);
                const numHash = await app_service_1.Hash.count({
                    where: { hash: hashedLink }
                });
                if (numHash !== 0)
                    link += Math.floor(Math.random() * 1000);
                else {
                    await app_service_1.Hash.create({
                        link: par.link,
                        hash: hashedLink
                    });
                    return { content: hashedLink, error: '' };
                }
            }
            return { content: '', error: 'hashNotCreated' };
        }
        catch (error) {
            console.log(error);
            return { content: '', error: 'dbConnection' };
        }
    }
};
__decorate([
    (0, common_1.Post)(':link'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "uploadHash", null);
LinkController = __decorate([
    (0, common_1.Controller)('link')
], LinkController);
exports.LinkController = LinkController;
//# sourceMappingURL=link.controller.js.map