import MarketplaceApi from './index';
import { StockCompareAndSetParameter, StockResponse } from '../../types/marketplace/stock';
import { ExtraParameter } from '../../types/sharetribe';
declare class Stock {
    private readonly endpoint;
    private readonly axios;
    readonly authRequired = true;
    constructor(api: MarketplaceApi);
    compareAndSet<P extends StockCompareAndSetParameter, EP extends ExtraParameter>(params: P, extraParams: EP): Promise<import("axios").AxiosResponse<StockResponse<"compareAndSet", EP>, any>>;
}
export default Stock;
