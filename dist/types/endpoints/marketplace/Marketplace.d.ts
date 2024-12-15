import MarketplaceApi from './index';
import { MarketplaceResponse } from '../../types/marketplace/marketplace';
declare class Marketplace {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    constructor(api: MarketplaceApi);
    show(): Promise<import("axios").AxiosResponse<MarketplaceResponse<"show">, any>>;
}
export default Marketplace;
