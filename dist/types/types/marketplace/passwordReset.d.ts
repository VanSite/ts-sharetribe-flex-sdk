import { ApiParameter, ExtraParameter, UUID } from '../sharetribe';
export type PasswordResetEndpoints = 'request' | 'reset';
export interface PasswordReset {
    id: UUID;
    type: 'passwordReset';
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
type ExtraParameterType = ExtraParameter | undefined;
type ExpandReturnType<EP> = EP extends {
    expand: true;
} ? PasswordReset : EP extends {
    expand: false;
} ? Omit<PasswordReset, 'attributes'> : Omit<PasswordReset, 'attributes'>;
type DataType<E extends PasswordResetEndpoints, EP extends ExtraParameterType> = E extends 'request' ? ExpandReturnType<EP> : E extends 'reset' ? ExpandReturnType<EP> : never;
export type PasswordResetResponse<E extends PasswordResetEndpoints, EP extends ExtraParameterType = undefined> = {
    data: DataType<E, EP>;
};
export {};
