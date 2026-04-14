import { Heart, Sparkles, Globe, Instagram } from "lucide-react";
import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function AppShell({ children }: PropsWithChildren) {
  const { language, setLanguage, t } = useLanguage();
  // Theme is managed by ThemeProvider (useTheme) — toggle UI is provided below

  return (
    <div className="theme-transition min-h-screen bg-background text-foreground" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto flex min-h-screen w-full max-w-[28rem] flex-col px-4 pb-8 pt-4 sm:max-w-4xl sm:px-6 lg:max-w-6xl">
        <header className="mb-6 rounded-[28px] border border-border/60 bg-card/80 px-4 py-4 shadow-[0_24px_80px_rgba(77,73,122,0.12)] backdrop-blur-xl sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_16px_30px_rgba(109,94,252,0.28)]">
                <Heart className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">
                  {t.header.habitTracker}
                </p>
                <h1 className="truncate text-lg font-semibold text-foreground">
                  {t.header.niyyahDaily}
                </h1>
              </div>
            </Link>

              <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full bg-secondary/80 px-3 py-2 text-xs font-medium text-secondary-foreground shadow-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>{t.header.aiHabitGuide}</span>
              </div>

              <ThemeToggle />

              <button
                type="button"
                onClick={() => window.open('https://instagram.com/13thmohamed', '_blank')}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm transition hover:shadow-md hover:scale-105"
                aria-label="Follow us on Instagram"
                title="Follow @13thmohamed"
              >
                <Instagram className="h-4 w-4" />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-secondary-foreground shadow-sm transition hover:bg-secondary"
                    aria-label={t.common.selectLanguage}
                    title={t.common.selectLanguage}
                  >
                    <Globe className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => setLanguage("en")}
                    className={language === "en" ? "bg-primary/10" : ""}
                  >
                    {t.common.english}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLanguage("ar")}
                    className={language === "ar" ? "bg-primary/10" : ""}
                  >
                    {t.common.arabic}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLanguage("fr")}
                    className={language === "fr" ? "bg-primary/10" : ""}
                  >
                    {t.common.french}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-6 px-1 text-center text-sm text-muted-foreground">
          {t.footer}
        </footer>
      </div>
    </div>
  );
}
