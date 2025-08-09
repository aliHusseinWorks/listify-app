import { I18nManager } from 'react-native';
import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';

import en from './locales/en.json';
import ar from './locales/ar.json';

const STORAGE_KEY = '@app_language';
const FALLBACK_LANGUAGE = 'en';
const RTL_LANGUAGES = ['ar'];

const setRTLImmediately = () => {
    I18nManager.allowRTL(true);

    try {
        AsyncStorage.getItem(STORAGE_KEY).then((storedLanguage) => {
            if (storedLanguage && RTL_LANGUAGES.includes(storedLanguage)) {
                I18nManager.forceRTL(true);
            }
        });
    } catch (error) {
    }
};

const languageDetector: LanguageDetectorAsyncModule = {
    type: 'languageDetector',
    async: true,
    init: () => {
    },
    detect: (callback: (lng: string) => void) => {
        AsyncStorage.getItem(STORAGE_KEY)
            .then((storedLanguage) => {
                if (storedLanguage) {
                    const shouldBeRTL = RTL_LANGUAGES.includes(storedLanguage);
                    if (shouldBeRTL !== I18nManager.isRTL) {
                        I18nManager.forceRTL(shouldBeRTL);
                    }

                    callback(storedLanguage);
                } else {
                    const deviceLanguage = getLocales()[0]?.languageCode || FALLBACK_LANGUAGE;
                    const selectedLanguage = ['en', 'ar'].includes(deviceLanguage)
                        ? deviceLanguage
                        : FALLBACK_LANGUAGE;
                    const shouldBeRTL = RTL_LANGUAGES.includes(selectedLanguage);
                    I18nManager.forceRTL(shouldBeRTL);

                    callback(selectedLanguage);
                }
            })
            .catch(() => {
                callback(FALLBACK_LANGUAGE);
            });
    },
    cacheUserLanguage: (lng: string) => {
        AsyncStorage.setItem(STORAGE_KEY, lng);
    },
};

export const changeLanguage = async (newLanguage: string) => {
    const currentIsRTL = I18nManager.isRTL;
    const newIsRTL = RTL_LANGUAGES.includes(newLanguage);

    await AsyncStorage.setItem(STORAGE_KEY, newLanguage);

    await i18n.changeLanguage(newLanguage);

    if (currentIsRTL !== newIsRTL) {
        I18nManager.forceRTL(newIsRTL);
    }
};

export const isRTL = () => I18nManager.isRTL;

setRTLImmediately();

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v4',
        fallbackLng: FALLBACK_LANGUAGE,
        resources: {
            en: { translation: en },
            ar: { translation: ar },
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;