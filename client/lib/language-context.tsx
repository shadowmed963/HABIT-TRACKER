import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { getTranslations, type Language } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: ReturnType<typeof getTranslations>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = "niyyah-language";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";

  const stored = window.localStorage.getItem(LANGUAGE_KEY);
  if (stored === "ar" || stored === "en" || stored === "fr") return stored;

  const userLang = navigator.language;
  if (userLang?.startsWith("ar")) return "ar";
  if (userLang?.startsWith("fr")) return "fr";
  return "en";
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>(() => getInitialLanguage());

  useEffect(() => {
    // Update document attributes when language changes
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    window.localStorage.setItem(LANGUAGE_KEY, newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: getTranslations(language) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
