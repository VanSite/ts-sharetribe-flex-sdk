/**
 * @fileoverview Type definitions for Time Slots in the Sharetribe Marketplace API.
 * This file defines the structure of Time Slots, their parameters, and response types for API requests.
 */

import { ApiMeta, ApiParameter } from '../sharetribe';
import UUID from '../../sdkTypes/UUID';

/**
 * Types of time slots available in the system.
 */
export type TimeSlotTypes = 'time-slot/day' | 'time-slot/time';

/**
 * Endpoints available for Time Slots API.
 */
export type TimeSlotsEndpoints = 'query';

/**
 * Represents a Time Slot object.
 */
export interface TimeSlot {
  id: UUID; // Unique identifier for the Time Slot.
  type: 'timeSlot'; // Type of the object, always 'timeSlot'.
  attributes: {
    type: TimeSlotTypes; // Specifies the type of time slot (e.g., day-based or time-based).
    seats: number; // Number of available seats for the time slot.
    start: Date; // Start time of the time slot.
    end: Date; // End time of the time slot.
  };
}

/**
 * Base parameters for Time Slots API requests.
 */
export interface TimeSlotsParameter extends ApiParameter {}

/**
 * Parameters for querying Time Slots.
 */
export interface TimeSlotsQueryParameter extends TimeSlotsParameter {
  listingId: UUID | string; // The ID of the listing to query time slots for.
  start: Date | string; // Start date for the query range.
  end: Date | string; // End date for the query range.
}

/**
 * Determines the data type based on the API endpoint.
 */
type DataType<
  E extends TimeSlotsEndpoints,
> = E extends 'query' ? TimeSlot[] : never;

/**
 * Response type for Time Slots API calls.
 */
export type TimeSlotsResponse<
  E extends TimeSlotsEndpoints,
> = {
  data: DataType<E>;
} & (E extends 'query' ? { meta: ApiMeta } : {});
