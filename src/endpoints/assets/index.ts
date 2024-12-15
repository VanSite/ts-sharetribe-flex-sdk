import SharetribeSdk from '../../sdk';
import {AxiosInstance} from 'axios';
import {
  AssetByAliasParameter,
  AssetByVersionParameter,
  AssetResponse,
  AssetsByAliasParameter,
  AssetsByVersionParameter,
} from '../../types/assets';

const extractCommonPathAndAssets = (paths: string[]) => {
  let commonPath: string = '';
  const assets: string[] = [];
  paths.forEach(path => {
    const prefix = path.split('/')[0];
    const asset = path.split('/')[1];
    if (!commonPath) {
      commonPath = prefix;
    } else if (commonPath !== prefix) {
      throw new Error('All paths should have the same prefix');
    }
    assets.push(asset);
  })
  return {commonPath, assets};
}

class AssetsApi {
  axios: AxiosInstance;
  endpoint: string;
  headers: Record<string, string>;

  constructor(sdk: SharetribeSdk) {
    const config = sdk.apisConfigs.api(sdk.sdkConfig);
    this.endpoint = config.baseUrl + `/pub/${sdk.sdkConfig.clientId}`;
    this.headers = config.headers;
    this.axios = sdk.axios;
  }

  async assetByAlias<P extends AssetByAliasParameter>(params: P) {
    if (params.path.startsWith('/')) {
      throw new Error('Path should not start with /');
    }
    return await this.axios.get<AssetResponse<'assetByAlias', P>>(this.endpoint + `/a/${params.alias}/${params.path}`, {
      headers: this.headers
    });
  }

  async assetsByAlias<P extends AssetsByAliasParameter>(params: P) {
    if (params.paths.some(path => path.startsWith('/'))) {
      throw new Error('Path should not start with /');
    }
    const {commonPath, assets} = extractCommonPathAndAssets(params.paths);
    if (!commonPath) {
      throw new Error('Paths should not be empty');
    }
    return await this.axios.get<AssetResponse<'assetsByAlias', P>>(this.endpoint + `/a/${params.alias}/${commonPath}/`, {
      headers: this.headers,
      params: {
        assets: assets
      }
    });
  }

  async assetByVersion<P extends AssetByVersionParameter>(params: P) {
    if (params.path.startsWith('/')) {
      throw new Error('Path should not start with /');
    }
    return await this.axios.get<AssetResponse<'assetByVersion', P>>(this.endpoint + `/v/${params.version}/${params.path}`, {
      headers: this.headers
    });
  }

  async assetsByVersion<P extends AssetsByVersionParameter>(params: P) {
    if (params.paths.some(path => path.startsWith('/'))) {
      throw new Error('Path should not start with /');
    }
    const {commonPath, assets} = extractCommonPathAndAssets(params.paths);
    return await this.axios.get<AssetResponse<'assetsByVersion', P>>(this.endpoint + `/v/${params.version}/${commonPath}/`, {
      headers: this.headers,
      params: {
        paths: assets
      }
    });
  }
}

export default AssetsApi;