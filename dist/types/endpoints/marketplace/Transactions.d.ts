import MarketplaceApi from './index';
import { TransactionsInitiateParameter, TransactionsInitiateSpeculativeParameter, TransactionsQueryParameter, TransactionsResponse, TransactionsShowParameter, TransactionsTransitionParameter, TransactionsTransitionSpeculativeParameter } from '../../types/marketplace/transaction';
import { ExtraParameter } from '../../types/sharetribe';
declare class Transactions {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    constructor(api: MarketplaceApi);
    show<P extends TransactionsShowParameter>(params: P): Promise<import("axios").AxiosResponse<TransactionsResponse<"show", P>, any>>;
    query<P extends TransactionsQueryParameter>(params: P): Promise<import("axios").AxiosResponse<TransactionsResponse<"query", P>, any>>;
    initiate<P extends TransactionsInitiateParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<TransactionsResponse<"initiate", P, EP>, any>>;
    initiateSpeculative<P extends TransactionsInitiateSpeculativeParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<TransactionsResponse<"initiateSpeculative", P, EP>, any>>;
    transition<P extends TransactionsTransitionParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<TransactionsResponse<"transition", P, EP>, any>>;
    transitionSpeculative<P extends TransactionsTransitionSpeculativeParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<TransactionsResponse<"transitionSpeculative", P, EP>, any>>;
}
export default Transactions;
