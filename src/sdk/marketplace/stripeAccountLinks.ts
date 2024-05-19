import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import {
  StripeAccountLinksCreateParameter,
  StripeAccountLinksResponse
} from '../../types/marketplace/stripeAccountLinks';
import { ExtraParameter } from '../../types/sharetribe';

class StripeAccountLinks{
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/stripe_account_links';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async create<P extends StripeAccountLinksCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP) {
    return this.axios.post<StripeAccountLinksResponse<'create', EP>>(`${this.endpoint}/create`, {...params, ...extraParams}, this.headers);
  }
}

export default StripeAccountLinks;