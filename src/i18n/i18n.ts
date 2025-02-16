import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationJA from './translations/ja.json';
import translationEN from './translations/en.json';
import translationZH from './translations/zh.json';
import translationKO from './translations/ko.json';
import translationAR from './translations/ar.json';

const resources = {
  ja: {
    translation: translationJA,
  },
  en: {
    translation: translationEN,
  },
  zh: {
    translation: translationZH,
  },
  ko: {
    translation: translationKO,
  },
  ar: {
    translation: translationAR,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ja',
    lng: 'ja', // default language
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
