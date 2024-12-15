import { z } from "zod";
export declare const BigDecimalSchema: z.ZodString;
export type BigDecimalType = z.infer<typeof BigDecimalSchema>;
declare class BigDecimal {
    value: string;
    constructor(value: string);
    toString(): string;
}
export default BigDecimal;
