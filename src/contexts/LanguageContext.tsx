import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Locale, locales } from '@/i18n/locales';

interface LanguageContextType {
  locale: Locale;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const getInitialLocale = (): Locale => {
    const stored = localStorage.getItem('poker-locale');
    if (stored && (stored === 'pt-BR' || stored === 'en-US')) {
      return stored as Locale;
    }
    
    // Auto-detect browser language
    const browserLang = navigator.language;
    if (browserLang.startsWith('pt')) {
      return 'pt-BR';
    }
    return 'en-US';
  };

  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem('poker-locale', locale);
  }, [locale]);

  const toggleLanguage = () => {
    setLocale(prev => prev === 'pt-BR' ? 'en-US' : 'pt-BR');
  };

  return (
    <LanguageContext.Provider value={{ locale, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};