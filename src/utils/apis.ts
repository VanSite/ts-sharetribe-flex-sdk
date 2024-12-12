import { ApiConfigs } from '../types/apiConfigs';

export const createApisConfigs = <I extends boolean = false>(isIntegrationSdk: I = false as I): ApiConfigs<I> => {
  if (isIntegrationSdk === false) {
    return {
      api: ({ baseUrl, version, transitVerbose }) => ({
        headers: {
          ...(transitVerbose ? { 'X-Transit-Verbose': 'true' } : {}),
          Accept: 'application/transit+json',
        },
        baseUrl: `${baseUrl}/${version}/api`,
      }),
      auth: ({ baseUrl, version }) => ({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        baseUrl: `${baseUrl}/${version}/auth`,
      }),
      assets: ({ assetCdnBaseUrl, version }) => ({
        headers: {
          Accept: 'application/json',
        },
        baseUrl: `${assetCdnBaseUrl}/${version}/assets`,
      }),
    } as ApiConfigs<I>;
  } else {
    return {
      integrationApi: ({ baseUrl, version, transitVerbose }) => ({
        headers: {
          ...(transitVerbose ? { 'X-Transit-Verbose': 'true' } : {}),
          Accept: 'application/transit+json',
        },
        baseUrl: `${baseUrl}/${version}/integration_api`,
      }),
    } as ApiConfigs<I>;
  }
};
