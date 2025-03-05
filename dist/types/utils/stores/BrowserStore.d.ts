import { TokenStore } from "../../types/store";
import { AuthToken } from "../../types/authentication";
/**
 * Configuration options for the `BrowserStore`.
 */
export type BrowserStoreOptions = {
    clientId: string;
    secure?: boolean;
};
/**
 * `BrowserStore` is an implementation of the `TokenStore` interface for storing authentication tokens in browser cookies.
 */
declare class BrowserStore implements TokenStore {
    expiration: number;
    private namespace;
    private readonly key;
    private readonly secure;
    /**
     * Initializes the `BrowserStore` with client-specific options.
     * @param options - Configuration options for the store.
     */
    constructor({ clientId, secure }: BrowserStoreOptions);
    /**
     * Retrieves the authentication token from browser cookies.
     * @returns A promise that resolves to the `AuthToken` or null if no token exists.
     */
    getToken(): Promise<AuthToken | null>;
    /**
     * Stores the authentication token in a browser cookie.
     * @param token - The authentication token to store.
     */
    setToken(token: AuthToken): void;
    /**
     * Removes the authentication token from browser cookies.
     */
    removeToken(): void;
}
export default BrowserStore;
//# sourceMappingURL=BrowserStore.d.ts.map