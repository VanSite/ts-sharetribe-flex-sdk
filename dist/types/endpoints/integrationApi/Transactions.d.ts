import MarketplaceApi from './index';
import { TransactionsQueryParameter, TransactionsResponse, TransactionsShowParameter, TransactionsTransitionParameter, TransactionsTransitionSpeculativeParameter, TransactionsUpdateMetadataParameter } from '../../types/marketplace/transaction';
import { ExtraParameter } from '../../types/sharetribe';
declare class Transactions {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    constructor(api: MarketplaceApi);
    show<P extends TransactionsShowParameter>(params: P): Promise<import("axios").AxiosResponse<TransactionsResponse<"show", P>, any>>;
    query<P extends TransactionsQueryParameter<true>>(params: P): Promise<import("axios").AxiosResponse<TransactionsResponse<"query", P>, any>>;
    transition<P extends TransactionsTransitionParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<TransactionsResponse<"transition", P, EP>, any>>;
    transitionSpeculative<P extends TransactionsTransitionSpeculativeParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<TransactionsResponse<"transitionSpeculative", P, EP>, any>>;
    updateMetadata<P extends TransactionsUpdateMetadataParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<TransactionsResponse<"updateMetadata", P, EP>, any>>;
}
export default Transactions;
