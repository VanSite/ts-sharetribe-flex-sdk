/**
 * @fileoverview Provides the AssetsApi class for interacting with the Sharetribe Asset Delivery API.
 * This class includes methods to retrieve assets by alias or version.
 *
 * For more information, refer to the Asset Delivery API reference:
 * https://www.sharetribe.com/api-reference/asset-delivery-api.html
 */

import SharetribeSdk from "../../sdk";
import { AxiosInstance, AxiosResponse } from "axios";
import {
  AssetByAliasParameter,
  AssetByVersionParameter,
  AssetResponse,
  AssetsByAliasParameter,
  AssetsByVersionParameter,
} from "../../types/assets";

/**
 * Extracts the common path and asset names from a list of paths.
 *
 * @param {string[]} paths - The list of asset paths.
 * @returns {{commonPath: string, assets: string[]}} - An object containing the common path and an array of asset names.
 * @throws {Error} If the paths do not share a common prefix.
 */
const extractCommonPathAndAssets = (paths: string[]) => {
  let commonPath: string = "";
  const assets: string[] = [];
  paths.forEach((path) => {
    const prefix = path.split("/")[0];
    const asset = path.split("/")[1];
    if (!commonPath) {
      commonPath = prefix;
    } else if (commonPath !== prefix) {
      throw new Error("All paths should have the same prefix");
    }
    assets.push(asset);
  });
  return { commonPath, assets };
};

/**
 * Class representing the Assets API for interacting with the Sharetribe Asset Delivery API.
 */
class AssetsApi {
  axios: AxiosInstance;
  endpoint: string;
  headers: Record<string, string>;

  /**
   * Creates an instance of AssetsApi.
   *
   * @param {SharetribeSdk} sdk - The Sharetribe SDK instance for configuration and request handling.
   */
  constructor(sdk: SharetribeSdk) {
    const config = sdk.apisConfigs.assets(sdk.sdkConfig);
    this.endpoint = config.baseUrl + `/pub/${sdk.sdkConfig.clientId}`;
    this.headers = config.headers;
    this.axios = sdk.axios;
  }

  /**
   * Retrieves a single asset by alias.
   *
   * @template P
   * @param {P & AssetByAliasParameter} params - Parameters including alias and path for the asset.
   * @returns {Promise<AssetResponse<'assetByAlias', P>>} - A promise resolving to the asset response.
   * @throws {Error} If the path starts with a leading slash.
   */
  async assetByAlias<P extends AssetByAliasParameter>(
    params: P
  ): Promise<AxiosResponse<AssetResponse<"assetByAlias", P>>> {
    if (params.path.startsWith("/")) {
      throw new Error("Path should not start with /");
    }
    return await this.axios.get<AssetResponse<"assetByAlias", P>>(
      this.endpoint + `/a/${params.alias}/${params.path}`,
      {
        headers: this.headers,
      }
    );
  }

  /**
   * Retrieves multiple assets by alias.
   *
   * @template P
   * @param {P & AssetsByAliasParameter} params - Parameters including alias and paths for the assets.
   * @returns {Promise<AssetResponse<'assetsByAlias', P>>} - A promise resolving to the assets response.
   * @throws {Error} If any path starts with a leading slash or if paths are empty.
   */
  async assetsByAlias<P extends AssetsByAliasParameter>(
    params: P
  ): Promise<AxiosResponse<AssetResponse<"assetsByAlias", P>>> {
    if (params.paths.some((path) => path.startsWith("/"))) {
      throw new Error("Path should not start with /");
    }
    const { commonPath, assets } = extractCommonPathAndAssets(params.paths);
    if (!commonPath) {
      throw new Error("Paths should not be empty");
    }
    return await this.axios.get<AssetResponse<"assetsByAlias", P>>(
      this.endpoint + `/a/${params.alias}/${commonPath}/`,
      {
        headers: this.headers,
        params: {
          assets: assets,
        },
      }
    );
  }

  /**
   * Retrieves a single asset by version.
   *
   * @template P
   * @param {P & AssetByVersionParameter} params - Parameters including version and path for the asset.
   * @returns {Promise<AssetResponse<'assetByVersion', P>>} - A promise resolving to the asset response.
   * @throws {Error} If the path starts with a leading slash.
   */
  async assetByVersion<P extends AssetByVersionParameter>(
    params: P
  ): Promise<AxiosResponse<AssetResponse<"assetByVersion", P>>> {
    if (params.path.startsWith("/")) {
      throw new Error("Path should not start with /");
    }
    return await this.axios.get<AssetResponse<"assetByVersion", P>>(
      this.endpoint + `/v/${params.version}/${params.path}`,
      {
        headers: this.headers,
      }
    );
  }

  /**
   * Retrieves multiple assets by version.
   *
   * @template P
   * @param {P & AssetsByVersionParameter} params - Parameters including version and paths for the assets.
   * @returns {Promise<AssetResponse<'assetsByVersion', P>>} - A promise resolving to the assets response.
   * @throws {Error} If any path starts with a leading slash.
   */
  async assetsByVersion<P extends AssetsByVersionParameter>(
    params: P
  ): Promise<AxiosResponse<AssetResponse<"assetsByVersion", P>>> {
    if (params.paths.some((path) => path.startsWith("/"))) {
      throw new Error("Path should not start with /");
    }
    const { commonPath, assets } = extractCommonPathAndAssets(params.paths);
    return await this.axios.get<AssetResponse<"assetsByVersion", P>>(
      this.endpoint + `/v/${params.version}/${commonPath}/`,
      {
        headers: this.headers,
        params: {
          paths: assets,
        },
      }
    );
  }
}

export default AssetsApi;
