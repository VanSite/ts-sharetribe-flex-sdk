import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import {
  PasswordResetRequestParams,
  PasswordResetResetParams,
  PasswordResetResponse
} from '../../types/marketplace/passwordReset';
import { ExtraParameter } from '../../types/sharetribe';

class PasswordReset {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/password_reset';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async request<P extends PasswordResetRequestParams, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<PasswordResetResponse<'request', EP>>(`${this.endpoint}/request`, {...params, ...extraParams}, this.headers);
  }

  async reset<P extends PasswordResetResetParams, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<PasswordResetResponse<'reset', EP>>(`${this.endpoint}/reset`, {...params, ...extraParams}, this.headers);
  }
}

export default PasswordReset;