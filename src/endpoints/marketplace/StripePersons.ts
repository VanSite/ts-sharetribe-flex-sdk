import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import { StripePersonsCreateParameter, StripePersonsResponse } from '../../types/marketplace/stripePersons';
import { ExtraParameter } from '../../types/sharetribe';

class StripePersons {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/stripe_persons';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async create<P extends StripePersonsCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<StripePersonsResponse<'create'>>(`${this.endpoint}/create`, {...params, ...extraParams}, this.headers);
  }
}

export default StripePersons;