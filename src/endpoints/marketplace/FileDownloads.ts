/**
 * @fileoverview Client for obtaining signed download URLs for shared files in
 * the Sharetribe Marketplace API.
 *
 * Resolves a file attachment to a short-lived signed download URL.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#file-downloads
 */

import type {HttpClient, HttpResponse} from "../../types";
import type MarketplaceApi from "./index";
import {FileDownloadsCreateParameter, FileDownloadsCreateResponse} from "../../types";

/**
 * File Downloads API client
 */
class FileDownloads {
  public readonly authRequired = true;
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/file_downloads`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Obtain a signed download URL for a file accessed via a file attachment.
   *
   * @param {FileDownloadsCreateParameter} params - Requires `fileAttachmentId`
   * @returns {Promise<HttpResponse<FileDownloadsCreateResponse>>}
   *
   * @example
   * const { data } = await sdk.fileDownloads.create({ fileAttachmentId: "fa-abc123" });
   */
  async create(
    params: FileDownloadsCreateParameter
  ): Promise<HttpResponse<FileDownloadsCreateResponse>> {
    return this.httpClient.post(
      `${this.endpoint}/create`,
      {...params},
      {headers: this.headers}
    );
  }
}

export default FileDownloads;
