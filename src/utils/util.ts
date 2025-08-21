import { toSdkTypes } from "./convert-types";
import {ApiError, ApiErrorResponse} from "../types";
import {AxiosError} from "axios";

type ObjectQueryStringParam = Record<string, any>;

/**
 * Serializes an attribute into a string representation for query parameters.
 *
 * @param {*} attribute - The attribute to serialize. Supported types:
 *   - `Array`: serialized as a comma-separated string of its elements.
 *   - Other types: returned as-is.
 * @returns {string} The serialized attribute.
 */
const serializeAttribute = (attribute: any): string => {
  if (Array.isArray(attribute)) {
    return attribute.join(",");
  } else {
    return attribute;
  }
};

/**
 * Serializes an object into a custom query string format.
 *
 * @param {ObjectQueryStringParam} obj - The object to serialize. Each key-value pair
 *   is serialized in the format `key:value`. Attributes are processed using
 *   `serializeAttribute`.
 * @throws {Error} If the input is not an object or is null.
 * @returns {string} A semicolon-separated query string.
 */
export const objectQueryString = (obj: ObjectQueryStringParam): string => {
  // Ensure the input is a valid object
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    console.warn("Params must be an object");
    // You can throw an error instead of warning if strict validation is required:
    // throw new Error("Params must be an object");
    return "";
  }

  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined && value !== null) // Exclude undefined or null values
    .map(([key, value]) => `${key}:${serializeAttribute(value)}`) // Serialize each key-value pair
    .join(";"); // Join the serialized pairs with semicolons
};

export const createSharetribeApiError = (error: AxiosError): ApiErrorResponse => {
  return {
    name: error.name,
    message: error.message,
    status: error.status,
    statusText: error.code,
    data: error.response!.data
  } as ApiErrorResponse;
}