/**
 * @fileoverview Provides the StripePersons class for managing Stripe persons in the Sharetribe Marketplace API.
 * This class includes methods for creating persons associated with Stripe accounts.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#stripe-persons
 */

import { AxiosInstance, AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import { StripePersonsCreateParameter, StripePersonsResponse } from '../../types/marketplace/stripePersons';
import { ExtraParameter } from '../../types/sharetribe';

/**
 * Class representing the Stripe Persons API.
 *
 * The Stripe Persons API provides methods for creating persons associated with Stripe accounts, used for compliance and verification purposes.
 */
class StripePersons {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  /**
   * Creates an instance of the StripePersons class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/stripe_persons';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Creates a new person for a Stripe account.
   *
   * @template P
   * @template EP
   * @param {P & StripePersonsCreateParameter} params - Parameters for creating the Stripe person.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<StripePersonsResponse<'create'>>>} - A promise resolving to the created person details.
   *
   * @example
   * const response = await sdk.stripePersons.create({
   *   personToken: 'person-token',
   * });
   * const personDetails = response.data;
   */
  async create<P extends StripePersonsCreateParameter, EP extends ExtraParameter>(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StripePersonsResponse<'create'>>> {
    return this.axios.post<StripePersonsResponse<'create'>>(
      `${this.endpoint}/create`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }
}

export default StripePersons;
