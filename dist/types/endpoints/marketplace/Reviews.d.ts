import MarketplaceApi from './index';
import { ReviewsQueryParameter, ReviewsResponse, ReviewsShowParameter } from '../../types/marketplace/reviews';
declare class Reviews {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    constructor(api: MarketplaceApi);
    show<P extends ReviewsShowParameter>(params: P): Promise<import("axios").AxiosResponse<ReviewsResponse<"show", P>, any>>;
    query<P extends ReviewsQueryParameter>(params: P): Promise<import("axios").AxiosResponse<ReviewsResponse<"query", P>, any>>;
}
export default Reviews;
