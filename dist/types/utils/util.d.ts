type ObjectQueryStringParam = Record<string, any>;
/**
 * Serializes an object into a custom query string format.
 *
 * @param {ObjectQueryStringParam} obj - The object to serialize. Each key-value pair
 *   is serialized in the format `key:value`. Attributes are processed using
 *   `serializeAttribute`.
 * @throws {Error} If the input is not an object or is null.
 * @returns {string} A semicolon-separated query string.
 */
export declare const objectQueryString: (obj: ObjectQueryStringParam) => string;
export {};
//# sourceMappingURL=util.d.ts.map