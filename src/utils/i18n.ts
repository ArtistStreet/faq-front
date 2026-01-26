import { AUTH_KEYS } from 'constants/auth';
import i18n from 'i18next';
import vi from '@/languages/vi.json';
import { initReactI18next } from 'react-i18next';
import { getLocalStorage } from './localStorage';

export const resources = {
     vi: {
          translation: vi,
     },
};

export const defaultNS = 'translation';

i18n.use(initReactI18next).init({
     resources,
     lng: getLocalStorage(AUTH_KEYS.LANGUAGE_CODE) || 'vi',
     fallbackLng: 'vi',
     ns: [defaultNS],
     defaultNS,
     interpolation: {
          escapeValue: false,
     },
});

export default i18n;
