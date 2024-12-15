import { z } from 'zod';
export declare const MoneySchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodString;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
}, {
    amount: number;
    currency: string;
}>;
declare class Money {
    amount: number;
    currency: string;
    constructor(amount: number, currency: string);
}
export default Money;
