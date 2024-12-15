import Money from '../sdkTypes/Money';
import LatLng from '../sdkTypes/LatLng';
import LatLngBounds from '../sdkTypes/LatLngBounds';
import SharetribeSdk from '../sdk';
import IntegrationSdk from "../integrationSdk";
export declare function convertToMoney(value: {
    amount: number;
    currency: string;
}): Money;
export declare function convertToLatLng(value: {
    lat: number;
    lng: number;
}): LatLng;
export declare function convertToLatLngBounds(ne: {
    lat: number;
    lng: number;
}, sw: {
    lat: number;
    lng: number;
}): LatLngBounds;
export declare function convertToDate(value: string | Date): Date;
export declare function convertTypes(key: string, value: any): any;
export declare function recursiveConvertToSdkTypes(value: {
    [key: string]: any;
}): void;
export declare function convertFromSdkTypes(value: any): any;
export declare function recursiveConvertFromSdkTypes(value: {
    [key: string]: any;
}): void;
export declare function recursiveApplyHandler(value: {
    [key: string]: any;
}, handler: any): void;
export declare function dataToType(data: any, sdk: SharetribeSdk | IntegrationSdk): void;
export declare function typeToData(data: any, sdk: SharetribeSdk | IntegrationSdk): void;
