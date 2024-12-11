import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import {
  StripeAccountCreateParameter,
  StripeAccountResponse,
  StripeAccountUpdateParameter
} from '../../types/marketplace/stripeAccount';
import { ExtraParameter } from '../../types/sharetribe';

class StripeAccount {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/stripe_account';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async fetch() {
    return this.axios.get<StripeAccountResponse<'fetch'>>(`${this.endpoint}/fetch`, {
      ...this.headers
    });
  }

  async create<P extends StripeAccountCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<StripeAccountResponse<'create', EP>>(`${this.endpoint}/create`, {...params, ...extraParams}, this.headers);
  }

  async update<P extends StripeAccountUpdateParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<StripeAccountResponse<'update', EP>>(`${this.endpoint}/update`, {...params, ...extraParams}, this.headers);
  }
}

export default StripeAccount;