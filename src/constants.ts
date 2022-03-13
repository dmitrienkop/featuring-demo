import { EFeatureType, EModalType } from './enums';

export type ImageDimensions = [number, number];
export interface ModalImageConfig {
    dimensions: ImageDimensions;
    size: number;
    ext: string[];
}

export interface ModalConfig {
    image: ModalImageConfig;
    title: number;
    subtitle: number;
}

export const FEATURE_MODAL_MAP = {
    [EFeatureType.ACTIONS_MAIN]: EModalType.ACTIONS_MAIN,
    [EFeatureType.ACTIONS_ADDITIONAL]: EModalType.ACTIONS_ADDITIONAL,
    [EFeatureType.NEW_DESKTOP]: EModalType.NEW_HIT,
    [EFeatureType.NEW_MOBILE]: EModalType.NEW_HIT,
    [EFeatureType.HIT_DESKTOP]: EModalType.NEW_HIT,
    [EFeatureType.HIT_MOBILE]: EModalType.NEW_HIT
};

export const SLOTS_LIMIT = {
    [EFeatureType.ACTIONS_MAIN]: 1,
    [EFeatureType.ACTIONS_ADDITIONAL]: 1,
    [EFeatureType.NEW_DESKTOP]: 1,
    [EFeatureType.NEW_MOBILE]: 1,
    [EFeatureType.HIT_DESKTOP]: 1,
    [EFeatureType.HIT_MOBILE]: 1
};

export const MODAL_CONFIGS = {
    [EModalType.NEW_HIT]: null,

    [EModalType.ACTIONS_MAIN]: {
        image: {
            dimensions: <ImageDimensions>[496, 186],
            size: 150,
            ext: ['jpg', 'png']
        },
        title: 34,
        subtitle: 71
    },

    [EModalType.ACTIONS_ADDITIONAL]: {
        image: {
            dimensions: <ImageDimensions>[1078, 606],
            size: 200,
            ext: ['jpg', 'png']
        },
        title: 25,
        subtitle: 55
    }
};

export const TYPE_REQUIRE_IMAGES_UPLOAD = [
    EFeatureType.ACTIONS_MAIN,
    EFeatureType.ACTIONS_ADDITIONAL
];
