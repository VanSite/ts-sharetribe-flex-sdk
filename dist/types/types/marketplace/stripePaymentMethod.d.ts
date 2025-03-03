/**
 * @fileoverview Type definition for Stripe Payment Method objects in the Sharetribe Marketplace API.
 * This file defines the structure of a Stripe Payment Method, including its attributes.
 */
import { UUID } from '../sharetribe';
/**
 * Represents a Stripe Payment Method object.
 */
export interface StripePaymentMethod {
    id: UUID;
    type: 'stripePaymentMethod';
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
