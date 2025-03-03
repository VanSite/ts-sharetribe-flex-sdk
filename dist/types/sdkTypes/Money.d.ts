/**
 * @fileoverview Provides the Money class for handling monetary values.
 * This class ensures proper structure and validation of monetary values with an amount and a currency.
 */
/**
 * Class representing a monetary value.
 *
 * The Money class encapsulates an amount in the smallest unit of the currency (e.g., cents)
 * and a currency code (e.g., "USD").
 */
declare class Money {
    amount: number;
    currency: string;
    readonly _sdkType: 'Money';
    /**
     * Creates an instance of the Money class.
     *
     * @param {number} amount - The monetary amount, represented in the smallest unit of the currency (e.g., cents for USD).
     * @param {string} currency - The currency code, represented as a three-character string (e.g., "USD").
     * @example
     * const money = new Money(1000, 'USD');
     * console.log(money); // Outputs: Money { amount: 1000, currency: 'USD' }
     */
    constructor(amount: number, currency: string);
}
export default Money;
