import {AuthToken, TokenStore} from "../../types";

/**
 * `MemoryStore` is an in-memory implementation of the `TokenStore` interface.
 * It is suitable for short-lived or testing purposes, where tokens do not need to persist beyond the application's lifecycle.
 */
class MemoryStore implements TokenStore {
  token: AuthToken | null = null; // Holds the token in memory

  /**
   * Retrieves the stored authentication token.
   * @returns A promise resolving to the `AuthToken` or `null` if no token is stored.
   */
  getToken(): AuthToken | null {
    return this.token;
  }

  /**
   * Removes the stored authentication token from memory.
   */
  removeToken(): void {
    this.token = null;
  }

  /**
   * Stores the provided authentication token in memory.
   * @param token - The authentication token to store.
   */
  setToken(token: AuthToken): void {
    this.token = token;
  }
}

export default MemoryStore;
