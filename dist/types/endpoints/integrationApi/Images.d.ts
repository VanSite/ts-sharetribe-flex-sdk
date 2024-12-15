import MarketplaceApi from './index';
import { ImagesResponse, ImagesUploadParameter } from '../../types/marketplace/images';
import { ExtraParameter } from '../../types/sharetribe';
declare class Images {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    constructor(api: MarketplaceApi);
    upload<P extends ImagesUploadParameter, EP extends ExtraParameter>(params: P, extraParams: EP): Promise<import("axios").AxiosResponse<ImagesResponse<"upload", EP>, any>>;
}
export default Images;
