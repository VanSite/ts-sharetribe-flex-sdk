import { AuthToken, TokenStore } from '../../types/store';
declare class MemoryStore implements TokenStore {
    token: AuthToken | null;
    getToken(): Promise<AuthToken | null>;
    removeToken(): void;
    setToken(token: AuthToken): void;
}
export default MemoryStore;
