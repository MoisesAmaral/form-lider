import { createContext, useState, ReactNode } from 'react';
import pt from './../locales/pt.json';
import en from './../locales/en.json';
import es from './../locales/es.json';

type Language = 'pt' | 'en' | 'es';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const translations = {
    pt,
    en,
    es
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};
