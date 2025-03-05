/**
 * @fileoverview Type definitions for Process Transitions functionality in the Sharetribe Marketplace API.
 * This file defines the structure of process transition parameters and responses for the API endpoints.
 */

import { ApiParameter, UUID } from "../sharetribe";

// Supported API endpoint for process transitions operations.
export type ProcessTransitionsEndpoints = "query";

// Actors involved in process transitions.
type Actors = "customer" | "provider" | "operator" | "system";

// Supported request types for process transition parameters.
type RequestTypes =
  | "uuid"
  | "string"
  | "integer"
  | "timestamp"
  | "boolean"
  | "object"
  | "money"
  | ["lineItem"];

// Structure of a Process Transition object.
export interface ProcessTransition {
  id: UUID;
  type: "processTransition";
  attributes: {
    name: string;
    actor: Actors[];
    actions: string[];
    params: {
      req: {
        [key: string]: RequestTypes;
      };
      opt: {
        [key: string]: RequestTypes;
      } | null;
    };
  };
}

// Base parameters for process transitions operations.
export interface ProcessTransitionsParameter extends ApiParameter {}

// Parameters for querying process transitions.
export interface ProcessTransitionsQueryParameter
  extends ProcessTransitionsParameter {
  processAlias?: string;
  lastTransition?: string;
  transactionId?: UUID | string;
}

// Utility type for handling data return types based on the endpoint.
type DataType<E extends ProcessTransitionsEndpoints> = E extends "query"
  ? ProcessTransition
  : never;

// Response type for process transitions operations.
export type ProcessTransitionsResponse<E extends ProcessTransitionsEndpoints> =
  {
    data: DataType<E>;
  };
