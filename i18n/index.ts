import { en } from './translations.en';
import { el } from './translations.el';
import { Language, TranslationKeys } from './types';

export const translations: Record<Language, TranslationKeys> = {
  en,
  el,
};

export type { Language, TranslationKeys };
