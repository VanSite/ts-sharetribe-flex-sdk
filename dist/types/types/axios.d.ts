import { InternalAxiosRequestConfig } from 'axios';
export type ExtendedInternalAxiosRequestConfig = InternalAxiosRequestConfig & {
    _retry: boolean;
};
