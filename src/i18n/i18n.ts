import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationAR from './translations/ar.json';
import translationEN from './translations/en.json';
import translationJA from './translations/ja.json';
import translationKO from './translations/ko.json';
import translationZH from './translations/zh.json';

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
    supportedLngs: ['ja', 'en', 'zh', 'ko', 'ar'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;
