/**
 * @fileoverview Type definition for Stripe Payment Method objects in the Sharetribe Marketplace API.
 * This file defines the structure of a Stripe Payment Method, including its attributes.
 */

import { UUID } from "../sharetribe";

/**
 * Represents a Stripe Payment Method object.
 */
export interface StripePaymentMethod {
  id: UUID; // The unique identifier for the payment method.
  type: "stripePaymentMethod"; // The type of the object, always 'stripePaymentMethod'.
  attributes: {
    type: string; // The type of the payment method (e.g., 'card').
    stripePaymentMethodId: string; // The ID of the payment method in Stripe.
    card: {
      brand: string; // The card brand (e.g., 'Visa', 'MasterCard').
      last4Digits: string; // The last four digits of the card number.
      expirationYear: number; // The card's expiration year.
      expirationMonth: number; // The card's expiration month.
    };
  };
}
