import MarketplaceApi from './index';
import { StripeCustomerAddPaymentMethodParameter, StripeCustomerCreateParameter, StripeCustomerDeletePaymentMethodParameter, StripeCustomerResponse } from '../../types/marketplace/stripeCustomer';
import { ExtraParameter } from '../../types/sharetribe';
declare class StripeCustomer {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    constructor(api: MarketplaceApi);
    create<P extends StripeCustomerCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<StripeCustomerResponse<"create", P, EP>, any>>;
    addPaymentMethod<P extends StripeCustomerAddPaymentMethodParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<StripeCustomerResponse<"addPaymentMethod", P, EP>, any>>;
    deletePaymentMethod<P extends StripeCustomerDeletePaymentMethodParameter>(params: P): Promise<import("axios").AxiosResponse<StripeCustomerResponse<"deletePaymentMethod", P>, any>>;
}
export default StripeCustomer;
