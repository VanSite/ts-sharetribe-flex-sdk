/**
 * @fileoverview Provides the Users class for managing user data in the Sharetribe Integration API.
 * This class allows retrieving details about a specific user.
 *
 * For more details, refer to the Integration API documentation:
 * https://www.sharetribe.com/api-reference/integration.html#users
 */
import { AxiosResponse } from "axios";
import IntegrationApi from "./index";
import { UsersApproveParameter, UsersQueryParameter, UsersResponse, UsersShowParameter, UsersUpdatePermissionsParameter, UsersUpdateProfileParameter } from "../../types/marketplace/user";
import { ExtraParameter } from "../../types/sharetribe";
/**
 * Class representing the Users API.
 *
 * The Users API provides methods to retrieve user data for marketplace resources.
 */
declare class Users {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    /**
     * Creates an instance of the Users class.
     *
     * @param {IntegrationApi} api - The Integration API instance providing configuration and request handling.
     */
    constructor(api: IntegrationApi);
    /**
     * Retrieves details about a specific user.
     *
     * @template P
     * @param {P & UsersShowParameter} params - The parameters to identify the user.
     * @returns {Promise<AxiosResponse<UsersResponse<'show', P>>>} - A promise resolving to the user details.
     *
     * @example
     * const response = await integrationSdk.users.show({
     *   id: 'user-id',
     * });
     *
     * const userDetails = response.data;
     */
    show<P extends UsersShowParameter<true>>(params: P): Promise<AxiosResponse<UsersResponse<"show", P>>>;
    /**
     * Queries users based on specified filters.
     *
     * @template P
     * @param {P & UsersQueryParameter} params - Query parameters for filtering users.
     * @returns {Promise<AxiosResponse<UsersResponse<'query', P>>>} - A promise resolving to the list of users.
     *
     * @example
     * const response = await integrationSdk.users.query({
     *   createdAtStart: '2021-01-01T00:00:00Z'
     * });
     * const users = response.data;
     */
    query<P extends UsersQueryParameter>(params: P): Promise<AxiosResponse<UsersResponse<"query", P>>>;
    /**
     * Updates a user's profile.
     *
     * @template P
     * @template EP
     * @param {P & UsersUpdateProfileParameter} params - Parameters to update the user's profile.
     * @param {EP | void} extraParams - Optional extra parameters for the request.
     * @returns {Promise<AxiosResponse<UsersResponse<'updateProfile', P, EP>>>} - A promise resolving to the updated profile details.
     *
     * @example
     * const response = await integrationSdk.users.updateProfile({
     *   id: 'user-id',
     *   firstName: 'John',
     *   lastName: 'Doe',
     *   displayName: 'John Doe',
     * });
     * const updatedProfile = response.data;
     */
    updateProfile<P extends UsersUpdateProfileParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<UsersResponse<"updateProfile", P, EP>>>;
    /**
     * Approves a user.
     *
     * @template P
     * @template EP
     * @param {P & UsersApproveParameter} params - Parameters to approve the user.
     * @param {EP | void} extraParams - Optional extra parameters for the request.
     * @returns {Promise<AxiosResponse<UsersResponse<'approve', P>>>} - A promise resolving to the approval confirmation.
     *
     * @example
     * const response = await integrationSdk.users.approve({ id: 'user-id' });
     * const approvalResult = response.data;
     */
    approve<P extends UsersApproveParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<UsersResponse<"approve", P, EP>>>;
    /**
     * Updates a user's permissions.
     *
     * @template P
     * @template EP
     * @param {P & UsersUpdatePermissionsParameter} params - Parameters to update the user's permissions.
     * @param {EP | void} extraParams - Optional extra parameters for the request.
     * @returns {Promise<AxiosResponse<UsersResponse<'updatePermissions', P, EP>>>} - A promise resolving to the updated permissions details.
     *
     * @example
     * const response = await integrationSdk.users.updatePermissions(
     *   { id: 'user-id', permissions: ['permission-1', 'permission-2'] },
     *   { additionalParam: 'value' }
     * );
     * const updatedPermissions = response.data;
     */
    updatePermissions<P extends UsersUpdatePermissionsParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<UsersResponse<"updatePermissions", P, EP>>>;
}
export default Users;
//# sourceMappingURL=Users.d.ts.map