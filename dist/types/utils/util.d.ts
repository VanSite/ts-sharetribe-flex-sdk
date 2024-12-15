import { z } from "zod";
import { TypeHandler } from "../types/config";
declare const ObjectSchema: z.ZodRecord<z.ZodString, z.ZodAny>;
type ObjectQueryStringParam = z.infer<typeof ObjectSchema>;
export declare const objectQueryString: (obj: ObjectQueryStringParam) => string;
export declare const createTypeHandler: (handler: TypeHandler) => {
    sdkType: import("../sdkTypes/BigDecimal").default | import("../sdkTypes/LatLng").default | import("../sdkTypes/LatLngBounds").default | import("../sdkTypes/Money").default | import("../sdkTypes/UUID").default | Date;
    appType?: any;
    reader?: ((args_0: import("../sdkTypes/BigDecimal").default | import("../sdkTypes/LatLng").default | import("../sdkTypes/LatLngBounds").default | import("../sdkTypes/Money").default | import("../sdkTypes/UUID").default | Date, ...args: unknown[]) => any) | undefined;
    writer?: ((args_0: any, ...args: unknown[]) => import("../sdkTypes/BigDecimal").default | import("../sdkTypes/LatLng").default | import("../sdkTypes/LatLngBounds").default | import("../sdkTypes/Money").default | import("../sdkTypes/UUID").default | Date) | undefined;
    canHandle?: ((args_0: {
        key: string;
        value?: any;
    }, ...args: unknown[]) => boolean) | undefined;
};
export {};
