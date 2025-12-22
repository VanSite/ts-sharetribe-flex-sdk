/**
 * @fileoverview Provides the AssetsApi class for interacting with the Sharetribe Asset Delivery API.
 *
 * @see https://www.sharetribe.com/api-reference/asset-delivery-api.html
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import SharetribeSdk from "../../sdk";
import {
  AssetByAliasParameter,
  AssetByVersionParameter,
  AssetResponse,
  AssetsByAliasParameter,
  AssetsByVersionParameter,
} from "../../types";

/**
 * Extracts common directory and asset names from paths.
 * All paths must share the same parent directory.
 */
const extractCommonPathAndAssets = (paths: readonly string[]) => {
  // ... implementation unchanged (robust version from before)
  if (paths.length === 0) throw new Error("Paths array must not be empty");

  const normalized = paths.map(p => p.replace(/^\/+|\/+$/g, ""));
  const parts = normalized.map(p => p.split("/"));

  let commonLength = parts[0].length - 1;
  for (let i = 1; i < parts.length && commonLength > 0; i++) {
    let j = 0;
    while (j < commonLength && parts[0][j] === parts[i][j]) j++;
    commonLength = j;
  }

  if (commonLength === 0) {
    throw new Error("All paths must share a common directory prefix");
  }

  const commonPath = parts[0].slice(0, commonLength).join("/");
  const assets = normalized.map(p => p.slice(commonPath.length + 1));

  return {commonPath, assets};
};

class AssetsApi {
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(sdk: SharetribeSdk) {
    const config = sdk.apisConfigs.assets(sdk.sdkConfig);
    this.endpoint = `${config.baseUrl}/pub/${sdk.sdkConfig.clientId}`;
    this.headers = config.headers;
    this.axios = sdk.axios;
  }

  /**
   * Fetch a single asset by alias (e.g. "latest")
   *
   * @template P
   * @param {P & AssetByAliasParameter} params
   * @returns {Promise<AxiosResponse<AssetResponse<"assetByAlias", P & AssetByAliasParameter>>>}
   */
  async assetByAlias<P extends AssetByAliasParameter>(
    params: P & AssetByAliasParameter
  ): Promise<AxiosResponse<AssetResponse<"assetByAlias", P & AssetByAliasParameter>>> {
    const {path, alias, ...rest} = params;
    if (path.startsWith("/")) throw new Error("Asset path must not start with '/'");

    const url = `${this.endpoint}/a/${encodeURIComponent(alias)}/${path}`;
    return this.axios.get(url, {headers: this.headers, params: rest});
  }

  /**
   * Fetch multiple assets by alias from the same directory
   *
   * @template P
   * @param {P & AssetsByAliasParameter} params
   * @returns {Promise<AxiosResponse<AssetResponse<"assetsByAlias", P & AssetsByAliasParameter>>>}
   */
  async assetsByAlias<P extends AssetsByAliasParameter>(
    params: P & AssetsByAliasParameter
  ): Promise<AxiosResponse<AssetResponse<"assetsByAlias", P & AssetsByAliasParameter>>> {
    const {paths, alias, ...rest} = params;
    if (paths.some(p => p.startsWith("/"))) {
      throw new Error("Asset paths must not start with '/'");
    }

    const {commonPath, assets} = extractCommonPathAndAssets(paths);
    const url = `${this.endpoint}/a/${encodeURIComponent(alias)}/${commonPath}/`;

    return this.axios.get(url, {
      headers: this.headers,
      params: {...rest, assets},
    });
  }

  /**
   * Fetch a single asset by version
   *
   * @template P
   * @param {P & AssetByVersionParameter} params
   * @returns {Promise<AxiosResponse<AssetResponse<"assetByVersion", P & AssetByVersionParameter>>>}
   */
  async assetByVersion<P extends AssetByVersionParameter>(
    params: P & AssetByVersionParameter
  ): Promise<AxiosResponse<AssetResponse<"assetByVersion", P & AssetByVersionParameter>>> {
    const {path, version, ...rest} = params;
    if (path.startsWith("/")) throw new Error("Asset path must not start with '/'");

    const url = `${this.endpoint}/v/${encodeURIComponent(version)}/${path}`;
    return this.axios.get(url, {headers: this.headers, params: rest});
  }

  /**
   * Fetch multiple assets by version from the same directory
   *
   * @template P
   * @param {P & AssetsByVersionParameter} params
   * @returns {Promise<AxiosResponse<AssetResponse<"assetsByVersion", P & AssetsByVersionParameter>>>}
   */
  async assetsByVersion<P extends AssetsByVersionParameter>(
    params: P & AssetsByVersionParameter
  ): Promise<AxiosResponse<AssetResponse<"assetsByVersion", P & AssetsByVersionParameter>>> {
    const {paths, version, ...rest} = params;
    if (paths.some(p => p.startsWith("/"))) {
      throw new Error("Asset paths must not start with '/'");
    }

    const {commonPath, assets} = extractCommonPathAndAssets(paths);
    const url = `${this.endpoint}/v/${encodeURIComponent(version)}/${commonPath}/`;

    return this.axios.get(url, {
      headers: this.headers,
      params: {...rest, assets},
    });
  }
}

export default AssetsApi;