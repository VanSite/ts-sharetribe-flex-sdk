/**
 * @fileoverview Client for managing the current user's Stripe Customer object in the Sharetribe Marketplace API.
 *
 * Use this to:
 * - Create a Stripe Customer (required for charging users)
 * - Attach payment methods (e.g. saved cards)
 * - Remove payment methods
 *
 * All operations are performed on the current authenticated user.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#stripe-customer
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {
  ExtraParameter,
  StripeCustomerAddPaymentMethodParameter,
  StripeCustomerCreateParameter,
  StripeCustomerDeletePaymentMethodParameter,
  StripeCustomerResponse,
} from "../../types";

/**
 * Stripe Customer API client (current user)
 */
class StripeCustomer {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/stripe_customer`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Create a Stripe Customer for the current user
   *
   * @template P
   * @template EP
   * @param {P & StripeCustomerCreateParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<StripeCustomerResponse<"create", P, EP>>>}
   *
   * @example
   * await sdk.stripeCustomer.create({
   *   stripePaymentMethodId: "pm_card_visa",
   *   stripeCustomerEmail: "user@example.com"
   * });
   */
  async create<
    P extends StripeCustomerCreateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StripeCustomerResponse<"create", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/create`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Attach a new payment method to the current user's Stripe Customer
   *
   * @template P
   * @template EP
   * @param {P & StripeCustomerAddPaymentMethodParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<StripeCustomerResponse<"addPaymentMethod", P, EP>>>}
   */
  async addPaymentMethod<
    P extends StripeCustomerAddPaymentMethodParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StripeCustomerResponse<"addPaymentMethod", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/add_payment_method`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Remove a saved payment method
   *
   * @template P
   * @template EP
   * @param {P & StripeCustomerDeletePaymentMethodParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<AxiosResponse<StripeCustomerResponse<"deletePaymentMethod", P, EP>>>}
   */
  async deletePaymentMethod<
    P extends StripeCustomerDeletePaymentMethodParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StripeCustomerResponse<"deletePaymentMethod", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/delete_payment_method`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default StripeCustomer;