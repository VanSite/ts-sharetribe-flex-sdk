/**
 * @fileoverview Provides the StripeSetupIntents class for managing Stripe Setup Intents in the Sharetribe Marketplace API.
 * This class includes methods for creating Stripe Setup Intents to set up payment methods for future use.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#create-stripe-person
 */

import { AxiosInstance, AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import {
  StripeSetupIntentsCreateParameter,
  StripeSetupIntentsResponse,
} from '../../types/marketplace/stripeSetupIntents';
import { ExtraParameter } from '../../types/sharetribe';

/**
 * Class representing the Stripe Setup Intents API.
 *
 * The Stripe Setup Intents API provides methods to securely create Setup Intents for Stripe payments.
 */
class StripeSetupIntents {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  public readonly authRequired = true;

  /**
   * Creates an instance of the StripeSetupIntents class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/stripe_setup_intents';
    this.axios = api.axios;
  }

  /**
   * Creates a new Stripe Setup Intent.
   *
   * @template P
   * @template EP
   * @param {P & StripeSetupIntentsCreateParameter} params - Parameters required to create the Stripe Setup Intent.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<StripeSetupIntentsResponse<'create'>>>} - A promise resolving to the created Setup Intent details.
   *
   * @example
   * const response = await sdk.stripeSetupIntents.create({});
   * const setupIntentDetails = response.data;
   */
  async create<P extends StripeSetupIntentsCreateParameter, EP extends ExtraParameter>(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StripeSetupIntentsResponse<'create'>>> {
    return this.axios.post<StripeSetupIntentsResponse<'create'>>(
      `${this.endpoint}/create`,
      { ...params, ...extraParams }
    );
  }
}

export default StripeSetupIntents;
