import MarketplaceApi from './index';
import { ListingsShowParameter, ListingsResponse, ListingsQueryParameter } from '../../types/marketplace/listings';
declare class Listings {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    constructor(api: MarketplaceApi);
    show<P extends ListingsShowParameter>(params: P): Promise<import("axios").AxiosResponse<ListingsResponse<"show", P>, any>>;
    query<P extends ListingsQueryParameter>(params: P): Promise<import("axios").AxiosResponse<ListingsResponse<"query", P>, any>>;
}
export default Listings;
