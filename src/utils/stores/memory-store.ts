import { AuthToken, TokenStore } from '../../types/store';

class MemoryStore implements TokenStore{
  token: AuthToken | null = null;

  async getToken(): Promise<AuthToken | null> {
    return this.token
  }

  removeToken(): void {
    this.token = null;
  }

  setToken(token: AuthToken): void {
    this.token = token;
  }
}

export default MemoryStore;