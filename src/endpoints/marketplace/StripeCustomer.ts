/**
 * @fileoverview Provides the StripeCustomer class for managing Stripe customers in the Sharetribe Marketplace API.
 * This class includes methods for creating customers, adding payment methods, and deleting payment methods.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#stripe-customer
 */

import { AxiosInstance, AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import {
  StripeCustomerAddPaymentMethodParameter,
  StripeCustomerCreateParameter,
  StripeCustomerDeletePaymentMethodParameter,
  StripeCustomerResponse,
} from '../../types/marketplace/stripeCustomer';
import { ExtraParameter } from '../../types/sharetribe';

/**
 * Class representing the Stripe Customer API.
 *
 * The Stripe Customer API provides methods for managing Stripe customers, including creating customers and managing payment methods.
 */
class StripeCustomer {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  /**
   * Creates an instance of the StripeCustomer class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/stripe_customer';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Creates a new Stripe customer.
   *
   * @template P
   * @template EP
   * @param {P & StripeCustomerCreateParameter} params - Parameters for creating the Stripe customer.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<StripeCustomerResponse<'create', P, EP>>>} - A promise resolving to the created customer details.
   *
   * @example
   * const response = await sdk.stripeCustomer.create({
   *   stripePaymentMethodId: 'payment-method-id',
   *   stripeCustomerEmail: 'user@example.com'
   * });
   * const customer = response.data;
   */
  async create<P extends StripeCustomerCreateParameter, EP extends ExtraParameter>(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StripeCustomerResponse<'create', P, EP>>> {
    return this.axios.post<StripeCustomerResponse<'create', P, EP>>(
      `${this.endpoint}/create`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }

  /**
   * Adds a payment method to a Stripe customer.
   *
   * @template P
   * @template EP
   * @param {P & StripeCustomerAddPaymentMethodParameter} params - Parameters for adding a payment method.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<StripeCustomerResponse<'addPaymentMethod', P, EP>>>} - A promise resolving to the updated customer details.
   *
   * @example
   * const response = await sdk.stripeCustomer.addPaymentMethod({
   *   stripePaymentMethodId: 'payment-method-id'
   * });
   * const updatedCustomer = response.data;
   */
  async addPaymentMethod<P extends StripeCustomerAddPaymentMethodParameter, EP extends ExtraParameter>(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StripeCustomerResponse<'addPaymentMethod', P, EP>>> {
    return this.axios.post<StripeCustomerResponse<'addPaymentMethod', P, EP>>(
      `${this.endpoint}/add_payment_method`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }

  /**
   * Deletes a payment method from a Stripe customer.
   *
   * @template P
   * @template EP
   * @param {P & StripeCustomerDeletePaymentMethodParameter} params - Parameters for deleting the payment method.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<StripeCustomerResponse<'deletePaymentMethod', P>>>} - A promise resolving to the confirmation of deletion.
   *
   * @example
   * const response = await sdk.stripeCustomer.deletePaymentMethod({ customer_id: 'customer-id', payment_method_id: 'payment-method-id' });
   * const result = response.data;
   */
  async deletePaymentMethod<P extends StripeCustomerDeletePaymentMethodParameter, EP extends ExtraParameter>(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<StripeCustomerResponse<'deletePaymentMethod', P, EP>>> {
    return this.axios.post<StripeCustomerResponse<'deletePaymentMethod', P, EP>>(
      `${this.endpoint}/delete_payment_method`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }
}

export default StripeCustomer;
