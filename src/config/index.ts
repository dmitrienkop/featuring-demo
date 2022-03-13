import { memoizeWith, always } from 'ramda';
import { getQueryEntries } from '../helpers/query';
import { MiniAppConfig } from './types';
import { Environment } from '../enums';
import { _devMiniAppConfig } from './devConfig';

function extendConfigWithDebugOpts(config: MiniAppConfig): MiniAppConfig {
    const query = getQueryEntries();
    const debugPublicationStatus = query['debug.publicationStatus'];
    return typeof debugPublicationStatus === 'string'
        ? {
            ...config,
            publicationStatus: debugPublicationStatus
        }
        : config;
}

const getDevConfig = () =>
    extendConfigWithDebugOpts(_devMiniAppConfig);

function getProdConfig() {
    const configEl = document.getElementById('featuring-params');
    const configString = configEl && configEl.innerText || '{}';
    return extendConfigWithDebugOpts(JSON.parse(configString));
}

export const getConfig = memoizeWith(
    always('always'),
    () => process.env.NODE_ENV === Environment.Prod
        ? getProdConfig()
        : getDevConfig()
);
