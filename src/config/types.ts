import { EFeatureType } from '../enums';
import { II18nDict } from '../i18n/types';

interface FeaturingTypeConfig {
    title: string;
    description: string;
    imageUrl: string;
    imageSize: [number, number];
}

export type FeaturingTypeConfigs = {
    [key in EFeatureType]: FeaturingTypeConfig;
};

export interface MiniAppConfig {
    appId: string;
    apiUrl: string;
    maxFeaturingRequestDaysPeriod: string;
    disabledImagesUpload: string;
    mna: string;
    mnb: string;
    publicationStatus: string;
    types: FeaturingTypeConfigs;
    locales: II18nDict;
}
