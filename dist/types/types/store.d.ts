import { AuthToken } from "./authentication";
/**
 * Represents the possible scopes for authentication tokens.
 */
type Scope = "public-read" | "trusted:user" | "user" | "integ";
/**
 * Interface for managing authentication tokens in a store.
 */
export interface TokenStore {
    token?: AuthToken | null;
    expiration?: number;
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
export {};
//# sourceMappingURL=store.d.ts.map