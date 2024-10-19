import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './index.js';

const language = navigator.language.split('-')[0] || 'en';

i18n.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
