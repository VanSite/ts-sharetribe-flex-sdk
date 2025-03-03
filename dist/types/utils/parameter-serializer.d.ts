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
export declare const serializeValue: (value: any) => any;
/**
 * Serializes a record of parameters into a query string.
 *
 * @param {Record<string, any>} params - The parameters to serialize. Each value is serialized
 *   using the `serializeValue` function.
 * @returns {string} A URL-encoded query string.
 */
declare function parameterSerializer(params: Record<string, any>): string;
export default parameterSerializer;
