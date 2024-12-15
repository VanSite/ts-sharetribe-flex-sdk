import {ApiMeta, UUID} from '../sharetribe';
import {ListingWithRelationships} from "../marketplace/listings";
import {UserWithRelationships} from "../marketplace/user";
import {AvailabilityExceptionWithRelationships} from "../marketplace/availabilityExceptions";
import {MessageWithRelationships} from "../marketplace/messages";
import {TransactionWithRelationships} from "../marketplace/transaction";
import {BookingWithRelationShips} from "../marketplace/bookings";
import {ReviewWithRelationships} from "../marketplace/reviews";
import {StockAdjustmentWithRelationships} from "../marketplace/stockAdjustment";
import {StockReservationWithRelationships} from "../marketplace/stockReservations";

export type EventsEndpoints = 'query'
export type EventTypes =
  'listing/created' |
  'listing/updated' |
  'listing/deleted' |
  'user/created' |
  'user/updated	' |
  'user/deleted' |
  'availabilityException/created' |
  'availabilityException/updated' |
  'availabilityException/deleted' |
  'message/created' |
  'message/updated' |
  'message/deleted' |
  'transaction/initiated' |
  'transaction/transitioned' |
  'transaction/updated' |
  'transaction/deleted' |
  'booking/created' |
  'booking/updated' |
  'booking/deleted' |
  'review/created' |
  'review/updated' |
  'review/deleted' |
  'stockAdjustment/created' |
  'stockAdjustment/updated' |
  'stockAdjustment/deleted' |
  'stockReservation/created' |
  'stockReservation/updated' |
  'stockReservation/deleted'

export type EventSource =
  'source/marketplace-api' |
  'source/integration-api' |
  'source/transaction' |
  'source/console' |
  'source/admin'

export type EventResourceType =
  'listing' |
  'user' |
  'availabilityException' |
  'message' |
  'transaction' |
  'booking' |
  'review' |
  'stockAdjustment' |
  'stockReservation'

export type EventResource<T extends EventResourceType = any> =
  T extends 'listing' ? ListingWithRelationships<true> :
    T extends 'user' ? UserWithRelationships<true> :
      T extends 'availabilityException' ? AvailabilityExceptionWithRelationships :
        T extends 'message' ? MessageWithRelationships :
          T extends 'transaction' ? TransactionWithRelationships :
            T extends 'booking' ? BookingWithRelationShips :
              T extends 'review' ? ReviewWithRelationships :
                T extends 'stockAdjustment' ? StockAdjustmentWithRelationships :
                  T extends 'stockReservation' ? StockReservationWithRelationships : never

export type EventAuditData = {
  userId: UUID,
  adminId: UUID,
  clientId: UUID,
  requestId: UUID,
}

export interface Event {
  id: UUID,
  type: 'event',
  attributes: {
    createdAt: Date,
    sequenceId: number,
    marketplaceId: UUID,
    eventType: EventTypes,
    source: EventSource,
    resourceId: UUID,
    resourceType: EventResourceType,
    resource: EventResource,
    previousValues: any,
    auditData: EventAuditData
  }
}


export interface EventQueryParameter {
  startAfterSequenceId?: number,
  createdAtStart?: Date | string,
  resourceId?: UUID | string,
  relatedResourceId?: UUID | string,
  eventTypes?: EventTypes[],
}

type DataType<
  E extends EventsEndpoints,
> = E extends 'query' ? Event[] : never;

export type EventsResponse<
  E extends EventsEndpoints,
> = {
  data: DataType<E>
} & (E extends 'query' ? { meta: ApiMeta } : {})