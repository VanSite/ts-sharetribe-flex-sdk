/**
 * @fileoverview Provides the StripeAccount class for managing Stripe accounts in the Sharetribe Marketplace API.
 * This class includes methods for fetching, creating, and updating Stripe accounts.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#stripe-account
 */
import { AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import { StripeAccountCreateParameter, StripeAccountResponse, StripeAccountUpdateParameter } from '../../types/marketplace/stripeAccount';
import { ExtraParameter } from '../../types/sharetribe';
/**
 * Class representing the Stripe Account API.
 *
 * The Stripe Account API provides methods for managing Stripe accounts associated with the marketplace.
 */
declare class StripeAccount {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    /**
     * Creates an instance of the StripeAccount class.
     *
     * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
     */
    constructor(api: MarketplaceApi);
    /**
     * Fetches the current Stripe account details.
     *
     * @returns {Promise<AxiosResponse<StripeAccountResponse<'fetch'>>>} - A promise resolving to the Stripe account details.
     *
     * @example
     * const response = await sdk.stripeAccount.fetch();
     * const stripeAccountDetails = response.data;
     */
    fetch(): Promise<AxiosResponse<StripeAccountResponse<'fetch'>>>;
    /**
     * Creates a new Stripe account.
     *
     * @template P
     * @template EP
     * @param {P & StripeAccountCreateParameter} params - Parameters for creating the Stripe account.
     * @param {EP | void} extraParams - Optional extra parameters for the request.
     * @returns {Promise<AxiosResponse<StripeAccountResponse<'create', EP>>>} - A promise resolving to the created Stripe account details.
     *
     * @example
     * const response = await sdk.stripeAccount.create({
     *   country: 'US',
     *   accountToken: 'account-token',
     *   bankAccountToken: 'bank-account-token',
     *   businessProfileMCC: '1234',
     *   businessProfileURL: 'https://example.com',
     *   businessProfileProductDescription: 'Product description',
     *   requestedCapabilities: ['card_payments', 'transfers'],
     * });
     * const createdStripeAccount = response.data;
     */
    create<P extends StripeAccountCreateParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<StripeAccountResponse<'create', EP>>>;
    /**
     * Updates an existing Stripe account.
     *
     * @template P
     * @template EP
     * @param {P & StripeAccountUpdateParameter} params - Parameters for updating the Stripe account.
     * @param {EP | void} extraParams - Optional extra parameters for the request.
     * @returns {Promise<AxiosResponse<StripeAccountResponse<'update', EP>>>} - A promise resolving to the updated Stripe account details.
     *
     * @example
     * const response = await sdk.stripeAccount.update({
     *   accountToken: 'new-account-token',
     * });
     * const updatedStripeAccount = response.data;
     */
    update<P extends StripeAccountUpdateParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<StripeAccountResponse<'update', EP>>>;
}
export default StripeAccount;
