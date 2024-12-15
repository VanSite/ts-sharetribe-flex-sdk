import MarketplaceApi from './index';
import { StripePersonsCreateParameter, StripePersonsResponse } from '../../types/marketplace/stripePersons';
import { ExtraParameter } from '../../types/sharetribe';
declare class StripePersons {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    constructor(api: MarketplaceApi);
    create<P extends StripePersonsCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<StripePersonsResponse<"create">, any>>;
}
export default StripePersons;
