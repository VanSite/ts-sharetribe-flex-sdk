import MarketplaceApi from './index';
import { StripeAccountCreateParameter, StripeAccountResponse, StripeAccountUpdateParameter } from '../../types/marketplace/stripeAccount';
import { ExtraParameter } from '../../types/sharetribe';
declare class StripeAccount {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    constructor(api: MarketplaceApi);
    fetch(): Promise<import("axios").AxiosResponse<StripeAccountResponse<"fetch">, any>>;
    create<P extends StripeAccountCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<StripeAccountResponse<"create", EP>, any>>;
    update<P extends StripeAccountUpdateParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<StripeAccountResponse<"update", EP>, any>>;
}
export default StripeAccount;
