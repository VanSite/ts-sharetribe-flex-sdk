/**
 * @fileoverview Client for reading shared files in the Sharetribe Marketplace API.
 *
 * Files are accessed through a file attachment (e.g. an attachment shared in a
 * transaction message), not by the file's own id.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#files
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {FilesShowParameter, FilesShowResponse} from "../../types";

/**
 * Files API client
 */
class Files {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/files`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Fetch a file the current user can access via a file attachment.
   *
   * @param {FilesShowParameter} params - Requires `fileAttachmentId`
   * @returns {Promise<AxiosResponse<FilesShowResponse>>}
   *
   * @example
   * const { data } = await sdk.files.show({ fileAttachmentId: "fa-abc123" });
   */
  async show(
    params: FilesShowParameter
  ): Promise<AxiosResponse<FilesShowResponse>> {
    return this.axios.get(`${this.endpoint}/show`, {
      headers: this.headers,
      params,
    });
  }
}

export default Files;
