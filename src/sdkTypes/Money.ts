/**
 * @fileoverview Provides the Money class for handling monetary values.
 * This class ensures proper structure and validation of monetary values with an amount and a currency.
 */

import {SdkType} from "../types";

// Define a static class name
const MONEY_SDK_TYPE = "Money";

// ISO 4217 currency codes are 3 uppercase letters
const CURRENCY_REGEX = /^[A-Z]{3}$/;

/**
 * Error thrown when invalid Money values are provided.
 */
export class InvalidMoneyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidMoneyError";
  }
}

/**
 * Class representing a monetary value.
 *
 * The Money class encapsulates an amount in the smallest unit of the currency (e.g., cents)
 * and a currency code (e.g., "USD").
 */
class Money implements SdkType {
  amount: number;
  currency: string;
  readonly _sdkType: typeof MONEY_SDK_TYPE;

  /**
   * Creates an instance of the Money class.
   *
   * @param {number} amount - The monetary amount, represented in the smallest unit of the currency (e.g., cents for USD).
   * @param {string} currency - The currency code, represented as a three-character uppercase string (e.g., "USD").
   * @throws {InvalidMoneyError} If the amount is not an integer or currency is not a valid ISO 4217 code.
   * @example
   * const money = new Money(1000, 'USD');
   * console.log(money); // Outputs: Money { amount: 1000, currency: 'USD' }
   */
  constructor(amount: number, currency: string) {
    this._sdkType = MONEY_SDK_TYPE;

    // Validate the amount
    if (typeof amount !== "number" || !Number.isInteger(amount)) {
      throw new InvalidMoneyError(`Amount must be an integer, received: ${amount}`);
    }

    // Validate the currency code (ISO 4217 format)
    if (typeof currency !== "string" || !CURRENCY_REGEX.test(currency)) {
      throw new InvalidMoneyError(`Currency must be a 3-letter uppercase ISO 4217 code, received: "${currency}"`);
    }

    this.amount = amount;
    this.currency = currency;
  }
}

// Default export for backward compatibility
export default Money;
