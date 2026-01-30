import Cookies from "js-cookie";
import {generateKey} from "./store";
import {AuthToken, TokenStore} from "../../types";

/**
 * Configuration options for the `BrowserStore`.
 */
export type BrowserStoreOptions = {
  clientId: string; // Unique identifier for the client
  /**
   * Whether to use secure cookies (HTTPS only).
   * Defaults to true for security. Set to false only for local development.
   */
  secure?: boolean;
  /**
   * SameSite cookie attribute for CSRF protection.
   * Defaults to 'Lax' for balance of security and usability.
   * Use 'Strict' for maximum security, 'None' for cross-site usage (requires secure=true).
   */
  sameSite?: "Strict" | "Lax" | "None";
};

/**
 * `BrowserStore` is an implementation of the `TokenStore` interface for storing authentication tokens in browser cookies.
 *
 * **Security Note:** This store uses JavaScript-accessible cookies. For maximum security in production,
 * consider using `ExpressStore` with `httpOnly: true` which prevents JavaScript access to tokens.
 */
class BrowserStore implements TokenStore {
  expiration: number = 30; // Default cookie expiration in days
  private namespace: string = "st"; // Namespace for cookie keys
  private readonly key: string; // Generated key for the cookie
  private readonly secure: boolean; // Indicates if cookies should be marked as secure
  private readonly sameSite: "Strict" | "Lax" | "None"; // SameSite attribute for CSRF protection

  /**
   * Initializes the `BrowserStore` with client-specific options.
   * @param options - Configuration options for the store.
   */
  constructor({clientId, secure = true, sameSite = "Lax"}: BrowserStoreOptions) {
    this.secure = secure;
    this.sameSite = sameSite;
    this.key = generateKey(clientId, this.namespace);

    // Warn if using insecure configuration
    if (!secure && typeof window !== "undefined" && window.location?.protocol === "https:") {
      console.warn("BrowserStore: secure=false on HTTPS site. Consider enabling secure cookies.");
    }
    if (sameSite === "None" && !secure) {
      console.warn("BrowserStore: sameSite='None' requires secure=true to work in modern browsers.");
    }
  }

  /**
   * Retrieves the authentication token from browser cookies.
   * @returns The `AuthToken` or null if no token exists or parsing fails.
   */
  getToken(): AuthToken | null {
    const cookie = Cookies.get(this.key);
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

  /**
   * Stores the authentication token in a browser cookie.
   * @param token - The authentication token to store.
   */
  setToken(token: AuthToken): void {
    Cookies.set(this.key, JSON.stringify(token), {
      expires: this.expiration,
      secure: this.secure,
      sameSite: this.sameSite,
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
