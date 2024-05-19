import { UUID } from '../sharetribe';

export interface StripePaymentMethod {
  id: UUID,
  type: 'stripePaymentMethod',
  attributes: {
    type: string,
    stripePaymentMethodId: string,
    card: {
      brand: string,
      last4Digits: string,
      expirationYear: number,
      expirationMonth: number
    }
  }
}
