import { AppService } from '../app.service';
export declare class HashController {
    private readonly appService;
    constructor(appService: AppService);
    uploadLink(par: any): Promise<import("../app.service").Response>;
}
