/**
 * @fileoverview Type definitions for Stripe Persons in the Sharetribe Marketplace API.
 * This file includes the structure of Stripe Persons, their attributes, parameters, and response types.
 */

export type StripePersonsEndpoints = 'create'

import {ApiParameter, ExtraParameterType, UUID} from '../sharetribe';

/**
 * Represents a Stripe Person object.
 */
export interface StripePersons {
  id: UUID; // Unique identifier for the Stripe Person.
  type: 'stripePerson'; // Type of the object, always 'stripePerson'.
  attributes: {
    stripePersonId: string; // The ID of the person in Stripe.
  };
}

/**
 * Parameters for making API requests involving Stripe Persons.
 */
export interface StripePersonsParameter extends ApiParameter {
}

/**
 * Parameters for creating a Stripe Person.
 */
export interface StripePersonsCreateParameter extends StripePersonsParameter {
  personToken: string; // Token representing the person to be created in Stripe.
}

/**
 * Determines the response type based on the `expand` parameter.
 */
type ExpandReturnType<EP> =
  EP extends { expand: true } ? StripePersons :
    EP extends { expand: false } ? Omit<StripePersons, 'attributes'> :
      Omit<StripePersons, 'attributes'>;

/**
 * Determines the data type based on the endpoint.
 */
type DataType<
  E extends StripePersonsEndpoints,
  EP extends ExtraParameterType
> =
  E extends 'create' ? ExpandReturnType<EP> : never;

/**
 * The response type for Stripe Persons API calls.
 */
export type StripePersonsResponse<
  E extends StripePersonsEndpoints,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, EP>;
};
