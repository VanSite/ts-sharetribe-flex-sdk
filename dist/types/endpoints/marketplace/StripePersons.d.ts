/**
 * @fileoverview Provides the StripePersons class for managing Stripe persons in the Sharetribe Marketplace API.
 * This class includes methods for creating persons associated with Stripe accounts.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#stripe-persons
 */
import { AxiosResponse } from "axios";
import MarketplaceApi from "./index";
import { StripePersonsCreateParameter, StripePersonsResponse } from "../../types/marketplace/stripePersons";
import { ExtraParameter } from "../../types/sharetribe";
/**
 * Class representing the Stripe Persons API.
 *
 * The Stripe Persons API provides methods for creating persons associated with Stripe accounts, used for compliance and verification purposes.
 */
declare class StripePersons {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    /**
     * Creates an instance of the StripePersons class.
     *
     * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
     */
    constructor(api: MarketplaceApi);
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
    create<P extends StripePersonsCreateParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<StripePersonsResponse<"create">>>;
}
export default StripePersons;
//# sourceMappingURL=StripePersons.d.ts.map