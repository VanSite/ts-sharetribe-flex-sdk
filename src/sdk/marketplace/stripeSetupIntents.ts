import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import {
  StripeSetupIntentsCreateParameter,
  StripeSetupIntentsResponse
} from '../../types/marketplace/stripeSetupIntents';
import { ExtraParameter } from '../../types/sharetribe';

class StripeSetupIntents {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/stripe_setup_intents';
    this.axios = api.axios;
  }

  async create<P extends StripeSetupIntentsCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<StripeSetupIntentsResponse<'create'>>('create', {...params, ...extraParams});
  }
}

export default StripeSetupIntents;