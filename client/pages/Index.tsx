import AuthPanel, { type AuthMode } from "@/components/habit-tracker/AuthPanel";
import AIHabitQuiz from "@/components/habit-tracker/AIHabitQuiz";
import HabitGrid from "@/components/habit-tracker/HabitGrid";
import ProgressOverview from "@/components/habit-tracker/ProgressOverview";
import ProgressCircle from "@/components/habit-tracker/ProgressCircle";
import StatisticsPanel from "@/components/habit-tracker/StatisticsPanel";
import {
  createHabitItem,
  slugify,
  type HabitItem,
  type HabitSuggestion,
} from "@/components/habit-tracker/habit-data";
import {
  authenticateUser,
  clearActiveUser,
  createUserAccount,
  createUserAccountWithSupabase,
  getActiveUser,
  getStoredUsers,
  updateUserAccount,
  loadUserFromSupabase,
} from "@/components/habit-tracker/user-storage";
import { isSupabaseConfigured, signInWithPassword, signUpWithPassword } from "@/lib/supabaseClient";
import supabase from "@/lib/supabaseClient";
import AppShell from "@/components/layout/AppShell";
import { useLanguage } from "@/lib/language-context";
import { BrainCircuit, LogOut, Plus, Sparkles, Target, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface ActiveUserState {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export default function Index() {
  const { t } = useLanguage();
  const [habits, setHabits] = useState<HabitItem[]>([]);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [quickHabit, setQuickHabit] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasStoredUsers, setHasStoredUsers] = useState(false);
  const [activeUser, setActiveUser] = useState<ActiveUserState | null>(null);
  const [showAIQuiz, setShowAIQuiz] = useState(false);

  const applyActiveUser = (user: {
    id: string;
    email: string;
    name: string;
    created_at: string;
    habits: HabitItem[];
    onboardingComplete: boolean;
  }) => {
    setActiveUser({ id: user.id, email: user.email, name: user.name, created_at: user.created_at });
    setHabits(user.habits);
    setOnboardingComplete(user.onboardingComplete);
    setQuickHabit("");
  };

  useEffect(() => {
    const loadUser = async () => {
      if (isSupabaseConfigured() && supabase) {
        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (user) {
          // user is still logged in
          const result = await loadUserFromSupabase(user.email!);
          if (result.ok && result.user) {
            applyActiveUser(result.user);
            setIsHydrated(true);
            return;
          }
        }
      }

      // Fallback to local storage
      const storedUsers = getStoredUsers();
      const storedActiveUser = getActiveUser();

      setHasStoredUsers(storedUsers.length > 0);

      if (storedActiveUser) {
        applyActiveUser(storedActiveUser);
      }

      setIsHydrated(true);
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (!isHydrated || !activeUser) return;
    updateUserAccount(activeUser.email, { habits, onboardingComplete });
  }, [activeUser, habits, onboardingComplete, isHydrated]);

  useEffect(() => {
    if (isSupabaseConfigured() && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          console.log("User is logged in:", session.user);
          // Load user data from Supabase
          loadUserFromSupabase(session.user.email!).then(result => {
            if (result.ok && result.user) {
              applyActiveUser(result.user);
            }
          });
        } else {
          console.log("User is logged out");
          // Clear active user
          setActiveUser(null);
          clearActiveUser();
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const completedCount = useMemo(
    () => habits.reduce((total, habit) => total + habit.completions.filter(Boolean).length, 0),
    [habits],
  );

  const createdAtLabel = useMemo(() => {
    if (!activeUser) return "";

    return new Date(activeUser.created_at).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [activeUser]);

  const challengeMessage = useMemo(() => {
    if (!habits.length) {
      return t.challenge.startWithAI;
    }

    if (!activeUser) {
      return `${habits.length} ${t.habits.habits.toLowerCase()} · ${completedCount} ${t.common.savedCheckIns}`;
    }

    return `${habits.length} ${t.habits.habits.toLowerCase()} · ${completedCount} ${t.common.savedCheckIns} for ${activeUser.name}`;
  }, [activeUser, completedCount, habits.length, t]);

  const mergeHabits = (suggestions: HabitSuggestion[], completeOnboarding: boolean) => {
    setHabits((current) => {
      const existing = new Set(current.map((habit) => habit.name.toLowerCase()));
      const nextHabits = suggestions
        .filter((habit) => !existing.has(habit.name.toLowerCase()))
        .map(createHabitItem);

      return [...current, ...nextHabits];
    });

    if (completeOnboarding) {
      setOnboardingComplete(true);
    }
  };

  const toggleDay = (habitId: string, dayIndex: number) => {
    setHabits((current) =>
      current.map((habit) => {
        if (habit.id !== habitId) return habit;

        const nextCompletions = [...habit.completions];
        nextCompletions[dayIndex] = !nextCompletions[dayIndex];

        return {
          ...habit,
          completions: nextCompletions,
        };
      }),
    );
  };

  const removeHabit = (habitId: string) => {
    setHabits((current) => current.filter((habit) => habit.id !== habitId));
  };

  const addQuickHabit = () => {
    const name = quickHabit.trim();
    if (!name) return;

    const alreadyExists = habits.some(
      (habit) => habit.name.toLowerCase() === name.toLowerCase(),
    );
    if (alreadyExists) {
      setQuickHabit("");
      return;
    }

    setHabits((current) => [
      ...current,
      {
        id: slugify(name),
        name,
        category: t.common.custom,
        cadence: t.common.anytime,
        completions: Array.from({ length: 30 }, () => false),
      },
    ]);
    setQuickHabit("");
  };

  const resetChallenge = () => {
    setHabits([]);
    setOnboardingComplete(false);
    setQuickHabit("");
  };

  const handleAuthSubmit = async (
    mode: AuthMode,
    credentials: { email: string; name?: string; code?: string; password?: string },
  ) => {
    const email = credentials.email.trim();
    const name = credentials.name?.trim() ?? "";

    // If Supabase is configured, prefer password-based auth
    if (isSupabaseConfigured()) {
      if (mode === "signup") {
        if (!credentials.password) return { ok: false, error: "Password required for signup." };
        const { data, error } = await signUpWithPassword(email, credentials.password, name || undefined);

        console.log("DATA:", data);
        console.log("ERROR:", error);
        if (error) return { ok: false, error: (error as any).message ?? String(error) };
        
        // Create user account in Supabase (with profile and habits tables)
        const created = await createUserAccountWithSupabase(name || "", email);
        if (!created.ok || !created.user) {
          return { ok: false, error: created.error ?? "Failed to create user profile in database" };
        }
        
        applyActiveUser(created.user);
        setHasStoredUsers(true);
        return { ok: true };
      }

      // login with Supabase
      if (mode === "login") {
        if (!credentials.password) return { ok: false, error: "Password required for login." };
        const { data, error } = await signInWithPassword(email, credentials.password);
        if (error) return { ok: false, error: (error as any).message ?? String(error) };
        
        // Try to load user data from Supabase
        const supabaseResult = await loadUserFromSupabase(email);
        if (supabaseResult.ok && supabaseResult.user) {
          applyActiveUser(supabaseResult.user);
          setHasStoredUsers(true);
          return { ok: true };
        }
        
        // Fallback: create local profile when Supabase data not found
        const stored = getStoredUsers();
        const existing = stored.find((u) => u.email === email.toLowerCase());
        if (existing) {
          applyActiveUser(existing);
          setHasStoredUsers(stored.length > 0);
          return { ok: true };
        }
        const profileName = (data?.user?.user_metadata as any)?.full_name || name || "";
        const created = createUserAccount(profileName || "", email);
        if (!created.ok || !created.user) return { ok: false, error: created.error ?? "Failed to create local profile" };
        applyActiveUser(created.user);
        setHasStoredUsers(true);
        return { ok: true };
      }
    }

    // fallback: local auth flow (email-only)
    const result = mode === "signup"
      ? createUserAccount(name || "", email)
      : authenticateUser(email);

    if (!result.ok || !result.user) {
      return { ok: false, error: result.error ?? "Something went wrong." };
    }

    applyActiveUser(result.user);
    setHasStoredUsers(true);
    return { ok: true };
  };

  const logout = () => {
    clearActiveUser();
    setActiveUser(null);
    setHabits([]);
    setOnboardingComplete(false);
    setQuickHabit("");
    setHasStoredUsers(getStoredUsers().length > 0);
  };

  const markTodayComplete = (habitId: string) => {
    setHabits((current) =>
      current.map((habit) => {
        if (habit.id !== habitId) return habit;
        const nextCompletions = [...habit.completions];
        nextCompletions[29] = true; // Today is day 30 (index 29)
        return { ...habit, completions: nextCompletions };
      }),
    );
  };

  const resetMonth = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all progress for this month? This cannot be undone.",
    );
    if (confirmed) {
      setHabits((current) =>
        current.map((habit) => ({
          ...habit,
          completions: Array.from({ length: 30 }, () => false),
        })),
      );
    }
  };

  const markAllTodayComplete = () => {
    setHabits((current) =>
      current.map((habit) => {
        const nextCompletions = [...habit.completions];
        nextCompletions[29] = true;
        return { ...habit, completions: nextCompletions };
      }),
    );
  };

  return (
    <AppShell>
      {!isHydrated ? (
        <section className="rounded-[30px] border border-border bg-card/88 p-8 text-center shadow-[0_24px_70px_rgba(77,73,122,0.12)]">
          <p className="text-sm font-medium text-muted-foreground">Loading your saved habit tracker...</p>
        </section>
      ) : !activeUser ? (
        <AuthPanel hasExistingUsers={hasStoredUsers} onSubmit={handleAuthSubmit} />
      ) : (
        <div className="space-y-4 sm:space-y-5">
          <section className="overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),rgba(240,237,255,0.9)_38%,rgba(216,250,237,0.72)_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(40,35,70,0.8),rgba(35,30,60,0.75)_38%,rgba(30,25,55,0.7)_100%)] p-5 shadow-[0_32px_90px_rgba(77,73,122,0.18)] ring-1 ring-ring/70 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <div
                  className="mb-4 inline-flex items-center gap-2 rounded-full bg-popover/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-sm"
                >
                  <BrainCircuit className="h-4 w-4" />
                  Gentle daily momentum
                </div>
                <h2
                  className="text-[2rem] font-semibold tracking-tight text-foreground sm:text-[3.2rem] sm:leading-[1.05]"
                >
                  {t.hero.headline}
                </h2>
                <p
                  className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base"
                >
                  {t.hero.subheading}
                </p>
              </div>

                <div className="flex w-full flex-col gap-3 sm:min-w-[19rem] sm:max-w-[22rem]">
                <div
                  className="rounded-[24px] bg-card/85 p-4 shadow-sm ring-1 ring-ring/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Active account
                      </p>
                      <p className="mt-2 text-lg font-semibold text-foreground">{activeUser.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {activeUser.email} • Created {createdAtLabel}
                      </p>
                      {/* legacy user code removed */}
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <UserRound className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="btn btn-ghost inline-flex h-11 items-center justify-center gap-2 px-4 text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>

                <div
                  className="grid grid-cols-2 gap-3"
                >
                  <div
                    className="rounded-[24px] bg-card/85 p-4 shadow-sm ring-1 ring-ring/60"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {t.hero.activeHabits}
                    </p>
                    <p
                      className="mt-3 text-3xl font-semibold text-foreground"
                    >
                      {habits.length}
                    </p>
                  </div>
                  <div
                    className="rounded-[24px] bg-card/85 p-4 shadow-sm ring-1 ring-ring/60"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {t.hero.dayTracked}
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-foreground">30</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="mt-6 rounded-[28px] border border-border bg-card/70 p-4 shadow-sm backdrop-blur sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.hero.challengeStatus}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{challengeMessage}</p>
                </div>
                <button
                  type="button"
                  onClick={resetChallenge}
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-border bg-card px-4 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-primary/5"
                >
                  {t.hero.resetChallenge}
                </button>
              </div>
            </div>
          </section>

          {!onboardingComplete ? (
            <div>
              <AIHabitQuiz
                onApplyHabits={mergeHabits}
                onClose={() => setShowAIQuiz(false)}
              />
            </div>
          ) : (
            <section
              className="rounded-[30px] border border-border bg-card/88 p-5 shadow-[0_24px_70px_rgba(77,73,122,0.12)] sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div
                    className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                  >
                    <Target className="h-4 w-4" />
                    {t.challenge.challengeActive}
                  </div>
                  <h2
                    className="text-xl font-semibold text-foreground"
                  >
                    {t.challenge.challengeLive}
                  </h2>
                  <p
                    className="mt-2 text-sm leading-6 text-muted-foreground"
                  >
                    {t.challenge.challengeDesc}
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={markAllTodayComplete}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-primary/5"
                  >
                    Mark all today
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAIQuiz(true)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_rgba(109,94,252,0.28)] transition hover:translate-y-[-1px]"
                  >
                    <Sparkles className="h-4 w-4" />
                    Suggest habits with AI
                  </button>
                </div>
              </div>
            </section>
          )}

          <section
            className="rounded-[30px] border border-border bg-card/88 p-5 shadow-[0_24px_70px_rgba(77,73,122,0.12)] sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  className="text-xl font-semibold text-foreground"
                >
                  {t.quickAdd.title}
                </h2>
                <p
                  className="mt-2 text-sm leading-6 text-muted-foreground"
                >
                  {t.quickAdd.subtitle}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                value={quickHabit}
                onChange={(event) => setQuickHabit(event.target.value)}
                placeholder={t.quickAdd.placeholder}
                className="h-12 flex-1 rounded-2xl border border-border bg-secondary/30 px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
              />
              <button
                type="button"
                onClick={addQuickHabit}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_rgba(109,94,252,0.28)] transition hover:translate-y-[-1px]"
              >
                <Plus className="h-4 w-4" />
                {t.quickAdd.addBtn}
              </button>
            </div>
          </section>

          {habits.length > 0 && <ProgressCircle habits={habits} />}

          <ProgressOverview habits={habits} />

          {habits.length > 0 && (
            <section
              className="rounded-[30px] border border-border bg-card/88 p-5 shadow-[0_24px_70px_rgba(77,73,122,0.12)] sm:p-6"
            >
              <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    const name = prompt("Enter habit name:");
                    if (name && name.trim()) {
                      addQuickHabit();
                      setQuickHabit(name);
                      addQuickHabit();
                      setQuickHabit("");
                    }
                  }}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-primary/5"
                >
                  Add Habit
                </button>
                <button
                  type="button"
                  onClick={markAllTodayComplete}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-primary/5"
                >
                  ✓ Mark all complete
                </button>
                <button
                  type="button"
                  onClick={resetMonth}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 text-sm font-semibold text-destructive transition hover:bg-destructive/10"
                >
                  Reset month
                </button>
              </div>
            </section>
          )}

          <StatisticsPanel habits={habits} />

          {habits.length ? (
            <HabitGrid
              habits={habits}
              onToggleDay={toggleDay}
              onRemoveHabit={removeHabit}
              onMarkTodayComplete={markTodayComplete}
            />
          ) : (
            <section
              className="rounded-[30px] border border-dashed border-primary/30 bg-primary/5 p-8 text-center shadow-sm"
            >
              <div>
                <h2 className="text-xl font-semibold text-foreground">Your 30-day grid is ready</h2>
              </div>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                {t.challenge.startWithAI}
              </p>
            </section>
          )}

          {showAIQuiz && onboardingComplete && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            >
              <div
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <AIHabitQuiz
                  onApplyHabits={(habits, complete) => {
                    mergeHabits(habits, complete);
                    setShowAIQuiz(false);
                  }}
                  onClose={() => setShowAIQuiz(false)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </AppShell>
  );
}
