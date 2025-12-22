/**
 * @fileoverview Type definitions for Events in the Sharetribe Marketplace API.
 */

import {ApiMeta, UUID} from "../sharetribe";
import {ListingWithRelationships} from "../marketplace/listings";
import {UserWithRelationships} from "../marketplace/user";
import {AvailabilityExceptionWithRelationships} from "../marketplace/availabilityExceptions";
import {MessageWithRelationships} from "../marketplace/messages";
import {TransactionWithRelationships} from "../marketplace/transactions";
import {BookingWithRelationships} from "../marketplace/bookings";
import {ReviewWithRelationships} from "../marketplace/reviews";
import {StockAdjustmentWithRelationships} from "../marketplace/stockAdjustment";
import {StockReservationWithRelationships} from "../marketplace/stockReservations";

/**
 * Available endpoints
 */
export type EventsEndpoints = "query";

/**
 * All possible event types
 */
export type EventType =
  | "listing/created"
  | "listing/updated"
  | "listing/deleted"
  | "user/created"
  | "user/updated"
  | "user/deleted"
  | "availabilityException/created"
  | "availabilityException/updated"
  | "availabilityException/deleted"
  | "message/created"
  | "message/updated"
  | "message/deleted"
  | "transaction/initiated"
  | "transaction/transitioned"
  | "transaction/updated"
  | "transaction/deleted"
  | "booking/created"
  | "booking/updated"
  | "booking/deleted"
  | "review/created"
  | "review/updated"
  | "review/deleted"
  | "stockAdjustment/created"
  | "stockAdjustment/updated"
  | "stockAdjustment/deleted"
  | "stockReservation/created"
  | "stockReservation/updated"
  | "stockReservation/deleted";

/**
 * Source of the event
 */
export type EventSource =
  | "source/marketplace-api"
  | "source/integration-api"
  | "source/transaction"
  | "source/console"
  | "source/admin";

/**
 * Resource types
 */
export type EventResourceType =
  | "listing"
  | "user"
  | "availabilityException"
  | "message"
  | "transaction"
  | "booking"
  | "review"
  | "stockAdjustment"
  | "stockReservation";

/**
 * Strongly-typed resource mapping per event type
 */
export type EventResource<T extends EventResourceType = EventResourceType> =
  T extends "listing" ? ListingWithRelationships<true>
    : T extends "user" ? UserWithRelationships<true>
      : T extends "availabilityException" ? AvailabilityExceptionWithRelationships
        : T extends "message" ? MessageWithRelationships
          : T extends "transaction" ? TransactionWithRelationships
            : T extends "booking" ? BookingWithRelationships
              : T extends "review" ? ReviewWithRelationships
                : T extends "stockAdjustment" ? StockAdjustmentWithRelationships
                  : T extends "stockReservation" ? StockReservationWithRelationships
                    : never;

/**
 * Audit metadata
 */
export interface EventAuditData {
  userId?: UUID | null;
  adminId?: UUID | null;
  clientId?: UUID | null;
  requestId?: UUID | null;
}

/**
 * Event resource
 */
export interface Event {
  id: UUID;
  type: "event";
  attributes: {
    createdAt: Date;
    sequenceId: number;
    marketplaceId: UUID;
    eventType: EventType;
    source: EventSource;
    resourceId: UUID;
    resourceType: EventResourceType;
    resource: EventResource;
    previousValues?: Record<string, unknown> | null;
    auditData?: EventAuditData | null;
  };
}

/**
 * Query parameters
 */
export interface EventsQueryParameter {
  startAfterSequenceId?: number;
  createdAtStart?: Date | string;
  resourceId?: UUID | string;
  relatedResourceId?: UUID | string;
  eventTypes?: EventType[];
}

/**
 * Response data
 */
type ResponseData<E extends EventsEndpoints> =
  E extends "query" ? Event[] : never;

/**
 * Final response type
 */
export type EventsResponse<E extends EventsEndpoints = "query"> = {
  data: ResponseData<E>;
  meta: ApiMeta;
};

/**
 * Convenience alias
 */
export type EventsQueryResponse = EventsResponse<"query">;