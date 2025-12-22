/**
 * @fileoverview Type definition for Stripe Payment Method objects in the Sharetribe Marketplace API.
 */

import {UUID} from "../sharetribe";

/**
 * Stripe Payment Method resource
 */
export interface StripePaymentMethod {
  id: UUID;
  type: "stripePaymentMethod";
  attributes: {
    type: string;
    stripePaymentMethodId: string;
    card: {
      brand: string;
      last4Digits: string;
      expirationYear: number;
      expirationMonth: number;
    };
  };
}