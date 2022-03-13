import { EFeatureType } from '../../enums';
import { NewDeveloperRequest } from '../../services/types';

export const IMAGE_UPLOAD_ERRORS = {
    SIZE: 'Слишком большой вес изображения',
    UNKNOWN: 'Что-то пошло не так, попробуйте повторить попытку позднее',
    DIMENSIONS: 'Неправильный размер изображения'
};

export const DEFAULT_REQUEST_FORM_STATE: NewDeveloperRequest = {
    type: EFeatureType.NEW_DESKTOP,
    image: '',
    title: '',
    subtitle: '',
    from: null,
    to: null
};

export const FIELD_NAMES: { [key: string]: keyof NewDeveloperRequest } = {
    IMAGE: 'image',
    TITLE: 'title',
    SUBTITLE: 'subtitle',
    FROM: 'from',
    TO: 'to'
};
