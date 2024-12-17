type Scope = "public-read" | "trusted:user" | "user" | "integ";
export interface AuthToken {
    access_token: string;
    token_type: "bearer";
    expires_in: number;
    scope?: Scope;
    refresh_token?: string;
}
export interface TokenStore {
    token?: AuthToken | null;
    expiration?: number;
    getToken: () => Promise<AuthToken | null>;
    setToken: (args: {
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope?: Scope;
        refresh_token?: string;
    }) => void;
    removeToken: () => void;
}
export {};
