import React, {
  createContext, useState, useCallback, useContext, useEffect
} from 'react';
import { trimFirstChar } from '../utils/string';
import { getFirstTruthyValue } from '../utils/functional';
import { localStorage } from '../utils/storage';
import { getLocale } from '../config';

const TranslationContext = createContext({
  language: 'en',
  t: () => { },
  setLanguage: () => { }
});

const supportedLanguages = {
  hi: 'हिंदी',
  en: 'English',
  bn: 'বাংলা'
};

const setLanguagePref = lang => (localStorage.set('pref-lang', lang));

export const getDefaultLanguage = () => 'en';
const getLanguagePref = () => (localStorage.get('pref-lang'));
const getLanguageFromPath = () => (trimFirstChar(window.location.pathname).split('/')[0]);
const getLanguageFromBrowser = () => (navigator.language.split('-')[0]);
const getLanguage = () => (getFirstTruthyValue(getLanguageFromPath, getLanguagePref, getLanguageFromBrowser));

// const redirectToLanguageContext = language => {
//   // if on the same language context
//   if (language === getLanguageFromPath()) {
//     return;
//   }
//   if (language === getDefaultLanguage() && !getLanguageFromPath()) {
//     return;
//   }
//   const path = trimFirstChar(window.location.pathname); // /hi/repos => hi/repos
//   const query = window.location.search;
//   const { origin } = window.location;
//   if (language === getDefaultLanguage() && getLanguageFromPath()) {
//     const updatedPath = path.split('/').splice(1, path.split('/').length).join('/');
//     window.location.href = `${origin}/${updatedPath}${query}`;
//     return;
//   }
//   const goto = path ? `${origin}/${language}/${path}${query}` : `${origin}/${language}${query}`;
//   window.location.href = goto;
// };

export const TranslationProvider = ({ children, locales }) => {
  const [language, setLang] = useState(getLocale());
  const [translations] = useState(locales);
  const t = useCallback(key => (translations[key] || ''));

  useEffect(() => {
    (async () => {
      const language = getLanguage();
      if (!supportedLanguages[language]) return;
      setLanguagePref(language);
      // if (language !== getDefaultLanguage()) redirectToLanguageContext(language);
    })();
  }, []);

  const setLanguage = useCallback(async language => {
    setLanguagePref(language);
    setLang(language);
    // redirectToLanguageContext(language);
  }, [language]);

  return (
    <TranslationContext.Provider value={{
      language, t, setLanguage
    }}
    >
      {/* TODO add custom loader common for any blocking activity on the page */}
      {!translations ? ('loading ....') : (children)}
    </TranslationContext.Provider>
  );
};

export default () => useContext(TranslationContext);
