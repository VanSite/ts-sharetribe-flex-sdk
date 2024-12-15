import MarketplaceApi from './index';
import { ListingsApproveParameter, ListingsCloseParameter, ListingsCreateParameter, ListingsOpenParameter, ListingsQueryParameter, ListingsResponse, ListingsShowParameter, ListingsUpdateParameter } from '../../types/marketplace/listings';
import { ExtraParameter } from "../../types/sharetribe";
declare class Listings {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    constructor(api: MarketplaceApi);
    show<P extends ListingsShowParameter>(params: P): Promise<import("axios").AxiosResponse<ListingsResponse<"show", P>, any>>;
    query<P extends ListingsQueryParameter>(params: P): Promise<import("axios").AxiosResponse<ListingsResponse<"query", P>, any>>;
    create<P extends ListingsCreateParameter, EP extends ExtraParameter>(params: ListingsCreateParameter, extraParams: EP | void): Promise<import("axios").AxiosResponse<ListingsResponse<"create", P, EP>, any>>;
    update<P extends ListingsUpdateParameter, EP extends ExtraParameter>(params: ListingsUpdateParameter, extraParams: EP | void): Promise<import("axios").AxiosResponse<ListingsResponse<"update", P, EP>, any>>;
    close<P extends ListingsCloseParameter, EP extends ExtraParameter>(params: ListingsCloseParameter, extraParams: EP | void): Promise<import("axios").AxiosResponse<ListingsResponse<"close", P, EP>, any>>;
    open<P extends ListingsOpenParameter, EP extends ExtraParameter>(params: ListingsOpenParameter, extraParams: EP | void): Promise<import("axios").AxiosResponse<ListingsResponse<"open", P, EP>, any>>;
    approve<P extends ListingsApproveParameter, EP extends ExtraParameter>(params: ListingsApproveParameter, extraParams: EP | void): Promise<import("axios").AxiosResponse<ListingsResponse<"approve", P, EP>, any>>;
}
export default Listings;
