import { z } from "zod";
export declare const BigDecimalSchema: z.ZodNumber;
export type BigDecimalType = z.infer<typeof BigDecimalSchema>;
declare class BigDecimal {
    value: number;
    constructor(value: number);
    toString(): string;
}
export default BigDecimal;
