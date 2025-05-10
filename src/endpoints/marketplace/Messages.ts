/**
 * @fileoverview Provides the Messages class for managing messages in the Sharetribe Marketplace API.
 * This class allows querying and sending messages.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#messages
 */

import { AxiosInstance, AxiosResponse } from "axios";
import MarketplaceApi from "./index";
import { ExtraParameter } from "../../types/sharetribe";
import {
  MessagesQueryParameter,
  MessagesResponse,
  MessagesSendParameter,
} from "../../types/marketplace/messages";

/**
 * Class representing the Messages API.
 *
 * The Messages API provides methods to query and send messages in the marketplace.
 */
class Messages {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  /**
   * Creates an instance of the Messages class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + "/messages";
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Queries messages based on specified filters.
   *
   * @template P
   * @param {P & MessagesQueryParameter} params - Query parameters to filter messages.
   * @returns {Promise<AxiosResponse<MessagesResponse<'query', P>>>} - A promise resolving to the query results.
   *
   * @example
   * const response = await sdk.messages.query({ transactionId: 'transaction-id' });
   * const messages = response.data;
   */
  async query<P extends MessagesQueryParameter>(
    params: P
  ): Promise<AxiosResponse<MessagesResponse<"query", P>>> {
    return this.axios.get<MessagesResponse<"query", P>>(
      `${this.endpoint}/query`,
      {
        headers: this.headers,
        params,
      }
    );
  }

  /**
   * Sends a new message.
   *
   * @template P
   * @template EP
   * @param {P & MessagesSendParameter} params - Parameters specifying the message content and recipient.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<MessagesResponse<'send', P, EP>>>} - A promise resolving to the sent message details.
   *
   * @example
   * const response = await sdk.messages.send({
   *   transactionId: 'transaction-id', content: 'Hello!'
   * });
   * const sentMessage = response.data;
   */
  async send<P extends MessagesSendParameter, EP extends ExtraParameter>(
    params: P,
    extraParams: EP | void = {} as EP
  ): Promise<AxiosResponse<MessagesResponse<"send", P, EP>>> {
    return this.axios.post<MessagesResponse<"send", P, EP>>(
      `${this.endpoint}/send`,
      { ...params, ...extraParams },
      this.headers
    );
  }
}

export default Messages;
