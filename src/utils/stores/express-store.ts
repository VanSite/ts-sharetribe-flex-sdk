import { Request, Response } from 'express';
import { generateKey } from './store';
import { AuthToken, TokenStore } from '../../types/store';

export type ExpressStoreOptions = {
  clientId: string;
  req: Request
  res: Response;
  secure?: boolean;
}

class ExpressStore implements TokenStore {
  expiration: number = 180;
  private namespace: string = 'st';
  private key: string;
  private secure: boolean | undefined
  private req: Request;
  private res: Response;

  private currentToken: AuthToken | null = null;

  constructor({clientId, req, res, secure}: ExpressStoreOptions) {
    this.key = generateKey(clientId, this.namespace);
    this.secure = secure;
    this.req = req;
    this.res = res;
  }

  private readCookie() {
    const cookie = this.req.cookies[this.key];
    if (cookie) {
      return JSON.parse(cookie) as AuthToken;
    }
    return null;
  }

  async getToken() {
    this.currentToken = this.currentToken || this.readCookie();
    return this.currentToken;
  }

  setToken(token: AuthToken): void {
    this.currentToken = token;
    const secureFlag = this.secure ? {secure: true} : {};
    this.res.cookie(this.key, JSON.stringify(token), {
      maxAge: 1000 * 60 * 60 * 24 * this.expiration,
      ...secureFlag
    });
  }

  removeToken(): void {
    this.currentToken = null;
    this.res.clearCookie(this.key);
  }
}

export default ExpressStore;