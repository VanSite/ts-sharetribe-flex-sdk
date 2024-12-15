import SharetribeSdk from '../../sdk';
import { AxiosInstance } from 'axios';
import { AssetByAliasParameter, AssetByVersionParameter, AssetResponse, AssetsByAliasParameter, AssetsByVersionParameter } from '../../types/assets';
declare class AssetsApi {
    axios: AxiosInstance;
    endpoint: string;
    headers: Record<string, string>;
    constructor(sdk: SharetribeSdk);
    assetByAlias<P extends AssetByAliasParameter>(params: P): Promise<import("axios").AxiosResponse<AssetResponse<"assetByAlias", P>, any>>;
    assetsByAlias<P extends AssetsByAliasParameter>(params: P): Promise<import("axios").AxiosResponse<AssetResponse<"assetsByAlias", P>, any>>;
    assetByVersion<P extends AssetByVersionParameter>(params: P): Promise<import("axios").AxiosResponse<AssetResponse<"assetByVersion", P>, any>>;
    assetsByVersion<P extends AssetsByVersionParameter>(params: P): Promise<import("axios").AxiosResponse<AssetResponse<"assetsByVersion", P>, any>>;
}
export default AssetsApi;
