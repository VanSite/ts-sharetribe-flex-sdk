/**
 * @fileoverview Provides the Money class for handling monetary values.
 * This class ensures proper structure and validation of monetary values with an amount and a currency.
 */

import { SdkType } from "../types/sdk-types";
// Define a static class name
const MONEY_SDK_TYPE = "Money";

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
   * @param {string} currency - The currency code, represented as a three-character string (e.g., "USD").
   * @example
   * const money = new Money(1000, 'USD');
   * console.log(money); // Outputs: Money { amount: 1000, currency: 'USD' }
   */
  constructor(amount: number, currency: string) {
    this._sdkType = MONEY_SDK_TYPE;

    let isValid = true;

    // Validate the amount.
    if (!Number.isInteger(amount)) {
      console.warn("Amount must be an integer.");
      isValid = false;
    }

    // Validate the currency code.
    if (currency.length < 3) {
      console.warn("Currency must be at least 3 characters long.");
      isValid = false;
    }

    this.amount = amount;
    this.currency = currency;

    if (!isValid) {
      console.warn("Invalid Money values provided.");
    }
  }
}

// Default export for backward compatibility
export default Money;
