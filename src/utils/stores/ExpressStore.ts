import {Request, Response} from "express";
import {generateKey} from "./store";
import {AuthToken, TokenStore} from "../../types";

/**
 * Configuration options for the `ExpressStore`.
 */
export type ExpressStoreOptions = {
  clientId: string; // Unique identifier for the client
  req: Request; // Express request object
  res: Response; // Express response object
  /**
   * Whether to use secure cookies (HTTPS only).
   * Defaults to true for security. Set to false only for local development.
   */
  secure?: boolean;
  /**
   * Whether to set httpOnly flag (prevents JavaScript access).
   * Defaults to true for security. This is the recommended setting for server-side token storage.
   */
  httpOnly?: boolean;
  /**
   * SameSite cookie attribute for CSRF protection.
   * Defaults to 'Lax' for balance of security and usability.
   */
  sameSite?: "strict" | "lax" | "none";
};

/**
 * `ExpressStore` is an implementation of the `TokenStore` interface for managing authentication tokens via cookies in an Express application.
 *
 * **Security Note:** This store supports `httpOnly` cookies (default: true), which prevents JavaScript access to tokens
 * and is the recommended approach for production server-side token storage.
 */
class ExpressStore implements TokenStore {
  expiration: number = 180; // Default cookie expiration in days
  private namespace: string = "st"; // Namespace for cookie keys
  private key: string; // Generated key for the cookie
  private secure: boolean; // Indicates if cookies should be marked as secure
  private httpOnly: boolean; // Prevents JavaScript access to cookie
  private sameSite: "strict" | "lax" | "none"; // SameSite attribute for CSRF protection
  private req: Request; // Reference to the Express request object
  private res: Response; // Reference to the Express response object
  private currentToken: AuthToken | null = null; // Cached token

  /**
   * Initializes the `ExpressStore` with client-specific options.
   * @param options - Configuration options for the store.
   */
  constructor({clientId, req, res, secure = false, httpOnly = true, sameSite = "lax"}: ExpressStoreOptions) {
    this.key = generateKey(clientId, this.namespace);
    this.secure = secure;
    this.httpOnly = httpOnly;
    this.sameSite = sameSite;

    if (!req || !res) {
      throw new Error("Request and Response are required");
    }

    this.req = req;
    this.res = res;

    // Warn if using insecure configuration in production
    if (sameSite === "none" && !secure) {
      console.warn("ExpressStore: sameSite='none' requires secure=true to work in modern browsers.");
    }
  }

  /**
   * Retrieves the authentication token, either from cache or from the request cookies.
   * @returns A promise that resolves to the `AuthToken` or null if no token exists.
   */
  getToken(): AuthToken | null {
    this.currentToken = this.currentToken || this.readCookie();
    return this.currentToken;
  }

  /**
   * Stores the authentication token in a response cookie.
   * @param token - The authentication token to store.
   */
  setToken(token: AuthToken): void {
    this.currentToken = token;
    this.res.cookie(this.key, JSON.stringify(token), {
      maxAge: 1000 * 60 * 60 * 24 * this.expiration, // Convert expiration to milliseconds
      secure: this.secure,
      httpOnly: this.httpOnly,
      sameSite: this.sameSite,
    });
  }

  /**
   * Removes the authentication token from the response cookies.
   */
  removeToken(): void {
    this.currentToken = null;
    this.res.clearCookie(this.key, {
      secure: this.secure,
      httpOnly: this.httpOnly,
      sameSite: this.sameSite,
    });
  }

  /**
   * Reads the authentication token from the request cookies.
   * @returns The `AuthToken` if present in cookies, otherwise null.
   */
  private readCookie(): AuthToken | null {
    const cookie = this.req.cookies[this.key];
    if (!cookie) {
      return null;
    }
    try {
      return JSON.parse(cookie) as AuthToken;
    } catch {
      // Corrupted cookie - remove it and return null
      this.removeToken();
      return null;
    }
  }
}

export default ExpressStore;
