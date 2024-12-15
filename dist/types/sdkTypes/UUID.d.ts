import { z } from 'zod';
export declare const UUIDSchema: z.ZodObject<{
    uuid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uuid: string;
}, {
    uuid: string;
}>;
export type UUIDType = z.infer<typeof UUIDSchema>;
declare class UUID {
    uuid: string;
    constructor(uuid?: string);
    toString(): string;
}
export default UUID;
