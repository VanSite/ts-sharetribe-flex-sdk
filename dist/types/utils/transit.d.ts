import transit from "transit-js";
import { TypeHandler } from "../types/config";
type SdkTypeClass = any;
export interface TransitReader {
    sdkType: SdkTypeClass;
    reader: (value: any) => any;
}
export interface TransitWriter {
    sdkType?: SdkTypeClass;
    appType?: any;
    canHandle?: (args: {
        key: string;
        value: any;
    }) => boolean;
    writer: (value: any) => any;
}
export declare const reader: (appTypeReaders?: TransitReader[]) => transit.TransitReader;
export declare const writer: (appTypeWriters?: TransitWriter[], opts?: TransitOptions) => transit.TransitWriter;
export type TransitOptions = {
    verbose?: boolean;
    typeHandlers?: TypeHandler[];
};
export declare const createTransitConverters: (typeHandlers?: TypeHandler[], opts?: TransitOptions) => {
    reader: transit.TransitReader;
    writer: transit.TransitWriter;
};
export declare const read: (str: string, opts?: TransitOptions) => any;
export declare const write: (data: any, opts?: TransitOptions) => string;
export {};
//# sourceMappingURL=transit.d.ts.map