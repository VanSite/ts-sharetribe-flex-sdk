/**
 * @fileoverview Type definitions for Password Reset functionality in the Sharetribe Marketplace API.
 * This file defines the structure of password reset parameters and responses for the API endpoints.
 */
import { ApiParameter, ExtraParameterType, UUID } from "../sharetribe";
export type PasswordResetEndpoints = "request" | "reset";
export interface PasswordReset {
    id: UUID;
    type: "passwordReset";
    attributes?: unknown;
}
export interface PasswordResetParameter extends ApiParameter {
}
export interface PasswordResetRequestParams extends PasswordResetParameter {
    email: string;
}
export interface PasswordResetResetParams extends PasswordResetParameter {
    email: string;
    passwordResetToken: string;
    newPassword: string;
}
type ExpandReturnType<EP> = EP extends {
    expand: true;
} ? PasswordReset : EP extends {
    expand: false;
} ? Omit<PasswordReset, "attributes"> : Omit<PasswordReset, "attributes">;
type DataType<E extends PasswordResetEndpoints, EP extends ExtraParameterType> = E extends "request" ? ExpandReturnType<EP> : E extends "reset" ? ExpandReturnType<EP> : never;
export type PasswordResetResponse<E extends PasswordResetEndpoints, EP extends ExtraParameterType = undefined> = {
    data: DataType<E, EP>;
};
export {};
//# sourceMappingURL=passwordReset.d.ts.map