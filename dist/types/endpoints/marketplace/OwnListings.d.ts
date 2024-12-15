import MarketplaceApi from './index';
import { OwnListingsAddImageParameter, OwnListingsCloseParameter, OwnListingsCreateDraftParameter, OwnListingsCreateParameter, OwnListingsDiscardDraftParameter, OwnListingsOpenParameter, OwnListingsPublishDraftParameter, OwnListingsQueryParameter, OwnListingsResponse, OwnListingsShowParameter, OwnListingsUpdateParameter } from '../../types/marketplace/ownListings';
import { ExtraParameter } from '../../types/sharetribe';
declare class OwnListings {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    constructor(api: MarketplaceApi);
    show<P extends OwnListingsShowParameter>(params: OwnListingsShowParameter): Promise<import("axios").AxiosResponse<OwnListingsResponse<"show", P>, any>>;
    query<P extends OwnListingsQueryParameter>(params: OwnListingsQueryParameter): Promise<import("axios").AxiosResponse<OwnListingsResponse<"query", P>, any>>;
    create<P extends OwnListingsCreateParameter, EP extends ExtraParameter>(params: OwnListingsCreateParameter, extraParams: EP | void): Promise<import("axios").AxiosResponse<OwnListingsResponse<"create", P, EP>, any>>;
    createDraft<P extends OwnListingsCreateDraftParameter, EP extends ExtraParameter>(params: OwnListingsCreateDraftParameter, extraParams: EP | void): Promise<import("axios").AxiosResponse<OwnListingsResponse<"createDraft", P, EP>, any>>;
    update<P extends OwnListingsUpdateParameter, EP extends ExtraParameter>(params: OwnListingsUpdateParameter, extraParams: EP | void): Promise<import("axios").AxiosResponse<OwnListingsResponse<"update", P, EP>, any>>;
    publishDraft<P extends OwnListingsPublishDraftParameter, EP extends ExtraParameter>(params: OwnListingsPublishDraftParameter, extraParams: EP | void): Promise<import("axios").AxiosResponse<OwnListingsResponse<"publishDraft", P, EP>, any>>;
    discardDraft<P extends OwnListingsDiscardDraftParameter>(params: OwnListingsDiscardDraftParameter): Promise<import("axios").AxiosResponse<OwnListingsResponse<"discardDraft", P>, any>>;
    close<P extends OwnListingsCloseParameter, EP extends ExtraParameter>(params: OwnListingsCloseParameter, extraParams: EP | void): Promise<import("axios").AxiosResponse<OwnListingsResponse<"close", P>, any>>;
    open<P extends OwnListingsOpenParameter, EP extends ExtraParameter>(params: OwnListingsOpenParameter, extraParams: EP | void): Promise<import("axios").AxiosResponse<OwnListingsResponse<"open", P>, any>>;
    addImage<P extends OwnListingsAddImageParameter, EP extends ExtraParameter>(params: OwnListingsAddImageParameter, extraParams: EP | void): Promise<import("axios").AxiosResponse<OwnListingsResponse<"addImage", P>, any>>;
}
export default OwnListings;
