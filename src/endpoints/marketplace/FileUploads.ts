/**
 * @fileoverview Client for obtaining signed upload URLs in the Sharetribe
 * Marketplace API.
 *
 * Returns a short-lived signed URL; the file bytes are then PUT directly to
 * that URL (outside the Sharetribe API) using the returned headers.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#file-uploads
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {FileUploadsCreateParameter, FileUploadsCreateResponse} from "../../types";

/**
 * File Uploads API client
 */
class FileUploads {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/file_uploads`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Obtain a signed URL to upload the bytes of an own file.
   *
   * @param {FileUploadsCreateParameter} params - Requires `fileId`
   * @returns {Promise<AxiosResponse<FileUploadsCreateResponse>>}
   *
   * @example
   * const { data } = await sdk.fileUploads.create({ fileId: "file-abc123" });
   * // PUT the bytes to data.data.attributes.url with attributes.headers
   */
  async create(
    params: FileUploadsCreateParameter
  ): Promise<AxiosResponse<FileUploadsCreateResponse>> {
    return this.axios.post(
      `${this.endpoint}/create`,
      {...params},
      {headers: this.headers}
    );
  }
}

export default FileUploads;
