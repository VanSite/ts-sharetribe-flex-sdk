/**
 * @fileoverview Provides the StripeAccountLinks class for managing Stripe account links in the Sharetribe Marketplace API.
 * This class includes methods for creating account links to manage Stripe accounts.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#stripe-account-links
 */

import { AxiosInstance, AxiosResponse } from "axios";
import MarketplaceApi from "./index";
import {
  StripeAccountLinksCreateParameter,
  StripeAccountLinksResponse,
} from "../../types/marketplace/stripeAccountLinks";
import { ExtraParameter } from "../../types/sharetribe";

/**
 * Class representing the Stripe Account Links API.
 *
 * The Stripe Account Links API provides methods for creating links to manage Stripe accounts, such as onboarding links.
 */
class StripeAccountLinks {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  /**
   * Creates an instance of the StripeAccountLinks class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + "/stripe_account_links";
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Creates a new Stripe account link.
   *
   * @template P
   * @template EP
   * @param {P & StripeAccountLinksCreateParameter} params - Parameters for creating the account link.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<StripeAccountLinksResponse<'create', EP>>>} - A promise resolving to the created account link details.
   *
   * @example
   * const response = await sdk.stripeAccountLinks.create({
   *   failureURL: 'https://example.com/failure',
   *   successURL: 'https://example.com/success',
   *   type: 'custom_account_verification',
   *   collectionOptions: {
   *     fields: ['currently_due', 'eventually_due'],
   *     future_requirements: ['include', 'omit'],
   *   },
   * });
   * const accountLink = response.data;
   */
  async create<
    P extends StripeAccountLinksCreateParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StripeAccountLinksResponse<"create", EP>>> {
    return this.axios.post<StripeAccountLinksResponse<"create", EP>>(
      `${this.endpoint}/create`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }
}

export default StripeAccountLinks;
