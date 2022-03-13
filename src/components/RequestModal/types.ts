import { EFeatureType, EModalType } from '../../enums';

export interface RequestModalProps {
    featureType: EFeatureType;
    modalType: EModalType;
    visible: boolean;
    onClose: () => void;
}
