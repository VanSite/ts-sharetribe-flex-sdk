import MarketplaceApi from './index';
import { TimeSlotsQueryParameter, TimeSlotsResponse } from '../../types/marketplace/timeSlots';
declare class TimeSlots {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    constructor(api: MarketplaceApi);
    query<P extends TimeSlotsQueryParameter>(params: P): Promise<import("axios").AxiosResponse<TimeSlotsResponse<"query">, any>>;
}
export default TimeSlots;
