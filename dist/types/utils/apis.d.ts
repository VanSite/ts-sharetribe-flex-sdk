import { ApiConfigs } from "../types/apiConfigs";
/**
 * Creates API configurations for the SDK.
 *
 * @param isIntegrationSdk - Determines whether the configuration is for the Integration SDK (default: false).
 * @returns An object containing API configurations for the standard SDK or Integration SDK.
 */
export declare const createApisConfigs: <I extends boolean = false>(isIntegrationSdk?: I) => ApiConfigs<I>;
//# sourceMappingURL=apis.d.ts.map