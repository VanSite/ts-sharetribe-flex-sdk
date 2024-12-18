/**
 * @fileoverview Provides the StripeAccount class for managing Stripe accounts in the Sharetribe Marketplace API.
 * This class includes methods for fetching, creating, and updating Stripe accounts.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#stripe-account
 */

import { AxiosInstance, AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import {
  StripeAccountCreateParameter,
  StripeAccountResponse,
  StripeAccountUpdateParameter,
} from '../../types/marketplace/stripeAccount';
import { ExtraParameter } from '../../types/sharetribe';

/**
 * Class representing the Stripe Account API.
 *
 * The Stripe Account API provides methods for managing Stripe accounts associated with the marketplace.
 */
class StripeAccount {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  /**
   * Creates an instance of the StripeAccount class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/stripe_account';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Fetches the current Stripe account details.
   *
   * @returns {Promise<AxiosResponse<StripeAccountResponse<'fetch'>>>} - A promise resolving to the Stripe account details.
   *
   * @example
   * const response = await sdk.stripeAccount.fetch();
   * const stripeAccountDetails = response.data;
   */
  async fetch(): Promise<AxiosResponse<StripeAccountResponse<'fetch'>>> {
    return this.axios.get<StripeAccountResponse<'fetch'>>(`${this.endpoint}/fetch`, {
      headers: this.headers,
    });
  }

  /**
   * Creates a new Stripe account.
   *
   * @template P
   * @template EP
   * @param {P & StripeAccountCreateParameter} params - Parameters for creating the Stripe account.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<StripeAccountResponse<'create', EP>>>} - A promise resolving to the created Stripe account details.
   *
   * @example
   * const response = await sdk.stripeAccount.create({
   *   country: 'US',
   *   accountToken: 'account-token',
   *   bankAccountToken: 'bank-account-token',
   *   businessProfileMCC: '1234',
   *   businessProfileURL: 'https://example.com',
   *   businessProfileProductDescription: 'Product description',
   *   requestedCapabilities: ['card_payments', 'transfers'],
   * });
   * const createdStripeAccount = response.data;
   */
  async create<P extends StripeAccountCreateParameter, EP extends ExtraParameter>(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StripeAccountResponse<'create', EP>>> {
    return this.axios.post<StripeAccountResponse<'create', EP>>(
      `${this.endpoint}/create`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }

  /**
   * Updates an existing Stripe account.
   *
   * @template P
   * @template EP
   * @param {P & StripeAccountUpdateParameter} params - Parameters for updating the Stripe account.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<StripeAccountResponse<'update', EP>>>} - A promise resolving to the updated Stripe account details.
   *
   * @example
   * const response = await sdk.stripeAccount.update({
   *   accountToken: 'new-account-token',
   * });
   * const updatedStripeAccount = response.data;
   */
  async update<P extends StripeAccountUpdateParameter, EP extends ExtraParameter>(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StripeAccountResponse<'update', EP>>> {
    return this.axios.post<StripeAccountResponse<'update', EP>>(
      `${this.endpoint}/update`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }
}

export default StripeAccount;
