import MarketplaceApi from './index';
import { EventQueryParameter, EventsResponse } from "../../types/integration/events";
declare class Events {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    constructor(api: MarketplaceApi);
    query<P extends EventQueryParameter>(params: P): Promise<import("axios").AxiosResponse<EventsResponse<"query">, any>>;
}
export default Events;
