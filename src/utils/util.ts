import {ApiError, SharetribeApiError} from "../types";
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
    .map(([key, value]) => {
      const serializedValue = serializeAttribute(value);
      return `${key}:${encodeURIComponent(serializedValue)}`;
    }) // Serialize each key-value pair
    .join(";"); // Join the serialized pairs with semicolons
};

export const createSharetribeApiError = (error: AxiosError): SharetribeApiError => {
  const responseData = error.response?.data as { errors?: ApiError[] } | undefined;
  const firstApiError = responseData?.errors?.[0];

  // Axios's default message ("Request failed with status code 400") is useless
  // for Sentry grouping and debugging. Enrich it with the first Sharetribe API
  // error's code/detail when available.
  const baseMessage = error.message || `Request failed with status ${error.status ?? "unknown"}`;
  const message = firstApiError
    ? `${baseMessage}: ${firstApiError.code}${firstApiError.detail ? ` - ${firstApiError.detail}` : ""}`
    : baseMessage;

  const apiError = new Error(message) as SharetribeApiError;
  apiError.name = "SharetribeApiError";
  apiError.status = error.status;
  apiError.statusText = error.code;
  apiError.data = error.response?.data;
  return apiError;
};