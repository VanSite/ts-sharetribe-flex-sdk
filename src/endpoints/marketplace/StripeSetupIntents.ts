/**
 * @fileoverview Client for creating Stripe Setup Intents in the Sharetribe Marketplace API.
 *
 * A Setup Intent is used to save a payment method (e.g. card) for future use
 * without charging immediately — ideal for marketplaces that charge later.
 *
 * Returns `client_secret` for use with Stripe.js / Elements.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#stripe-setup-intents
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {ExtraParameter, StripeSetupIntentsCreateParameter, StripeSetupIntentsResponse,} from "../../types";

/**
 * Stripe Setup Intents API client (current user)
 */
class StripeSetupIntents {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/stripe_setup_intents`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Create a new Setup Intent for saving a payment method
   *
   * @template P
   * @template EP
   * @param {P & StripeSetupIntentsCreateParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<StripeSetupIntentsResponse<"create">>>}
   *
   * @example
   * const { data } = await sdk.stripeSetupIntents.create({});
   *
   * // Use with Stripe.js
   * stripe.confirmCardSetup(data.attributes.clientSecret, {
   *   payment_method: { card: cardElement }
   * });
   */
  async create<
    P extends StripeSetupIntentsCreateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P = {} as P,
    extraParams?: EP
  ): Promise<AxiosResponse<StripeSetupIntentsResponse<"create">>> {
    return this.axios.post(
      `${this.endpoint}/create`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default StripeSetupIntents;