import { InternalAxiosRequestConfig } from "axios";
/**
 * Extended type for Axios internal request configuration to include a retry flag.
 */
export type ExtendedInternalAxiosRequestConfig = InternalAxiosRequestConfig & {
    /**
     * Indicates whether the request has been retried.
     */
    _retry: boolean;
};
//# sourceMappingURL=axios.d.ts.map