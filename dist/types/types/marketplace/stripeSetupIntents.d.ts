import { ApiParameter, ExtraParameter, UUID } from '../sharetribe';
export type StripeSetupIntentsEndpoints = 'create';
export interface StripeSetupIntents {
    id: UUID;
    type: 'stripeSetupIntent';
    attributes: {
        stripeSetupIntentId: string;
        clientSecret: string;
    };
}
export interface StripeSetupIntentsParameter extends ApiParameter {
}
export interface StripeSetupIntentsCreateParameter extends StripeSetupIntentsParameter {
}
type ExpandReturnType<EP> = EP extends {
    expand: true;
} ? StripeSetupIntents : EP extends {
    expand: false;
} ? Omit<StripeSetupIntents, 'attributes'> : Omit<StripeSetupIntents, 'attributes'>;
type ExtraParameterType = ExtraParameter | undefined;
type DataType<E extends StripeSetupIntentsEndpoints, EP extends ExtraParameterType> = E extends 'create' ? ExpandReturnType<EP> : never;
export type StripeSetupIntentsResponse<E extends StripeSetupIntentsEndpoints, EP extends ExtraParameterType = undefined> = {
    data: DataType<E, EP>;
};
export {};
