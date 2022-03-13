import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { II18nDict } from './types';

export const initI18n = (dict: II18nDict) =>
    i18n.use(initReactI18next).init({
        lng: 'ru',
        interpolation: {
            escapeValue: false
        },
        resources: {
            ru: {
                translation: dict
            }
        }
    });
