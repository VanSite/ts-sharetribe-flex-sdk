import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import { ReviewsQueryParameter, ReviewsResponse, ReviewsShowParameter } from '../../types/marketplace/reviews';

class Reviews {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/reviews';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async show<P extends ReviewsShowParameter>(params: P) {
    return this.axios.get<ReviewsResponse<'show', P>>(`${this.endpoint}/show`, {
      ...this.headers,
      params
    })
  }

  async query<P extends ReviewsQueryParameter>(params: P) {
    return this.axios.get<ReviewsResponse<'query', P>>(`${this.endpoint}/query`, {
      ...this.headers,
      params
    })
  }
}

export default Reviews;