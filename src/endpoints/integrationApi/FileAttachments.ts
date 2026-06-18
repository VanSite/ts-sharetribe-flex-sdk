/**
 * @fileoverview Client for querying file attachments in the Sharetribe
 * Integration API.
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#file-attachments
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import IntegrationApi from "./index";
import {
  FileAttachmentsQueryParameter,
  FileAttachmentsQueryResponse,
} from "../../types";

/**
 * File Attachments API client (privileged)
 */
class FileAttachments {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/file_attachments`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Query file attachments in the marketplace.
   *
   * @param {FileAttachmentsQueryParameter} params
   * @returns {Promise<AxiosResponse<FileAttachmentsQueryResponse>>}
   *
   * @example
   * const { data } = await sdk.fileAttachments.query({ transactionId: "tx-abc123" });
   */
  async query(
    params: FileAttachmentsQueryParameter
  ): Promise<AxiosResponse<FileAttachmentsQueryResponse>> {
    return this.axios.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }
}

export default FileAttachments;
