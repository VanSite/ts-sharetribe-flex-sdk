import Cookies from "js-cookie";
import { generateKey } from "./store";
import { TokenStore } from "../../types/store";
import { AuthToken } from "../../types/authentication";

/**
 * Configuration options for the `BrowserStore`.
 */
export type BrowserStoreOptions = {
  clientId: string; // Unique identifier for the client
  secure?: boolean; // Whether to use secure cookies (HTTPS only)
};

/**
 * `BrowserStore` is an implementation of the `TokenStore` interface for storing authentication tokens in browser cookies.
 */
class BrowserStore implements TokenStore {
  expiration: number = 30; // Default cookie expiration in days
  private namespace: string = "st"; // Namespace for cookie keys
  private readonly key: string; // Generated key for the cookie
  private readonly secure: boolean | undefined; // Indicates if cookies should be marked as secure

  /**
   * Initializes the `BrowserStore` with client-specific options.
   * @param options - Configuration options for the store.
   */
  constructor({ clientId, secure }: BrowserStoreOptions) {
    this.secure = secure;
    this.key = generateKey(clientId, this.namespace);
  }

  /**
   * Retrieves the authentication token from browser cookies.
   * @returns A promise that resolves to the `AuthToken` or null if no token exists.
   */
  getToken(): AuthToken | null {
    const cookie = Cookies.get(this.key);
    return cookie ? (JSON.parse(cookie) as AuthToken) : null;
  }

  /**
   * Stores the authentication token in a browser cookie.
   * @param token - The authentication token to store.
   */
  setToken(token: AuthToken): void {
    const secureFlag = this.secure ? { secure: true } : {};
    Cookies.set(this.key, JSON.stringify(token), {
      expires: this.expiration,
      ...secureFlag,
    });
  }

  /**
   * Removes the authentication token from browser cookies.
   */
  removeToken(): void {
    Cookies.remove(this.key);
  }
}

export default BrowserStore;
