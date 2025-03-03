import { AuthToken, TokenStore } from '../../types/store';
/**
 * `MemoryStore` is an in-memory implementation of the `TokenStore` interface.
 * It is suitable for short-lived or testing purposes, where tokens do not need to persist beyond the application's lifecycle.
 */
declare class MemoryStore implements TokenStore {
    token: AuthToken | null;
    /**
     * Retrieves the stored authentication token.
     * @returns A promise resolving to the `AuthToken` or `null` if no token is stored.
     */
    getToken(): Promise<AuthToken | null>;
    /**
     * Removes the stored authentication token from memory.
     */
    removeToken(): void;
    /**
     * Stores the provided authentication token in memory.
     * @param token - The authentication token to store.
     */
    setToken(token: AuthToken): void;
}
export default MemoryStore;
