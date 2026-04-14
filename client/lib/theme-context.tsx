import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  isDark: boolean;
}

const THEME_KEY = "theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark" || saved === "system") return saved;
    } catch (e) {
      // ignore
    }
    return "system";
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}

    const root = document.documentElement;
    const body = document.body;

    const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const applyDark = theme === "dark" || (theme === "system" && prefersDark);

    root.classList.toggle("dark", applyDark);
    if (body) body.classList.toggle("dark", applyDark);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      if (theme !== "system") return;
      const root = document.documentElement;
      const body = document.body;
      root.classList.toggle("dark", e.matches);
      if (body) body.classList.toggle("dark", e.matches);
    };

    try {
      mql.addEventListener("change", listener as any);
    } catch {
      // older browsers
      // @ts-ignore
      mql.addListener(listener as any);
    }

    return () => {
      try {
        mql.removeEventListener("change", listener as any);
      } catch {
        // @ts-ignore
        mql.removeListener(listener as any);
      }
    };
  }, [theme]);

  const isDark = typeof window !== "undefined" && (theme === "dark" || (theme === "system" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches));

  const setTheme = (t: Theme) => setThemeState(t);

  return <ThemeContext.Provider value={{ theme, setTheme, isDark }}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export default ThemeContext;
