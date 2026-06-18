/**
 * @fileoverview Client for querying files in the Sharetribe Integration API.
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#files
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import IntegrationApi from "./index";
import {FilesQueryParameter, FilesQueryResponse} from "../../types";

/**
 * Files API client (privileged)
 */
class Files {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/files`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Query files in the marketplace.
   *
   * @param {FilesQueryParameter} params
   * @returns {Promise<AxiosResponse<FilesQueryResponse>>}
   *
   * @example
   * const { data } = await sdk.files.query({ transactionId: "tx-abc123" });
   */
  async query(
    params: FilesQueryParameter
  ): Promise<AxiosResponse<FilesQueryResponse>> {
    return this.axios.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }
}

export default Files;
