/**
 * @fileoverview Type definitions for Process Transitions in the Sharetribe Marketplace API.
 */

import {ApiParameter, UUID} from "../sharetribe";

/**
 * Available endpoints
 */
export type ProcessTransitionsEndpoints = "query";

/**
 * Actors that can trigger a transition
 */
type Actor = "customer" | "provider" | "operator" | "system";

/**
 * Supported parameter types in transition requests
 */
type ParamType =
  | "uuid"
  | "string"
  | "integer"
  | "timestamp"
  | "boolean"
  | "object"
  | "money"
  | ["lineItem"];

/**
 * Process Transition resource
 */
export interface ProcessTransition {
  id: UUID;
  type: "processTransition";
  attributes: {
    name: string;
    actor: Actor[];
    actions: string[];
    params: {
      req: Record<string, ParamType>;
      opt: Record<string, ParamType> | null;
    };
  };
}

/**
 * Base request parameters
 */
export interface ProcessTransitionsParameter extends ApiParameter {
}

/**
 * Query parameters
 */
export interface ProcessTransitionsQueryParameter
  extends ProcessTransitionsParameter {
  processAlias?: string;
  lastTransition?: string;
  transactionId?: UUID | string;
}

/**
 * Response data per endpoint
 */
type ResponseData<E extends ProcessTransitionsEndpoints> =
  E extends "query" ? ProcessTransition[] : never; // query returns an array

/**
 * Final response type
 */
export type ProcessTransitionsResponse<
  E extends ProcessTransitionsEndpoints = "query"
> = {
  data: ResponseData<E>;
};