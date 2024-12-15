import { ApiParameter, ExtraParameter, UUID, Relationship, RelationshipTypeMap } from '../sharetribe';
export type StripeCustomerEndpoints = 'create' | 'addPaymentMethod' | 'deletePaymentMethod';
export type StripeCustomerRelationshipsFields = 'defaultPaymentMethod';
export interface StripeCustomer {
    id: UUID;
    type: 'stripeCustomer';
    attributes: {
        stripeCustomerId: string;
    };
}
export interface StripeCustomerWithRelationships extends StripeCustomer {
    relationships: {
        defaultPaymentMethod: Relationship<false, 'defaultPaymentMethod'>;
    };
}
export type StripeCustomerType<R extends boolean> = R extends true ? StripeCustomerWithRelationships : StripeCustomer;
export interface StripeCustomerParameter extends ApiParameter {
    include?: StripeCustomerRelationshipsFields[];
}
export interface StripeCustomerCreateParameter extends StripeCustomerParameter {
    stripePaymentMethodId?: string;
    stripeCustomerEmail?: string;
}
export interface StripeCustomerAddPaymentMethodParameter extends StripeCustomerParameter {
    stripePaymentMethodId: string;
}
export interface StripeCustomerDeletePaymentMethodParameter extends StripeCustomerParameter {
}
type AllStripeCustomerParameter = StripeCustomerCreateParameter | StripeCustomerAddPaymentMethodParameter;
type StripeCustomerTypeType<P extends AllStripeCustomerParameter> = 'include' extends keyof P ? (P['include'] extends StripeCustomerRelationshipsFields[] ? true : false) : false;
type IncludedType<P extends AllStripeCustomerParameter> = 'include' extends keyof P ? (P['include'] extends (keyof RelationshipTypeMap)[] ? Array<RelationshipTypeMap[P['include'][number]]>[] : never) : never;
type ExpandReturnType<P extends AllStripeCustomerParameter, EP> = EP extends {
    expand: true;
} ? StripeCustomerType<StripeCustomerTypeType<P>> : EP extends {
    expand: false;
} ? Omit<StripeCustomerType<StripeCustomerTypeType<P>>, 'attributes'> : Omit<StripeCustomerType<StripeCustomerTypeType<P>>, 'attributes'>;
type ExtraParameterType = ExtraParameter | undefined;
type DataType<E extends StripeCustomerEndpoints, P extends AllStripeCustomerParameter, EP extends ExtraParameterType> = E extends 'create' ? ExpandReturnType<P, EP> : E extends 'addPaymentMethod' ? ExpandReturnType<P, EP> : E extends 'deletePaymentMethod' ? ExpandReturnType<P, EP> : never;
export type StripeCustomerResponse<E extends StripeCustomerEndpoints, P extends AllStripeCustomerParameter, EP extends ExtraParameterType = undefined> = {
    data: DataType<E, P, EP>;
} & ('include' extends keyof P ? {
    included: IncludedType<P>;
} : {});
export {};
