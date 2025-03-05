/**
 * @fileoverview Type definitions for Stripe Account Links operations in the Sharetribe Marketplace API.
 * This file defines the structure of parameters and responses for the Stripe Account Links API endpoints.
 */
import { ApiParameter, ExtraParameterType, UUID } from "../sharetribe";
export type StripeAccountLinksEndpoints = "create";
export interface StripeAccountLink {
    id: UUID;
    type: "stripeAccountLink";
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
    collectionOptions: {
        fields: Array<"currently_due" | "eventually_due">;
        future_requirements: Array<"include" | "omit">;
    };
}
type ExpandReturnType<EP> = EP extends {
    expand: true;
} ? StripeAccountLink : EP extends {
    expand: false;
} ? Omit<StripeAccountLink, "attributes"> : Omit<StripeAccountLink, "attributes">;
type DataType<E extends StripeAccountLinksEndpoints, EP extends ExtraParameterType> = E extends "create" ? ExpandReturnType<EP> : never;
export type StripeAccountLinksResponse<E extends StripeAccountLinksEndpoints, EP extends ExtraParameterType = undefined> = {
    data: DataType<E, EP>;
};
export {};
//# sourceMappingURL=stripeAccountLinks.d.ts.map