import { Sequelize } from 'sequelize';
export type Response = {
    content: string;
    error: string;
};
export declare const sequelize: Sequelize;
export declare const Hash: import("sequelize").ModelCtor<import("sequelize").Model<any, any>>;
export declare class AppService {
    linkFromHash(par: any): Promise<Response>;
}
