/**
 * @fileoverview Provides the AssetsApi class for interacting with the Sharetribe Asset Delivery API.
 * This class includes methods to retrieve assets by alias or version.
 *
 * For more information, refer to the Asset Delivery API reference:
 * https://www.sharetribe.com/api-reference/asset-delivery-api.html
 */
import SharetribeSdk from "../../sdk";
import { AxiosInstance, AxiosResponse } from "axios";
import { AssetByAliasParameter, AssetByVersionParameter, AssetResponse, AssetsByAliasParameter, AssetsByVersionParameter } from "../../types/assets";
/**
 * Class representing the Assets API for interacting with the Sharetribe Asset Delivery API.
 */
declare class AssetsApi {
    axios: AxiosInstance;
    endpoint: string;
    headers: Record<string, string>;
    /**
     * Creates an instance of AssetsApi.
     *
     * @param {SharetribeSdk} sdk - The Sharetribe SDK instance for configuration and request handling.
     */
    constructor(sdk: SharetribeSdk);
    /**
     * Retrieves a single asset by alias.
     *
     * @template P
     * @param {P & AssetByAliasParameter} params - Parameters including alias and path for the asset.
     * @returns {Promise<AssetResponse<'assetByAlias', P>>} - A promise resolving to the asset response.
     * @throws {Error} If the path starts with a leading slash.
     */
    assetByAlias<P extends AssetByAliasParameter>(params: P): Promise<AxiosResponse<AssetResponse<"assetByAlias", P>>>;
    /**
     * Retrieves multiple assets by alias.
     *
     * @template P
     * @param {P & AssetsByAliasParameter} params - Parameters including alias and paths for the assets.
     * @returns {Promise<AssetResponse<'assetsByAlias', P>>} - A promise resolving to the assets response.
     * @throws {Error} If any path starts with a leading slash or if paths are empty.
     */
    assetsByAlias<P extends AssetsByAliasParameter>(params: P): Promise<AxiosResponse<AssetResponse<"assetsByAlias", P>>>;
    /**
     * Retrieves a single asset by version.
     *
     * @template P
     * @param {P & AssetByVersionParameter} params - Parameters including version and path for the asset.
     * @returns {Promise<AssetResponse<'assetByVersion', P>>} - A promise resolving to the asset response.
     * @throws {Error} If the path starts with a leading slash.
     */
    assetByVersion<P extends AssetByVersionParameter>(params: P): Promise<AxiosResponse<AssetResponse<"assetByVersion", P>>>;
    /**
     * Retrieves multiple assets by version.
     *
     * @template P
     * @param {P & AssetsByVersionParameter} params - Parameters including version and paths for the assets.
     * @returns {Promise<AssetResponse<'assetsByVersion', P>>} - A promise resolving to the assets response.
     * @throws {Error} If any path starts with a leading slash.
     */
    assetsByVersion<P extends AssetsByVersionParameter>(params: P): Promise<AxiosResponse<AssetResponse<"assetsByVersion", P>>>;
}
export default AssetsApi;
//# sourceMappingURL=index.d.ts.map