/**
 * Class representing a high-precision decimal number.
 *
 * The BigDecimal class ensures that large decimal numbers are stored as strings
 * to avoid precision loss during computations.
 */
declare class BigDecimal {
    value: string;
    readonly _sdkType: 'BigDecimal';
    /**
     * Creates an instance of the BigDecimal class.
     *
     * @param {any} value - The value to be stored as a BigDecimal. It must be convertible to a string.
     * @example
     * const bigDecimal = new BigDecimal('123456789.123456789');
     */
    constructor(value: any);
    /**
     * Converts the BigDecimal instance to a string representation.
     *
     * @returns {string} - The string representation of the BigDecimal.
     * @example
     * const bigDecimal = new BigDecimal('123456789.123456789');
     * console.log(bigDecimal.toString()); // Outputs: '123456789.123456789'
     */
    toString(): string;
}
export default BigDecimal;
