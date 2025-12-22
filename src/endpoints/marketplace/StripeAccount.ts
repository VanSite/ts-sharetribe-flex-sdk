/**
 * @fileoverview Client for managing the current user's Stripe account in the Sharetribe Marketplace API.
 *
 * Use this to:
 * - Fetch existing Stripe account status
 * - Create a new Stripe Connect account
 * - Update account details or capabilities
 *
 * Requires authentication.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#stripe-account
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {
  ExtraParameter,
  StripeAccountCreateParameter,
  StripeAccountResponse,
  StripeAccountUpdateParameter,
} from "../../types";

/**
 * Stripe Account API client (current user)
 */
class StripeAccount {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/stripe_account`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Fetch current user's Stripe account
   *
   * @returns {Promise<AxiosResponse<StripeAccountResponse<"fetch">>>}
   *
   * @example
   * const { data } = await sdk.stripeAccount.fetch();
   * console.log(data.attributes.stripeAccountData.capabilities);
   */
  async fetch(): Promise<AxiosResponse<StripeAccountResponse<"fetch">>> {
    return this.axios.get(`${this.endpoint}/fetch`, {
      headers: this.headers,
    });
  }

  /**
   * Create a new Stripe Connect account
   *
   * @template P
   * @template EP
   * @param {P & StripeAccountCreateParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<StripeAccountResponse<"create", EP>>>}
   */
  async create<
    P extends StripeAccountCreateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StripeAccountResponse<"create", EP>>> {
    return this.axios.post(
      `${this.endpoint}/create`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Update existing Stripe Connect account
   *
   * @template P
   * @template EP
   * @param {P & StripeAccountUpdateParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<StripeAccountResponse<"update", EP>>>}
   */
  async update<
    P extends StripeAccountUpdateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StripeAccountResponse<"update", EP>>> {
    return this.axios.post(
      `${this.endpoint}/update`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default StripeAccount;