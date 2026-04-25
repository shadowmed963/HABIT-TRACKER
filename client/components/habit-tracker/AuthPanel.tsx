import { KeyRound, LogIn, ShieldCheck, UserRound, UserRoundPlus, Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

export type AuthMode = "login" | "signup";

interface AuthPanelProps {
  hasExistingUsers: boolean;
  onSubmit: (
    mode: AuthMode,
    credentials: { email: string; name?: string; password?: string },
  ) => Promise<{ ok: boolean; error?: string }> | { ok: boolean; error?: string };
}

export default function AuthPanel({ hasExistingUsers, onSubmit }: AuthPanelProps) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!email.trim()) {
        setError(t.auth.emailRequired);
        return;
      }

      if (mode === "signup" && !name.trim()) {
        setError(t.auth.nameRequired);
        return;
      }

      // Login without a legacy code is allowed for local fallback; Supabase will require a password.

      const result = await onSubmit(mode, {
        email: email.trim(),
        name: mode === "signup" ? name.trim() : undefined,
        password: password.trim() || undefined,
      });

      if (!result.ok) {
        setError(result.error || t.auth.authFailed);
      } else {
        // Clear form on success
        setEmail("");
        setName("");
      setPassword("");
      setShowPassword(false);
    }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-[32px] border border-border/70 bg-[radial-gradient(circle_at_top_left,rgba(248,250,252,0.96),rgba(240,245,250,0.94)_42%,rgba(230,245,240,0.78)_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(40,35,70,0.9),rgba(35,30,60,0.85)_42%,rgba(30,25,55,0.8)_100%)] p-5 shadow-[0_32px_90px_rgba(77,73,122,0.18)] ring-1 ring-ring/60 sm:p-7">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-popover/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            {t.auth.personalSpace}
          </div>
          <h2 className="text-[2rem] font-semibold tracking-tight text-foreground sm:text-[3rem] sm:leading-[1.05]">
            {t.auth.mainTitle}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            {t.auth.mainDesc}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[24px] bg-card/80 p-4 shadow-sm ring-1 ring-ring/70">
              <p className="text-sm font-semibold text-foreground">{t.auth.userSpecificHabits}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {t.auth.userSpecificDesc}
              </p>
            </div>
            <div className="rounded-[24px] bg-card/80 p-4 shadow-sm ring-1 ring-ring/70">
              <p className="text-sm font-semibold text-foreground">{t.auth.privateChart}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {t.auth.privateChartDesc}
              </p>
            </div>
            <div className="rounded-[24px] bg-card/80 p-4 shadow-sm ring-1 ring-ring/70">
              <p className="text-sm font-semibold text-foreground">{t.auth.personalAI}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {t.auth.personalAIDesc}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`rounded-[30px] border border-border/70 ${
            mode === "signup" ? "bg-primary/15 text-foreground border-primary/30 dark:bg-primary/10" : "bg-card/88 dark:bg-slate-900/40"
          } p-5 shadow-sm sm:p-6`}
        >
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-secondary/60 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
              }}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.auth.logIn}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError(null);
              }}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                mode === "signup"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.auth.signUp}
            </button>
          </div>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground" htmlFor="name">
                    <UserRound className="h-4 w-4 text-primary" />
                    {t.auth.nameLabel}
                  </label>
                  <input
                    id="name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setError(null);
                    }}
                    placeholder={t.auth.namePlaceholder}
                    className="h-12 w-full rounded-2xl border border-border bg-secondary/20 px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground" htmlFor="email">
                  <UserRound className="h-4 w-4 text-primary" />
                  {t.auth.emailLabel}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError(null);
                  }}
                  placeholder={t.auth.emailPlaceholder}
                  className="h-12 w-full rounded-2xl border border-border bg-secondary/20 px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                />
              </div>

              {/* legacy code field removed */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground" htmlFor="password">
                  <KeyRound className="h-4 w-4 text-primary" />
                  {t.auth.passwordLabel}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError(null);
                    }}
                    placeholder={mode === "login" ? t.auth.passwordPlaceholderLogin : t.auth.passwordPlaceholderSignup}
                    className="h-12 w-full rounded-2xl border border-border bg-secondary/20 px-4 pr-12 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                    aria-label={showPassword ? t.auth.hidePassword : t.auth.showPassword}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {error ? (
              <p className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                {error}
              </p>
            ) : (
              <p className="mt-4 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
                {mode === "login"
                  ? t.auth.infoLoginMessage
                  : t.auth.infoSignupMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:bg-primary/90 active:scale-95"
            >
              {isSubmitting ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                mode === "login" ? <LogIn className="h-4 w-4" /> : <UserRoundPlus className="h-4 w-4" />
              )}
              <span className="inline-block">{isSubmitting ? t.auth.pleaseWait : (mode === "login" ? t.auth.loginButton : t.auth.createAccountButton)}</span>
            </button>
          </form>

          {hasExistingUsers ? (
            <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
              {t.auth.existingUsersMessage}
            </p>
          ) : (
            <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
              {t.auth.newAccountMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
