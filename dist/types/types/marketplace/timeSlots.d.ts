/**
 * @fileoverview Type definitions for Time Slots in the Sharetribe Marketplace API.
 * This file defines the structure of Time Slots, their parameters, and response types for API requests.
 */
import { ApiMeta, ApiParameter } from "../sharetribe";
import UUID from "../../sdkTypes/UUID";
/**
 * Types of time slots available in the system.
 */
export type TimeSlotTypes = "time-slot/day" | "time-slot/time";
/**
 * Endpoints available for Time Slots API.
 */
export type TimeSlotsEndpoints = "query";
/**
 * Represents a Time Slot object.
 */
export interface TimeSlot {
    id: UUID;
    type: "timeSlot";
    attributes: {
        type: TimeSlotTypes;
        seats: number;
        start: Date;
        end: Date;
    };
}
/**
 * Base parameters for Time Slots API requests.
 */
export interface TimeSlotsParameter extends ApiParameter {
}
/**
 * Parameters for querying Time Slots.
 */
export interface TimeSlotsQueryParameter extends TimeSlotsParameter {
    listingId: UUID | string;
    start: Date | string;
    end: Date | string;
}
/**
 * Determines the data type based on the API endpoint.
 */
type DataType<E extends TimeSlotsEndpoints> = E extends "query" ? TimeSlot[] : never;
/**
 * Response type for Time Slots API calls.
 */
export type TimeSlotsResponse<E extends TimeSlotsEndpoints> = {
    data: DataType<E>;
} & (E extends "query" ? {
    meta: ApiMeta;
} : {});
export {};
//# sourceMappingURL=timeSlots.d.ts.map