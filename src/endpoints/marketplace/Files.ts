/**
 * @fileoverview Client for reading shared files in the Sharetribe Marketplace API.
 *
 * Files are accessed through a file attachment (e.g. an attachment shared in a
 * transaction message), not by the file's own id.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#files
 */

import type {HttpClient, HttpResponse} from "../../types";
import MarketplaceApi from "./index";
import {FilesShowParameter, FilesShowResponse} from "../../types";

/**
 * Files API client
 */
class Files {
  public readonly authRequired = true;
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/files`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Fetch a file the current user can access via a file attachment.
   *
   * @param {FilesShowParameter} params - Requires `fileAttachmentId`
   * @returns {Promise<HttpResponse<FilesShowResponse>>}
   *
   * @example
   * const { data } = await sdk.files.show({ fileAttachmentId: "fa-abc123" });
   */
  async show(
    params: FilesShowParameter
  ): Promise<HttpResponse<FilesShowResponse>> {
    return this.httpClient.get(`${this.endpoint}/show`, {
      headers: this.headers,
      params,
    });
  }
}

export default Files;
