import { UUID } from '../sharetribe';

export type StockReservationState = 'pending' | 'proposed' | 'accepted' | 'declined' | 'cancelled'

export interface StockReservation {
  id: UUID
  type: 'stockReservation'
  attributes: {
    quantity: number
    state: StockReservationState
  }
}