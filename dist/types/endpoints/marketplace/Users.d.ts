import MarketplaceApi from './index';
import { UsersResponse, UsersShowParameter } from '../../types/marketplace/user';
declare class Users {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    constructor(api: MarketplaceApi);
    show<P extends UsersShowParameter>(params: P): Promise<import("axios").AxiosResponse<UsersResponse<"show", P>, any>>;
}
export default Users;
