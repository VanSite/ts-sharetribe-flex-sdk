import MarketplaceApi from './index';
import { ProcessTransitionsQueryParameter, ProcessTransitionsResponse } from '../../types/marketplace/processTransitions';
declare class ProcessTransitions {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    constructor(api: MarketplaceApi);
    query<P extends ProcessTransitionsQueryParameter>(params: P): Promise<import("axios").AxiosResponse<ProcessTransitionsResponse<"query">, any>>;
}
export default ProcessTransitions;
