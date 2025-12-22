/**
 * @fileoverview Client for querying and sending messages in the Sharetribe Marketplace API.
 *
 * Use this to read conversation history and send messages in transactions.
 * Messages are tied to a specific transaction (order/inquiry).
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#messages
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {ExtraParameter, MessagesQueryParameter, MessagesResponse, MessagesSendParameter,} from "../../types";

/**
 * Messages API client
 */
class Messages {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/messages`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Query messages in a transaction
   *
   * @template P
   * @param {P & MessagesQueryParameter} params
   * @returns {Promise<AxiosResponse<MessagesResponse<"query", P>>>}
   *
   * @example
   * const { data } = await sdk.messages.query({
   *   transactionId: "tx-abc123"
   * });
   */
  async query<P extends MessagesQueryParameter>(
    params: P
  ): Promise<AxiosResponse<MessagesResponse<"query", P>>> {
    return this.axios.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Send a new message in a transaction
   *
   * @template P
   * @template EP
   * @param {P & MessagesSendParameter} params
   * @param {EP} [extraParams] - Optional extra parameters (e.g. `expand: true`)
   * @returns {Promise<AxiosResponse<MessagesResponse<"send", P, EP>>>}
   *
   * @example
   * await sdk.messages.send({
   *   transactionId: "tx-abc123",
   *   content: "Hi! When are you available?"
   * });
   */
  async send<
    P extends MessagesSendParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<MessagesResponse<"send", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/send`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default Messages;