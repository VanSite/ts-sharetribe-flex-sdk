/**
 * @fileoverview Provides the StripeCustomer class for managing Stripe customers in the Sharetribe Marketplace API.
 * This class includes methods for creating customers, adding payment methods, and deleting payment methods.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#stripe-customer
 */
import { AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import { StripeCustomerAddPaymentMethodParameter, StripeCustomerCreateParameter, StripeCustomerDeletePaymentMethodParameter, StripeCustomerResponse } from '../../types/marketplace/stripeCustomer';
import { ExtraParameter } from '../../types/sharetribe';
/**
 * Class representing the Stripe Customer API.
 *
 * The Stripe Customer API provides methods for managing Stripe customers, including creating customers and managing payment methods.
 */
declare class StripeCustomer {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    /**
     * Creates an instance of the StripeCustomer class.
     *
     * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
     */
    constructor(api: MarketplaceApi);
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
    create<P extends StripeCustomerCreateParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<StripeCustomerResponse<'create', P, EP>>>;
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
    addPaymentMethod<P extends StripeCustomerAddPaymentMethodParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<StripeCustomerResponse<'addPaymentMethod', P, EP>>>;
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
    deletePaymentMethod<P extends StripeCustomerDeletePaymentMethodParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<StripeCustomerResponse<'deletePaymentMethod', P, EP>>>;
}
export default StripeCustomer;
