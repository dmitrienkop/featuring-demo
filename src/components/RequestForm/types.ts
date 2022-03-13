import { EFeatureType, EModalType } from '../../enums';
import { NewDeveloperRequest } from '../../services/types';

export interface RequestFormState {
    data: NewDeveloperRequest;
    isValid: boolean | null;
}

export interface RequestFormProps {
    featureType: EFeatureType;
    modalType: typeof EModalType[keyof typeof EModalType];
    disabled?: boolean;
    onChange: (state: RequestFormState) => void;
}

export interface IRangeErrorDict {
    errorStartAfterEnd: string;
    errorMaxRangeLength: string;
    errorIncludesBookedDates: string;
}
