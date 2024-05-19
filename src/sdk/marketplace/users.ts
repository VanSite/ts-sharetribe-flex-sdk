import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import { UsersResponse, UsersShowParameter } from '../../types/marketplace/user';

class Users {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/users';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async show<P extends UsersShowParameter>(params: P) {
    return this.axios.get<UsersResponse<'show', P>>(`${this.endpoint}/show`, {
      ...this.headers,
      params
    })
  }
}

export default Users;