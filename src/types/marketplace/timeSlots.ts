import { ApiMeta, ApiParameter, ExtraParameter } from '../sharetribe';
import UUID from '../../sdkTypes/UUID';


export type TimeSlotTypes = 'time-slot/day' | 'time-slot/time'

export type TimeSlotsEndpoints = 'query'

export interface TimeSlot {
  id: UUID,
  type: 'timeSlot',
  attributes: {
    type: TimeSlotTypes
    seats: number
    start: Date
    end: Date
  }
}

export interface TimeSlotsParameter extends ApiParameter {
}

export interface TimeSlotsQueryParameter extends TimeSlotsParameter {
  listingId: UUID | string
  start: Date | string
  end: Date | string
}

type DataType<
  E extends TimeSlotsEndpoints,
> =
  E extends 'query' ? TimeSlot[] : never;

export type TimeSlotsResponse<
  E extends TimeSlotsEndpoints,
> = {
  data: DataType<E>
} & (E extends 'query' ? { meta: ApiMeta } : {})
