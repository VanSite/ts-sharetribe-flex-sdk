import { ApiParameter, ExtraParameter, UUID } from '../sharetribe';
import type Stripe from 'stripe';
export type StripeAccountEndpoints = 'fetch' | 'create' | 'update';
export interface StripeAccount {
    id: UUID;
    type: 'stripeAccount';
    attributes: {
        stripeAccountId: string;
        stripeAccountData: Stripe.Account;
    };
}
export interface StripeAccountParameter extends ApiParameter {
}
export interface StripeAccountCreateParameter extends StripeAccountParameter {
    country: string;
    accountToken?: string;
    bankAccountToken?: string;
    businessProfileMCC?: string;
    businessProfileURL?: string;
    businessProfileProductDescription?: string;
    requestedCapabilities?: string[];
}
export interface StripeAccountUpdateParameter extends StripeAccountParameter {
    accountToken?: string;
    bankAccountToken?: string;
    businessProfileMCC?: string;
    businessProfileURL?: string;
    businessProfileProductDescription?: string;
    requestedCapabilities?: string[];
}
type ExpandReturnType<EP> = EP extends {
    expand: true;
} ? StripeAccount : EP extends {
    expand: false;
} ? Omit<StripeAccount, 'attributes'> : Omit<StripeAccount, 'attributes'>;
type ExtraParameterType = ExtraParameter | undefined;
type DataType<E extends StripeAccountEndpoints, EP extends ExtraParameterType> = E extends 'fetch' ? StripeAccount : E extends 'create' ? ExpandReturnType<EP> : E extends 'update' ? ExpandReturnType<EP> : never;
export type StripeAccountResponse<E extends StripeAccountEndpoints, EP extends ExtraParameterType = undefined> = {
    data: DataType<E, EP>;
};
export {};
