/**
 * @fileoverview Client for creating Stripe Persons in the Sharetribe Marketplace API.
 *
 * A "Person" represents an individual associated with a Stripe Connect account
 * (e.g. owner, director, representative). Required for compliance in many countries.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#stripe-persons
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {ExtraParameter, StripePersonsCreateParameter, StripePersonsResponse,} from "../../types";

/**
 * Stripe Persons API client (current user)
 */
class StripePersons {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/stripe_persons`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Create a new Person for the current user's Stripe Connect account
   *
   * @template P
   * @template EP
   * @param {P & StripePersonsCreateParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<StripePersonsResponse<"create">>>}
   *
   * @example
   * await sdk.stripePersons.create({
   *   personToken: "person_tok_1AbC2DeFGhiJkLMnOPqRsTuV"
   * });
   */
  async create<
    P extends StripePersonsCreateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StripePersonsResponse<"create">>> {
    return this.axios.post(
      `${this.endpoint}/create`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default StripePersons;