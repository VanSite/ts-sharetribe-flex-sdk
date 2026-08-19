/**
 * @fileoverview Client for querying files in the Sharetribe Integration API.
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#files
 */

import type {HttpClient, HttpResponse} from "../../types";
import type IntegrationApi from "./index";
import {FilesQueryParameter, FilesQueryResponse} from "../../types";

/**
 * Files API client (privileged)
 */
class Files {
  public readonly authRequired = true;
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/files`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Query files in the marketplace.
   *
   * @param {FilesQueryParameter} params
   * @returns {Promise<HttpResponse<FilesQueryResponse>>}
   *
   * @example
   * const { data } = await sdk.files.query({ transactionId: "tx-abc123" });
   */
  async query(
    params: FilesQueryParameter
  ): Promise<HttpResponse<FilesQueryResponse>> {
    return this.httpClient.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }
}

export default Files;
