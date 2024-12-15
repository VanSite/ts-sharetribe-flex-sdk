import { z } from "zod";
declare const ObjectSchema: z.ZodRecord<z.ZodString, z.ZodAny>;
type ObjectQueryStringParam = z.infer<typeof ObjectSchema>;
export declare const objectQueryString: (obj: ObjectQueryStringParam) => string;
export {};
