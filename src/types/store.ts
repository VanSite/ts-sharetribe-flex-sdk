/**
 * Represents the possible scopes for authentication tokens.
 */
type Scope = "public-read" | "trusted:user" | "user" | "integ";

/**
 * Represents an authentication token used for API requests.
 */
export interface AuthToken {
  access_token: string; // The token used for authorization
  token_type: "bearer"; // Type of the token, typically "bearer"
  expires_in: number;   // Time (in seconds) until the token expires
  scope?: Scope;        // Optional scope of the token
  refresh_token?: string; // Optional token for refreshing the access token
}

/**
 * Interface for managing authentication tokens in a store.
 */
export interface TokenStore {
  token?: AuthToken | null;  // The current token in the store
  expiration?: number;       // Expiration timestamp of the token

  /**
   * Retrieves the current authentication token.
   * @returns A promise resolving to the current token or null if no token exists.
   */
  getToken: () => Promise<AuthToken | null>;

  /**
   * Sets a new authentication token.
   * @param args - Object containing the token's details.
   */
  setToken: (args: {
    access_token: string;
    token_type: "bearer";
    expires_in: number;
    scope?: Scope;
    refresh_token?: string;
  }) => void;

  /**
   * Removes the current authentication token.
   */
  removeToken: () => void;
}
