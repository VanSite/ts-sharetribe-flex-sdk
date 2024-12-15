import MarketplaceApi from './index';
import { AvailabilityExceptionsCreateParameter, AvailabilityExceptionsDeleteParameter, AvailabilityExceptionsQueryParameter, AvailabilityExceptionsResponse } from '../../types/marketplace/availabilityExceptions';
import { ExtraParameter } from '../../types/sharetribe';
declare class AvailabilityExceptions {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    constructor(api: MarketplaceApi);
    query<P extends AvailabilityExceptionsQueryParameter>(params: P): Promise<import("axios").AxiosResponse<AvailabilityExceptionsResponse<"query", P>, any>>;
    create<P extends AvailabilityExceptionsCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<AvailabilityExceptionsResponse<"create", P, EP>, any>>;
    delete<P extends AvailabilityExceptionsDeleteParameter>(params: P): Promise<import("axios").AxiosResponse<AvailabilityExceptionsResponse<"delete", P>, any>>;
}
export default AvailabilityExceptions;
