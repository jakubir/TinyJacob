import { AppService } from '../app.service';
export declare class RedirectController {
    private readonly appService;
    constructor(appService: AppService);
    getRedirected(par: any): Promise<Error | {
        url: string;
    }>;
}
