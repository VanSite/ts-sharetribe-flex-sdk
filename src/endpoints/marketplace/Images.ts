import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import { ImagesResponse, ImagesUploadParameter } from '../../types/marketplace/images';
import { ExtraParameter } from '../../types/sharetribe';

class Images {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/images';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async upload<P extends ImagesUploadParameter, EP extends ExtraParameter>(params: P, extraParams: EP) {
    return this.axios.post<ImagesResponse<'upload', EP>>(`${this.endpoint}/upload`, {...params, ...extraParams}, {...this.headers,})
  }
}

export default Images;