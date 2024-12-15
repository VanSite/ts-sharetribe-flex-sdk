import { AuthToken, TokenStore } from '../../types/store';
export type BrowserStoreOptions = {
    clientId: string;
    secure?: boolean;
};
declare class BrowserStore implements TokenStore {
    expiration: number;
    private namespace;
    private readonly key;
    private readonly secure;
    constructor({ clientId, secure }: BrowserStoreOptions);
    getToken(): Promise<{
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope?: "public-read" | "trusted:user" | "user" | "integ" | undefined;
        refresh_token?: string | undefined;
    } | null>;
    setToken(token: AuthToken): void;
    removeToken(): void;
}
export default BrowserStore;
