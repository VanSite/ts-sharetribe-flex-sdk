import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import {
  OwnListingsAddImageParameter,
  OwnListingsCloseParameter,
  OwnListingsCreateDraftParameter,
  OwnListingsCreateParameter,
  OwnListingsDiscardDraftParameter,
  OwnListingsOpenParameter,
  OwnListingsPublishDraftParameter,
  OwnListingsQueryParameter,
  OwnListingsResponse,
  OwnListingsShowParameter,
  OwnListingsUpdateParameter
} from '../../types/marketplace/ownListings';
import { ExtraParameter } from '../../types/sharetribe';

class OwnListings {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/own_listings';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async show<P extends OwnListingsShowParameter>(params: OwnListingsShowParameter) {
    return this.axios.get<OwnListingsResponse<'show', P>>(`${this.endpoint}/show`, {
      ...this.headers,
      params
    })
  }

  async query<P extends OwnListingsQueryParameter>(params: OwnListingsQueryParameter) {
    return this.axios.get<OwnListingsResponse<'query', P>>(`${this.endpoint}/query`, {
      ...this.headers,
      params
    })
  }

  async create<P extends OwnListingsCreateParameter, EP extends ExtraParameter>(params: OwnListingsCreateParameter, extraParams: EP | void) {
    return this.axios.post<OwnListingsResponse<'create', P, EP>>(`${this.endpoint}/create`, {...params, ...extraParams}, {});
  }

  async createDraft<P extends OwnListingsCreateDraftParameter, EP extends ExtraParameter>(params: OwnListingsCreateDraftParameter, extraParams: EP | void) {
    return this.axios.post<OwnListingsResponse<'createDraft', P, EP>>(`${this.endpoint}/create_draft`, {...params, ...extraParams}, this.headers);
  }

  async update<P extends OwnListingsUpdateParameter, EP extends ExtraParameter>(params: OwnListingsUpdateParameter, extraParams: EP | void) {
    return this.axios.post<OwnListingsResponse<'update', P, EP>>(`${this.endpoint}/update`, {...params, ...extraParams}, this.headers);
  }

  async publishDraft<P extends OwnListingsPublishDraftParameter, EP extends ExtraParameter>(params: OwnListingsPublishDraftParameter, extraParams: EP | void) {
    return this.axios.post<OwnListingsResponse<'publishDraft', P, EP>>(`${this.endpoint}/publish_draft`, {...params, ...extraParams}, this.headers);
  }

  async discardDraft<P extends OwnListingsDiscardDraftParameter>(params: OwnListingsDiscardDraftParameter) {
    return this.axios.post<OwnListingsResponse<'discardDraft', P>>(`${this.endpoint}/discard_draft`, params, this.headers);
  }

  async close<P extends OwnListingsCloseParameter, EP extends ExtraParameter>(params: OwnListingsCloseParameter, extraParams: EP | void) {
    return this.axios.post<OwnListingsResponse<'close', P>>(`${this.endpoint}/close`, {...params, ...extraParams}, this.headers);
  }

  async open<P extends OwnListingsOpenParameter, EP extends ExtraParameter>(params: OwnListingsOpenParameter, extraParams: EP | void) {
    return this.axios.post<OwnListingsResponse<'open', P>>(`${this.endpoint}/open`, {...params, ...extraParams}, this.headers);
  }

  async addImage<P extends OwnListingsAddImageParameter, EP extends ExtraParameter>(params: OwnListingsAddImageParameter, extraParams: EP | void) {
    return this.axios.post<OwnListingsResponse<'addImage', P>>(`${this.endpoint}/add_image`, {...params, ...extraParams}, this.headers);
  }
}

export default OwnListings;