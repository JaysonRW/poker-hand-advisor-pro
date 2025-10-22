import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { locales, Translation } from '@/i18n/locales';

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }

  const { locale, toggleLanguage } = context;

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = locales[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = locales['en-US'];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object') {
            value = value[fallbackKey];
          } else {
            return key; // Return key if fallback also fails
          }
        }
        return value || key;
      }
    }
    
    return value || key;
  };

  return { t, locale, toggleLanguage };
};