import { Request, Response } from 'express';
import { generateKey } from './store';
import { AuthToken, TokenStore } from '../../types/store';

/**
 * Configuration options for the `ExpressStore`.
 */
export type ExpressStoreOptions = {
  clientId: string; // Unique identifier for the client
  req: Request; // Express request object
  res: Response; // Express response object
  secure?: boolean; // Whether to use secure cookies (HTTPS only)
};

/**
 * `ExpressStore` is an implementation of the `TokenStore` interface for managing authentication tokens via cookies in an Express application.
 */
class ExpressStore implements TokenStore {
  expiration: number = 180; // Default cookie expiration in days
  private namespace: string = 'st'; // Namespace for cookie keys
  private key: string; // Generated key for the cookie
  private secure: boolean | undefined; // Indicates if cookies should be marked as secure
  private req: Request; // Reference to the Express request object
  private res: Response; // Reference to the Express response object
  private currentToken: AuthToken | null = null; // Cached token

  /**
   * Initializes the `ExpressStore` with client-specific options.
   * @param options - Configuration options for the store.
   */
  constructor({ clientId, req, res, secure }: ExpressStoreOptions) {
    this.key = generateKey(clientId, this.namespace);
    this.secure = secure;
    this.req = req;
    this.res = res;
  }

  /**
   * Reads the authentication token from the request cookies.
   * @returns The `AuthToken` if present in cookies, otherwise null.
   */
  private readCookie(): AuthToken | null {
    const cookie = this.req.cookies[this.key];
    return cookie ? (JSON.parse(cookie) as AuthToken) : null;
  }

  /**
   * Retrieves the authentication token, either from cache or from the request cookies.
   * @returns A promise that resolves to the `AuthToken` or null if no token exists.
   */
  async getToken(): Promise<AuthToken | null> {
    this.currentToken = this.currentToken || this.readCookie();
    return this.currentToken;
  }

  /**
   * Stores the authentication token in a response cookie.
   * @param token - The authentication token to store.
   */
  setToken(token: AuthToken): void {
    this.currentToken = token;
    const secureFlag = this.secure ? { secure: true } : {};
    this.res.cookie(this.key, JSON.stringify(token), {
      maxAge: 1000 * 60 * 60 * 24 * this.expiration, // Convert expiration to milliseconds
      httpOnly: true, // Ensures cookie is only accessible via HTTP(S)
      ...secureFlag,
    });
  }

  /**
   * Removes the authentication token from the response cookies.
   */
  removeToken(): void {
    this.currentToken = null;
    this.res.clearCookie(this.key);
  }
}

export default ExpressStore;
