/**
 * @fileoverview Type definitions for Password Reset functionality in the Sharetribe Marketplace API.
 * This file defines the structure of password reset parameters and responses for the API endpoints.
 */

import { ApiParameter, ExtraParameterType, UUID } from "../sharetribe";

// Supported API endpoints for password reset operations.
export type PasswordResetEndpoints = "request" | "reset";

// Structure of a Password Reset object.
export interface PasswordReset {
  id: UUID;
  type: "passwordReset";
  attributes?: unknown;
}

// Base parameters for password reset operations.
export interface PasswordResetParameter extends ApiParameter {}

// Parameters for requesting a password reset.
export interface PasswordResetRequestParams extends PasswordResetParameter {
  email: string;
}

// Parameters for resetting the password.
export interface PasswordResetResetParams extends PasswordResetParameter {
  email: string;
  passwordResetToken: string;
  newPassword: string;
}

// Utility types for handling return types and responses.
type ExpandReturnType<EP> = EP extends { expand: true }
  ? PasswordReset
  : EP extends { expand: false }
  ? Omit<PasswordReset, "attributes">
  : Omit<PasswordReset, "attributes">;

type DataType<
  E extends PasswordResetEndpoints,
  EP extends ExtraParameterType
> = E extends "request"
  ? ExpandReturnType<EP>
  : E extends "reset"
  ? ExpandReturnType<EP>
  : never;

// Response type for password reset operations.
export type PasswordResetResponse<
  E extends PasswordResetEndpoints,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, EP>;
};
