import MarketplaceApi from './index';
import { StripeSetupIntentsCreateParameter, StripeSetupIntentsResponse } from '../../types/marketplace/stripeSetupIntents';
import { ExtraParameter } from '../../types/sharetribe';
declare class StripeSetupIntents {
    private readonly endpoint;
    private readonly axios;
    readonly authRequired = true;
    constructor(api: MarketplaceApi);
    create<P extends StripeSetupIntentsCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<StripeSetupIntentsResponse<"create">, any>>;
}
export default StripeSetupIntents;
