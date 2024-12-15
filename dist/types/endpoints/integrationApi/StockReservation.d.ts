import MarketplaceApi from './index';
import { StockReservationShowParameter, StockReservationsResponse } from "../../types/marketplace/stockReservations";
declare class StockReservation {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    constructor(api: MarketplaceApi);
    show<P extends StockReservationShowParameter>(params: P): Promise<import("axios").AxiosResponse<StockReservationsResponse<"show", P>, any>>;
}
export default StockReservation;
