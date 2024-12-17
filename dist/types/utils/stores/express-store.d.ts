import { Request, Response } from 'express';
import { AuthToken, TokenStore } from '../../types/store';
export type ExpressStoreOptions = {
    clientId: string;
    req: Request;
    res: Response;
    secure?: boolean;
};
declare class ExpressStore implements TokenStore {
    expiration: number;
    private namespace;
    private key;
    private secure;
    private req;
    private res;
    private currentToken;
    constructor({ clientId, req, res, secure }: ExpressStoreOptions);
    private readCookie;
    getToken(): Promise<AuthToken | null>;
    setToken(token: AuthToken): void;
    removeToken(): void;
}
export default ExpressStore;
