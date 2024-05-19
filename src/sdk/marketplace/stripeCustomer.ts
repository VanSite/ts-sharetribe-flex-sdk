import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import {
  StripeCustomerAddPaymentMethodParameter,
  StripeCustomerCreateParameter,
  StripeCustomerDeletePaymentMethodParameter, StripeCustomerResponse
} from '../../types/marketplace/stripeCustomer';
import { ExtraParameter } from '../../types/sharetribe';

class StripeCustomer {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/stripe_customer';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async create<P extends StripeCustomerCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<StripeCustomerResponse<'create', P, EP>>(`${this.endpoint}/create`, {...params, ...extraParams}, this.headers);
  }

  async addPaymentMethod<P extends StripeCustomerAddPaymentMethodParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<StripeCustomerResponse<'addPaymentMethod', P, EP>>(`${this.endpoint}/add_payment_method`, {...params, ...extraParams}, this.headers);
  }

  async deletePaymentMethod<P extends StripeCustomerDeletePaymentMethodParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<StripeCustomerResponse<'deletePaymentMethod', P, EP>>(`${this.endpoint}/delete_payment_method`, params, this.headers);
  }
}

export default StripeCustomer;