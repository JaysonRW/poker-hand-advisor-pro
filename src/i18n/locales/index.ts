import { ptBR } from './pt-BR';
import { enUS } from './en-US';

export const locales = {
  'pt-BR': ptBR,
  'en-US': enUS,
};

export type Locale = keyof typeof locales;
export type Translation = typeof ptBR;