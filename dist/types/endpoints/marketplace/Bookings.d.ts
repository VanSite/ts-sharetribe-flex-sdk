import MarketplaceApi from './index';
import { BookingsQueryParameter, BookingsResponse } from '../../types/marketplace/bookings';
declare class Bookings {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    constructor(api: MarketplaceApi);
    query<P extends BookingsQueryParameter>(params: P): Promise<import("axios").AxiosResponse<BookingsResponse<"query", P>, any>>;
}
export default Bookings;
