import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Globe } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { locale, toggleLanguage } = useTranslation();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-card border border-border hover:bg-accent/20 transition-all duration-200 hover:scale-105 shadow-neumorphism"
      aria-label="Toggle language"
      title={locale === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
    >
      <Globe className="h-5 w-5 text-accent" />
      <span className="text-sm font-heading text-foreground">
        {locale === 'pt-BR' ? 'PT' : 'EN'}
      </span>
    </button>
  );
};