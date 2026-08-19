/**
 * @fileoverview Client for creating Stripe Account Links in the Sharetribe Marketplace API.
 *
 * Use this to generate onboarding or verification links for the current user's Stripe Connect account.
 * The returned link redirects the user to Stripe to complete account setup or provide missing info.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#stripe-account-links
 */

import type {HttpClient, HttpResponse} from "../../types";
import type MarketplaceApi from "./index";
import {ExtraParameter, StripeAccountLinksCreateParameter, StripeAccountLinksResponse,} from "../../types";

/**
 * Stripe Account Links API client (current user)
 */
class StripeAccountLinks {
  public readonly authRequired = true;
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/stripe_account_links`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Create a Stripe Account Link (onboarding or verification)
   *
   * @template P
   * @template EP
   * @param {P & StripeAccountLinksCreateParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<StripeAccountLinksResponse<"create", EP>>>}
   *
   * @example
   * const { data } = await sdk.stripeAccountLinks.create({
   *   failureURL: "https://yoursite.com/stripe/failure",
   *   successURL: "https://yoursite.com/stripe/success",
   *   type: "account_onboarding",
   * });
   *
   * // Redirect user
   * window.location.href = data.attributes.url;
   */
  async create<
    P extends StripeAccountLinksCreateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<StripeAccountLinksResponse<"create", EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/create`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default StripeAccountLinks;