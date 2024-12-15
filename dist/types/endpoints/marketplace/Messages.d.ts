import MarketplaceApi from './index';
import { ExtraParameter } from '../../types/sharetribe';
import { MessagesQueryParameter, MessagesResponse, MessagesSendParameter } from '../../types/marketplace/messages';
declare class Messages {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    constructor(api: MarketplaceApi);
    query<P extends MessagesQueryParameter>(params: P): Promise<import("axios").AxiosResponse<MessagesResponse<"query", P>, any>>;
    send<P extends MessagesSendParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<MessagesResponse<"send", P, EP>, any>>;
}
export default Messages;
