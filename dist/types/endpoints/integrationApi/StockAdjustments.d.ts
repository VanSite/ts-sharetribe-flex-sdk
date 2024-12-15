import MarketplaceApi from './index';
import { StockAdjustmentsCreateParameter, StockAdjustmentsQueryParameter, StockAdjustmentsResponse } from '../../types/marketplace/stockAdjustment';
import { ExtraParameter } from '../../types/sharetribe';
declare class StockAdjustments {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    constructor(api: MarketplaceApi);
    query<P extends StockAdjustmentsQueryParameter>(params: P): Promise<import("axios").AxiosResponse<StockAdjustmentsResponse<"query", P>, any>>;
    create<P extends StockAdjustmentsCreateParameter, EP extends ExtraParameter | undefined>(params: P, extraParams: EP): Promise<import("axios").AxiosResponse<StockAdjustmentsResponse<"create", P, EP>, any>>;
}
export default StockAdjustments;
