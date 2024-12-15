import MarketplaceApi from './index';
import { StripeAccountLinksCreateParameter, StripeAccountLinksResponse } from '../../types/marketplace/stripeAccountLinks';
import { ExtraParameter } from '../../types/sharetribe';
declare class StripeAccountLinks {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    constructor(api: MarketplaceApi);
    create<P extends StripeAccountLinksCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP): Promise<import("axios").AxiosResponse<StripeAccountLinksResponse<"create", EP>, any>>;
}
export default StripeAccountLinks;
