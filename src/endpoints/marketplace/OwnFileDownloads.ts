/**
 * @fileoverview Client for obtaining signed download URLs for the current
 * user's own files in the Sharetribe Marketplace API.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#own-file-downloads
 */

import type {HttpClient, HttpResponse} from "../../types";
import MarketplaceApi from "./index";
import {
  OwnFileDownloadsCreateParameter,
  OwnFileDownloadsCreateResponse,
} from "../../types";

/**
 * Own File Downloads API client
 */
class OwnFileDownloads {
  public readonly authRequired = true;
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/own_file_downloads`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Obtain a signed download URL for one of the current user's own files.
   *
   * @param {OwnFileDownloadsCreateParameter} params - Requires `fileId`
   * @returns {Promise<HttpResponse<OwnFileDownloadsCreateResponse>>}
   *
   * @example
   * const { data } = await sdk.ownFileDownloads.create({ fileId: "file-abc123" });
   */
  async create(
    params: OwnFileDownloadsCreateParameter
  ): Promise<HttpResponse<OwnFileDownloadsCreateResponse>> {
    return this.httpClient.post(
      `${this.endpoint}/create`,
      {...params},
      {headers: this.headers}
    );
  }
}

export default OwnFileDownloads;
