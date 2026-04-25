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

export default function AppShell({ children }: PropsWithChildren) {
  const { language, setLanguage, t, isTransitioning } = useLanguage();
  // Theme is managed by ThemeProvider (useTheme) — toggle UI is provided below

  return (
    <div className={`theme-transition min-h-screen bg-background text-foreground transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <div className="mx-auto flex min-h-screen w-full max-w-[28rem] flex-col px-3 pb-6 pt-3 sm:max-w-4xl sm:px-6 sm:pb-8 sm:pt-4 lg:max-w-6xl">
        <header className="mb-4 rounded-[20px] border border-border/60 bg-card/80 px-3 py-2.5 shadow-[0_24px_80px_rgba(77,73,122,0.12)] backdrop-blur-xl sm:mb-6 sm:px-6 sm:py-4 sm:rounded-[28px]">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_16px_30px_rgba(109,94,252,0.28)] sm:h-11 sm:w-11 sm:rounded-2xl">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-primary/70 line-clamp-1 sm:text-xs sm:tracking-[0.32em]">
                  {t.header.habitTracker}
                </p>
                <h1 className="truncate text-sm font-semibold text-foreground sm:text-lg">
                  {t.header.niyyahDaily}
                </h1>
              </div>
            </Link>

              <div className="flex items-center gap-1 sm:gap-2">
              <div className="hidden items-center gap-2 rounded-full bg-secondary/80 px-2.5 py-1.5 text-xs font-medium text-secondary-foreground shadow-sm sm:flex">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs">{t.header.aiHabitGuide}</span>
              </div>

              <button
                type="button"
                onClick={() => window.open('https://instagram.com/13thmohamed', '_blank')}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm transition hover:shadow-md hover:scale-105 sm:h-10 sm:w-10"
                aria-label="Follow us on Instagram"
                title="Follow @13thmohamed"
              >
                <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/80 text-secondary-foreground shadow-sm transition hover:bg-secondary sm:h-10 sm:w-10"
                    aria-label={t.common.selectLanguage}
                    title={t.common.selectLanguage}
                  >
                    <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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

        <footer className="mt-4 px-1 text-center text-xs text-muted-foreground sm:text-sm sm:mt-6">
          {t.footer}
        </footer>
      </div>
    </div>
  );
}
