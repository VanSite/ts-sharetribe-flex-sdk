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
    getToken(): Promise<AuthToken | null>;
    setToken(token: AuthToken): void;
    removeToken(): void;
}
export default BrowserStore;
