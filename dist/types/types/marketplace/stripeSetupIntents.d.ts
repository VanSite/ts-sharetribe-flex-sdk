/**
 * @fileoverview Type definitions for Stripe Setup Intents in the Sharetribe Marketplace API.
 * This file includes the structure of Stripe Setup Intents, their attributes, parameters, and response types.
 */
import { ApiParameter, ExtraParameterType, UUID } from '../sharetribe';
export type StripeSetupIntentsEndpoints = 'create';
/**
 * Represents a Stripe Setup Intent object.
 */
export interface StripeSetupIntents {
    id: UUID;
    type: 'stripeSetupIntent';
    attributes: {
        stripeSetupIntentId: string;
        clientSecret: string;
    };
}
/**
 * Parameters for making API requests involving Stripe Setup Intents.
 */
export interface StripeSetupIntentsParameter extends ApiParameter {
}
/**
 * Parameters for creating a Stripe Setup Intent.
 */
export interface StripeSetupIntentsCreateParameter extends StripeSetupIntentsParameter {
}
/**
 * Determines the response type based on the `expand` parameter.
 */
type ExpandReturnType<EP> = EP extends {
    expand: true;
} ? StripeSetupIntents : EP extends {
    expand: false;
} ? Omit<StripeSetupIntents, 'attributes'> : Omit<StripeSetupIntents, 'attributes'>;
/**
 * Determines the data type based on the endpoint.
 */
type DataType<E extends StripeSetupIntentsEndpoints, EP extends ExtraParameterType> = E extends 'create' ? ExpandReturnType<EP> : never;
/**
 * The response type for Stripe Setup Intents API calls.
 */
export type StripeSetupIntentsResponse<E extends StripeSetupIntentsEndpoints, EP extends ExtraParameterType = undefined> = {
    data: DataType<E, EP>;
};
export {};
