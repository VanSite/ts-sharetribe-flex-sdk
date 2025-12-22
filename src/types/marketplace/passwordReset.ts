/**
 * @fileoverview Type definitions for Password Reset operations in the Sharetribe Marketplace API.
 */

import {ApiParameter, ExtraParameterType, UUID} from "../sharetribe";

/**
 * Available endpoints
 */
export type PasswordResetEndpoints = "request" | "reset";

/**
 * Password reset resource (usually empty or minimal)
 */
export interface PasswordReset {
  id: UUID;
  type: "passwordReset";
  attributes?: Record<string, never>; // Intentionally empty in practice
}

/**
 * Base request parameters
 */
export interface PasswordResetParameter extends ApiParameter {
}

/**
 * Request password reset (send email)
 */
export interface PasswordResetRequestParameter extends PasswordResetParameter {
  email: string;
}

/**
 * Complete password reset using token
 */
export interface PasswordResetResetParameter extends PasswordResetParameter {
  email: string;
  passwordResetToken: string;
  newPassword: string;
}

/**
 * Expand behavior
 */
type ExpandResult<EP extends ExtraParameterType | undefined> =
  EP extends { expand: true }
    ? PasswordReset
    : EP extends { expand: false }
      ? Omit<PasswordReset, "attributes">
      : Omit<PasswordReset, "attributes">;

/**
 * Response data per endpoint
 */
type ResponseData<
  E extends PasswordResetEndpoints,
  EP extends ExtraParameterType | undefined
> = E extends "request" | "reset" ? ExpandResult<EP> : never;

/**
 * Final response type
 */
export type PasswordResetResponse<
  E extends PasswordResetEndpoints,
  EP extends ExtraParameterType | undefined = undefined
> = {
  data: ResponseData<E, EP>;
};