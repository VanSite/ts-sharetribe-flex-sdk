/**
 * @fileoverview Type definitions for Time Slots in the Sharetribe Marketplace API.
 */

import {ApiMeta, ApiParameter, UUID} from "../sharetribe";

/**
 * Supported time slot types
 */
export type TimeSlotType = "time-slot/day" | "time-slot/time";

/**
 * Available endpoints
 */
export type TimeSlotsEndpoints = "query";

/**
 * Time slot resource
 */
export interface TimeSlot {
  id: UUID;
  type: "timeSlot";
  attributes: {
    type: TimeSlotType;
    seats: number;
    start: Date;
    end: Date;
  };
}

/**
 * Base request parameters
 */
export interface TimeSlotsParameter extends ApiParameter {
}

/**
 * Query parameters for fetching availability
 */
export interface TimeSlotsQueryParameter extends TimeSlotsParameter {
  listingId: UUID | string;
  start: Date | string;
  end: Date | string;
}

/**
 * Response data per endpoint
 */
type TimeSlotsResponseData<E extends TimeSlotsEndpoints> =
  E extends "query" ? TimeSlot[] : never;

/**
 * Final API response type
 */
export type TimeSlotsResponse<E extends TimeSlotsEndpoints = "query"> = {
  data: TimeSlotsResponseData<E>;
} & (E extends "query" ? { meta: ApiMeta } : {});