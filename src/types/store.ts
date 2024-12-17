// The scope can be one of these strings
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

  // Returns a Promise that resolves to either an AuthToken or null
  getToken: () => Promise<AuthToken | null>;

  // Accepts an object that matches the AuthToken fields
  setToken: (args: {
    access_token: string;
    token_type: "bearer";
    expires_in: number;
    scope?: Scope;
    refresh_token?: string;
  }) => void;

  removeToken: () => void;
}