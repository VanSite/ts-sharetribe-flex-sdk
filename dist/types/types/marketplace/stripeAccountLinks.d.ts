import { ApiParameter, ExtraParameter, UUID } from '../sharetribe';
export type StripeAccountLinksEndpoints = 'create';
export interface StripeAccountLink {
    id: UUID;
    type: 'stripeAccountLink';
    attributes: {
        url: string;
        expiresAt: Date;
    };
}
export interface StripeAccountLinksParameter extends ApiParameter {
}
export interface StripeAccountLinksCreateParameter extends StripeAccountLinksParameter {
    failureURL: string;
    successURL: string;
    type: string;
    collect: string;
}
type ExpandReturnType<EP> = EP extends {
    expand: true;
} ? StripeAccountLink : EP extends {
    expand: false;
} ? Omit<StripeAccountLink, 'attributes'> : Omit<StripeAccountLink, 'attributes'>;
type ExtraParameterType = ExtraParameter | undefined;
type DataType<E extends StripeAccountLinksEndpoints, EP extends ExtraParameterType> = E extends 'create' ? ExpandReturnType<EP> : never;
export type StripeAccountLinksResponse<E extends StripeAccountLinksEndpoints, EP extends ExtraParameterType = undefined> = {
    data: DataType<E, EP>;
};
export {};
