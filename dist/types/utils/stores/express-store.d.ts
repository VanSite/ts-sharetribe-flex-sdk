import { Request, Response } from 'express';
import { AuthToken, TokenStore } from '../../types/store';
/**
 * Configuration options for the `ExpressStore`.
 */
export type ExpressStoreOptions = {
    clientId: string;
    req: Request;
    res: Response;
    secure?: boolean;
};
/**
 * `ExpressStore` is an implementation of the `TokenStore` interface for managing authentication tokens via cookies in an Express application.
 */
declare class ExpressStore implements TokenStore {
    expiration: number;
    private namespace;
    private key;
    private secure;
    private req;
    private res;
    private currentToken;
    /**
     * Initializes the `ExpressStore` with client-specific options.
     * @param options - Configuration options for the store.
     */
    constructor({ clientId, req, res, secure }: ExpressStoreOptions);
    /**
     * Reads the authentication token from the request cookies.
     * @returns The `AuthToken` if present in cookies, otherwise null.
     */
    private readCookie;
    /**
     * Retrieves the authentication token, either from cache or from the request cookies.
     * @returns A promise that resolves to the `AuthToken` or null if no token exists.
     */
    getToken(): Promise<AuthToken | null>;
    /**
     * Stores the authentication token in a response cookie.
     * @param token - The authentication token to store.
     */
    setToken(token: AuthToken): void;
    /**
     * Removes the authentication token from the response cookies.
     */
    removeToken(): void;
}
export default ExpressStore;
