import { EFeatureType } from '../../enums';

export interface FeaturingDataItem {
    featureType: EFeatureType;
    title: string;
    description: string;
    imageUrl: string;
    imageSize: [number, number];
    disabled?: boolean;
}

export type PopupCallback = (type: EFeatureType) => void;

type RemoveRequestCallback = (id: number) => void;

export interface FeaturingItemProps extends FeaturingDataItem {
    isPublishedApp: boolean;
    onShowRequestModal: PopupCallback;
    onShowBlockedModal: PopupCallback;
    onRemoveRequest: RemoveRequestCallback;
}
