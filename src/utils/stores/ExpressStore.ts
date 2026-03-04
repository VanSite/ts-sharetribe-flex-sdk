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
   * Defaults to false. Set to true in production (HTTPS).
   */
  secure?: boolean;
  /**
   * Whether to set httpOnly flag (prevents JavaScript access).
   * Defaults to false to match the original Sharetribe SDK behavior and allow
   * the BrowserStore to share the same cookie. Setting to true will prevent
   * client-side JavaScript from reading or writing the token cookie, which
   * breaks the shared session model between server and client SDK instances.
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
 * **Note:** This store defaults to `httpOnly: false` to match the original Sharetribe SDK behavior.
 * Server and client SDK instances share the same cookie, so httpOnly must be false
 * for the BrowserStore to read/write the token set by the server.
 */
class ExpressStore implements TokenStore {
  expiration: number = 180; // Default cookie expiration in days
  private namespace: string = "st"; // Namespace for cookie keys
  private key: string; // Generated key for the cookie
  private cookieOptions: {
    secure: boolean;
    httpOnly: boolean;
    sameSite: "strict" | "lax" | "none";
  }; // Shared cookie options for set/remove
  private req: Request; // Reference to the Express request object
  private res: Response; // Reference to the Express response object
  private currentToken: AuthToken | null = null; // Cached token

  /**
   * Initializes the `ExpressStore` with client-specific options.
   * @param options - Configuration options for the store.
   */
  constructor({clientId, req, res, secure = false, httpOnly = false, sameSite = "lax"}: ExpressStoreOptions) {
    this.key = generateKey(clientId, this.namespace);
    this.cookieOptions = {
      secure,
      httpOnly,
      sameSite,
    };

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
      ...this.cookieOptions,
    });
  }

  /**
   * Removes the authentication token from the response cookies.
   */
  removeToken(): void {
    this.currentToken = null;
    this.res.clearCookie(this.key, this.cookieOptions);
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
