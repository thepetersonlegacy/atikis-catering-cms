"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { translations, defaultLanguage, languages } from './translations';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';

interface I18nContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  tp: (keyBase: string, count: number) => string;
  isRTL: boolean;
  availableLanguages: typeof languages;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(defaultLanguage);
  const [isRTL, setIsRTL] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize language from localStorage after hydration
  useEffect(() => {
    setIsHydrated(true);
    
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLanguage = localStorage.getItem('preferred-language');
      if (savedLanguage && translations[savedLanguage]) {
        setLanguageState(savedLanguage);
      } else {
        // Try to detect browser language
        const browserLang = navigator?.language?.split('-')[0];
        if (browserLang && translations[browserLang]) {
          setLanguageState(browserLang);
        }
      }
    }
  }, []);

  // Update RTL and document attributes when language changes
  useIsomorphicLayoutEffect(() => {
    const rtlLanguages = ['ar'];
    const newIsRTL = rtlLanguages.includes(language);
    setIsRTL(newIsRTL);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = newIsRTL ? 'rtl' : 'ltr';
      
      // Add language-specific CSS class
      const currentClasses = document.documentElement.className;
      const newClasses = currentClasses.replace(/\blang-\w+\b/g, '') + ` lang-${language}`;
      document.documentElement.className = newClasses.trim();
    }
  }, [language]);

  const setLanguage = useCallback((lang: string) => {
    if (translations[lang]) {
      setLanguageState(lang);
      if (typeof window !== 'undefined' && isHydrated) {
        localStorage.setItem('preferred-language', lang);
      }
    }
  }, [isHydrated]);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations[defaultLanguage];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        break;
      }
    }

    return typeof value === 'string' ? value : key;
  }, [language]);

  // Minimal pluralization helper
  const tp = useCallback((keyBase: string, count: number): string => {
    // Language-specific plural category selection
    const lang = language

    const pick = (base: string, variant: string): string => {
      const key = `${base}.${variant}`
      const val = t(key)
      // If lookup returned the key (missing), fall back to 'other'
      if (val === key) return t(`${base}.other`)
      return val
    }

    // Arabic supports zero/one/two/few/many/other
    if (lang === 'ar') {
      if (count === 0) return pick(keyBase, 'zero')
      if (count === 1) return pick(keyBase, 'one')
      if (count === 2) return pick(keyBase, 'two')
      // Rough rule for few/many (Sound plural categories)
      const mod100 = count % 100
      if (mod100 >= 3 && mod100 <= 10) return pick(keyBase, 'few')
      if (mod100 >= 11 && mod100 <= 99) return pick(keyBase, 'many')
      return pick(keyBase, 'other')
    }

    // Chinese: always 'other'
    if (lang === 'zh-CN') return pick(keyBase, 'other')

    // Default: English, Spanish, French: one/other
    return count === 1 ? pick(keyBase, 'one') : pick(keyBase, 'other')
  }, [language, t])

  const contextValue: I18nContextType = {
    language,
    setLanguage,
    t,
    tp,
    isRTL,
    availableLanguages: languages
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};