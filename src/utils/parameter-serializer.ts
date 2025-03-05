import UUID from "../sdkTypes/UUID";
import LatLng from "../sdkTypes/LatLng";
import LatLngBounds from "../sdkTypes/LatLngBounds";

const UNKNOWN_TYPE = "unknown-type";

/**
 * Serializes a value into a string representation for URL query parameters.
 *
 * @param {*} value - The value to serialize. Supported types:
 *   - `UUID` instance: serialized as its `uuid` string.
 *   - `LatLng` instance: serialized as "lat,lng".
 *   - `LatLngBounds` instance: serialized as "ne.lat,ne.lng,sw.lat,sw.lng".
 *   - `Array`: serialized by recursively serializing each element.
 *   - `Date`: serialized as an ISO string.
 *   - Primitive types and `null`: returned as-is.
 * @throws {Error} Will throw an error if the value type is unsupported.
 * @returns {string|*} The serialized value.
 */
export const serializeValue = (value: any) => {
  let v: any;

  if (value instanceof UUID) {
    v = value.uuid;
  } else if (value instanceof LatLng) {
    v = `${value.lat},${value.lng}`;
  } else if (value instanceof LatLngBounds) {
    v = `${value.ne.lat},${value.ne.lng},${value.sw.lat},${value.sw.lng}`;
  } else if (Array.isArray(value)) {
    v = value.map(serializeValue);
  } else if (value instanceof Date) {
    v = value.toISOString();
  } else if (value === null) {
    v = value;
  } else if (typeof value !== "object") {
    v = value;
  } else {
    throw new Error(UNKNOWN_TYPE);
  }

  return v;
};

/**
 * Serializes a record of parameters into a query string.
 *
 * @param {Record<string, any>} params - The parameters to serialize. Each value is serialized
 *   using the `serializeValue` function.
 * @returns {string} A URL-encoded query string.
 */
function parameterSerializer(params: Record<string, any>): string {
  const serializedParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    serializedParams.append(key, serializeValue(value));
  });
  return serializedParams.toString();
}

export default parameterSerializer;
