/**
 * Class representing a high-precision decimal number.
 *
 * The BigDecimal class ensures that large decimal numbers are stored as strings
 * to avoid precision loss during computations.
 */

import {SdkType} from "../types";

// Define a static class name
const BIGDECIMAL_SDK_TYPE = "BigDecimal";

class BigDecimal implements SdkType {
  value: string;
  readonly _sdkType: typeof BIGDECIMAL_SDK_TYPE;

  /**
   * Creates an instance of the BigDecimal class.
   *
   * @param {any} value - The value to be stored as a BigDecimal. It must be convertible to a string.
   * @example
   * const bigDecimal = new BigDecimal('123456789.123456789');
   */
  constructor(value: any) {
    this._sdkType = BIGDECIMAL_SDK_TYPE;

    if (typeof value !== "string") {
      console.warn(
        "BigDecimal must be initialized with a string to ensure precision."
      );
    }
    // Convert the value to a string to maintain compatibility and precision.
    this.value = String(value);
  }

  /**
   * Converts the BigDecimal instance to a string representation.
   *
   * @returns {string} - The string representation of the BigDecimal.
   * @example
   * const bigDecimal = new BigDecimal('123456789.123456789');
   * console.log(bigDecimal.toString()); // Outputs: '123456789.123456789'
   */
  toString(): string {
    return `${this.value}`;
  }
}

// Default export for backward compatibility
export default BigDecimal;
