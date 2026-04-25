import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { getTranslations, type Language } from "./translations";

export type { Language };

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: ReturnType<typeof getTranslations>;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = "niyyah-language";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";

  const stored = window.localStorage.getItem(LANGUAGE_KEY);
  if (stored === "en" || stored === "ar" || stored === "fr") return stored;

  // Auto-detect browser language
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === "ar") return "ar";
  if (browserLang === "fr") return "fr";
  return "en";
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>(() => getInitialLanguage());
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ✅ تحسين الأداء: لا يعاد حساب الترجمة إلا عند تغيير اللغة
  const t = useMemo(() => getTranslations(language), [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    if (newLanguage === language) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setLanguageState(newLanguage);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LANGUAGE_KEY, newLanguage);
      }
      setTimeout(() => setIsTransitioning(false), 150);
    }, 150);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTransitioning }}>
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