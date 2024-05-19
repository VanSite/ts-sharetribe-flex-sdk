import Cookies from 'js-cookie';
import { generateKey } from './store';
import { AuthToken, TokenStore } from '../../types/store';

export type BrowserStoreOptions = {
  clientId: string;
  secure?: boolean;
}

class BrowserStore implements TokenStore {
  private expiration: number = 30;
  private namespace: string = 'st';
  private readonly key: string;
  private readonly secure: boolean | undefined

  constructor({clientId, secure}: BrowserStoreOptions) {
    this.secure = secure;
    this.key = generateKey(clientId, this.namespace);
  }

  async getToken() {
    const cookie = Cookies.get(this.key);
    return cookie ? JSON.parse(cookie) as AuthToken : null;
  }

  setToken(token: AuthToken): void {
    const secureFlag = this.secure ? {secure: true} : {};
    Cookies.set(this.key, JSON.stringify(token), {expires: this.expiration, ...secureFlag});
  }

  removeToken(): void {
    Cookies.remove(this.key);
  }
}

export default BrowserStore;