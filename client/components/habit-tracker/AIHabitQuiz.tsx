import { Plus, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import {
  buildHabitSuggestions,
  slugify,
  type HabitSuggestion,
  type QuizAnswers,
} from "./habit-data";

interface AIHabitQuizProps {
  onApplyHabits: (habits: HabitSuggestion[], completeOnboarding: boolean) => void;
  onClose?: () => void;
}

const initialAnswers: QuizAnswers = {};

export default function AIHabitQuiz({
  onApplyHabits,
  onClose,
}: AIHabitQuizProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [results, setResults] = useState<HabitSuggestion[]>([]);
  const [customHabit, setCustomHabit] = useState("");
  const [hasAppliedResults, setHasAppliedResults] = useState(false);

  const quizQuestions = useMemo(() => [
    {
      id: "goal" as const,
      title: t.quiz.improveArea,
      subtitle: t.quiz.improveAreaDesc,
      options: [
        t.options.discipline,
        t.options.health,
        t.options.learning,
        t.options.spirituality,
        t.options.productivity,
        t.options.financial,
        t.options.social,
        t.options.creative,
      ],
    },
    {
      id: "dailyTime" as const,
      title: t.quiz.dailyTime,
      subtitle: t.quiz.dailyTimeDesc,
      options: [
        t.options.fiveMin,
        t.options.tenMin,
        t.options.twentyMin,
        t.options.thirtyMin,
        t.options.fortyFiveMin,
        t.options.sixtyMin,
      ],
    },
    {
      id: "preferredType" as const,
      title: t.quiz.preference,
      subtitle: t.quiz.preferenceDesc,
      options: [
        t.options.mental,
        t.options.physical,
        t.options.religious,
        t.options.study,
        t.options.mixed,
        t.options.mindfulness,
        t.options.work,
      ],
    },
  ], [t]);

  const totalSteps = quizQuestions.length;
  const activeQuestion = quizQuestions[step];
  const progress = useMemo(() => ((step + 1) / totalSteps) * 100, [step, totalSteps]);

  const handleSelect = (value: string) => {
    let normalizedValue: string;

    // Map translated options back to English keys
    const goalMap: Record<string, string> = {
      [t.options.discipline]: "discipline",
      [t.options.health]: "health",
      [t.options.learning]: "learning",
      [t.options.spirituality]: "spirituality",
      [t.options.productivity]: "productivity",
      [t.options.financial]: "financial",
      [t.options.social]: "social",
      [t.options.creative]: "creative",
    };

    const timeMap: Record<string, string> = {
      [t.options.fiveMin]: "5 min",
      [t.options.tenMin]: "10 min",
      [t.options.twentyMin]: "20 min",
      [t.options.thirtyMin]: "30 min",
      [t.options.fortyFiveMin]: "45 min",
      [t.options.sixtyMin]: "60 min",
    };

    const typeMap: Record<string, string> = {
      [t.options.mental]: "mental",
      [t.options.physical]: "physical",
      [t.options.religious]: "religious",
      [t.options.study]: "study",
      [t.options.mixed]: "mixed",
      [t.options.mindfulness]: "mindfulness",
      [t.options.work]: "work",
    };

    if (activeQuestion.id === "goal") {
      normalizedValue = goalMap[value] || value.toLowerCase();
    } else if (activeQuestion.id === "dailyTime") {
      normalizedValue = timeMap[value] || value;
    } else if (activeQuestion.id === "preferredType") {
      normalizedValue = typeMap[value] || value.toLowerCase();
    } else {
      normalizedValue = value.toLowerCase();
    }

    setAnswers((current) => ({ ...current, [activeQuestion.id]: normalizedValue }));
    setHasAppliedResults(false);
  };

  const canContinue = useMemo(() => {
    if (activeQuestion.id === "goal") return Boolean(answers.goal);
    if (activeQuestion.id === "dailyTime") return Boolean(answers.dailyTime);
    if (activeQuestion.id === "preferredType") return Boolean(answers.preferredType);
    return false;
  }, [activeQuestion.id, answers]);

  const generateResults = () => {
    const suggestions = buildHabitSuggestions(answers);

    // Translate habit names and reasons based on current language
    const translatedSuggestions = suggestions.map(habit => ({
      ...habit,
      name: t.habits[habit.id] || habit.name,
      reason: habit.reason, // Keep reasons in English for now, or add translations
    }));

    setResults(translatedSuggestions);
    setHasAppliedResults(false);

    // Log for debugging
    console.log("Generated suggestions:", {
      answers,
      suggestions: suggestions.map(s => ({ name: s.name, category: s.category })),
      count: suggestions.length,
    });
  };

  const goNext = () => {
    if (step === totalSteps - 1) {
      generateResults();
      return;
    }

    setStep((current) => current + 1);
  };

  const goBack = () => {
    if (results.length) {
      setResults([]);
      return;
    }

    setStep((current) => Math.max(current - 1, 0));
  };

  const removeSuggestion = (id: string) => {
    setResults((current) => current.filter((habit) => habit.id !== id));
    setHasAppliedResults(false);
  };

  const addCustomHabit = () => {
    if (!customHabit.trim()) return;

    const nextHabit = {
      id: slugify(customHabit),
      name: customHabit.trim(),
      category: t.common.custom,
      cadence: t.common.daily,
      reason: t.common.addedByYou,
    } satisfies HabitSuggestion;

    setResults((current) => {
      const exists = current.some(
        (habit) => habit.name.toLowerCase() === nextHabit.name.toLowerCase(),
      );
      return exists ? current : [...current, nextHabit];
    });
    setCustomHabit("");
    setHasAppliedResults(false);
  };

  const applyResults = (completeOnboarding: boolean) => {
    onApplyHabits(results, completeOnboarding);
    setHasAppliedResults(true);

    // Reset and close after a short delay
    setTimeout(() => {
      setStep(0);
      setAnswers(initialAnswers);
      setResults([]);
      setCustomHabit("");
      setHasAppliedResults(false);
      onClose?.();
    }, 800);
  };

  return (
    <section className="rounded-[32px] border border-border/70 bg-card/85 p-5 shadow-[0_28px_80px_rgba(77,73,122,0.14)] backdrop-blur-xl sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            AI Habit Assistant
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Smart habit suggestions
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            {t.quiz.subtitle}
          </p>

          {results.length === 0 && (
            <div className="mt-4 rounded-[16px] border border-primary/20 bg-primary/5 p-3">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-primary">How it works:</span> The AI generates 3-8 personalized habits based on your goal, available time, and preferred type. Religious habits are always included as the foundation.
              </p>
            </div>
          )}
        </div>

        {results.length === 0 ? (
          <div className="hidden rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground sm:block">
            Question {step + 1} of {totalSteps}
          </div>
        ) : null}
      </div>

      {results.length > 0 ? (
        <div className="mt-6 space-y-5">
          <div className="flex items-end justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground">{t.quiz.aiSuggestedHabits}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {results.length} {results.length !== 1 ? t.quiz.personalizedHabits : t.quiz.personalizedHabit} {t.quiz.basedOn} {answers.goal && `${answers.goal}`} {answers.dailyTime && `• ${answers.dailyTime} ${t.quiz.daily}`} {answers.preferredType && `• ${answers.preferredType}`}
              </p>
            </div>
          </div>

          {/* Selection Summary */}
          <div className="grid gap-2 sm:grid-cols-3 rounded-[20px] bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 p-4">
            {answers.goal && (
              <div>
                <p className="text-xs font-semibold text-primary">{t.quiz.goalLabel}</p>
                <p className="mt-1 text-sm font-medium text-foreground capitalize">{answers.goal}</p>
              </div>
            )}
            {answers.dailyTime && (
              <div>
                <p className="text-xs font-semibold text-primary">{t.quiz.timeLabel}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{answers.dailyTime}</p>
              </div>
            )}
            {answers.preferredType && (
              <div>
                <p className="text-xs font-semibold text-primary">{t.quiz.typeLabel}</p>
                <p className="mt-1 text-sm font-medium text-foreground capitalize">{answers.preferredType}</p>
              </div>
            )}
          </div>

          {/* Smart Tips */}
          <div className="rounded-[16px] border border-emerald-200/50 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-emerald-700">{t.quiz.smartTip}</p>
            <p className="mt-2 text-sm text-emerald-600">
              {answers.goal === "spirituality" && t.quiz.prayerQuranAlways}
              {answers.goal === "discipline" && t.quiz.disciplineTip}
              {answers.goal === "health" && t.quiz.healthTip}
              {answers.goal === "learning" && t.quiz.learningTip}
              {answers.goal === "productivity" && t.quiz.productivityTip}
              {answers.goal === "financial" && t.quiz.financialTip}
              {answers.goal === "social" && t.quiz.socialTip}
              {answers.goal === "creative" && t.quiz.creativeTip}
            </p>
          </div>

          <div className="grid gap-3">
            {results.map((habit, idx) => {
              const isMustHave = habit.id === "prayer" || habit.id === "quran";

              return (
                <div
                  key={habit.id}
                  className={`rounded-[24px] border p-4 shadow-sm transition ${
                    isMustHave
                      ? "border-primary/30 bg-primary/5"
                      : "border-border/60 bg-secondary/50 hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-semibold text-foreground">
                          {isMustHave && "🔗 "}{habit.name}
                        </h4>
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                          isMustHave
                            ? "bg-primary/10 text-primary"
                            : "bg-popover text-muted-foreground"
                        }`}>
                          {habit.category}
                        </span>
                        {isMustHave && (
                          <span className="text-xs font-semibold text-primary">Essential</span>
                        )}
                      </div>
                      <p className="mt-2 text-sm font-medium text-primary">{habit.cadence}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{habit.reason}</p>

                      {/* Benefit indicators (localized) */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {habit.category === "Spirituality" && (
                          <>
                            <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-medium text-purple-700">✨ {t.options.spirituality}</span>
                            <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700">🧘 {t.options.focus}</span>
                          </>
                        )}
                        {habit.category === "Health" && (
                          <>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">💪 {t.options.health}</span>
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">⚡ {t.options.energy}</span>
                          </>
                        )}
                        {habit.category === "Learning" && (
                          <>
                            <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">🧠 {t.options.learning}</span>
                            <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-700">📚 {t.options.success}</span>
                          </>
                        )}
                        {habit.category === "Productivity" && (
                          <>
                            <span className="inline-flex items-center rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-medium text-pink-700">🎯 {t.options.productivity}</span>
                            <span className="inline-flex items-center rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-medium text-rose-700">⏱️ {t.options.consistency}</span>
                          </>
                        )}
                        {habit.category === "Discipline" && (
                          <>
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">🎯 {t.options.discipline}</span>
                            <span className="inline-flex items-center rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-medium text-cyan-700">🔄 {t.options.consistency}</span>
                          </>
                        )}
                        {habit.category === "Financial" && (
                          <>
                            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">💰 {t.options.financial}</span>
                            <span className="inline-flex items-center rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-medium text-teal-700">📈 {t.options.success}</span>
                          </>
                        )}
                        {habit.category === "Social" && (
                          <>
                            <span className="inline-flex items-center rounded-full bg-fuchsia-100 px-2 py-0.5 text-[10px] font-medium text-fuchsia-700">👥 {t.options.social}</span>
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-700">❤️ {t.options.success}</span>
                          </>
                        )}
                        {habit.category === "Creative" && (
                          <>
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-medium text-yellow-700">🎨 {t.options.creative}</span>
                            <span className="inline-flex items-center rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700">✍️ {t.options.success}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {!isMustHave && (
                      <button
                        type="button"
                        onClick={() => removeSuggestion(habit.id)}
                        className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-popover text-muted-foreground transition hover:border-destructive hover:text-destructive"
                        aria-label={`Remove ${habit.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-[24px] border border-dashed border-primary/30 bg-primary/5 p-4">
            <label className="text-sm font-semibold text-foreground" htmlFor="custom-habit">
              Add your own habit
            </label>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                id="custom-habit"
                value={customHabit}
                onChange={(event) => setCustomHabit(event.target.value)}
                placeholder="Type a habit..."
                className="h-12 flex-1 rounded-2xl border border-border bg-secondary/20 px-4 text-sm outline-none ring-0 transition placeholder:text-muted-foreground focus:border-primary"
                onKeyDown={(e) => e.key === "Enter" && addCustomHabit()}
              />
              <button
                type="button"
                onClick={addCustomHabit}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-card px-4 text-sm font-semibold text-foreground shadow-sm transition hover:shadow-md"
              >
                <Plus className="h-4 w-4 text-primary" />
                Add
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => applyResults(false)}
              className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-secondary px-5 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/80"
            >
              {t.quiz.addHabits}
            </button>
            <button
              type="button"
              onClick={() => applyResults(true)}
              className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_rgba(109,94,252,0.28)] transition hover:translate-y-[-1px]"
            >
              {t.quiz.startChallenge}
            </button>
          </div>

          {hasAppliedResults ? (
            <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {t.quiz.viewInGrid}
            </p>
          ) : null}

          <button
            type="button"
            onClick={goBack}
            className="text-sm font-semibold text-muted-foreground transition hover:text-foreground"
          >
            {t.quiz.backToQuestions}
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-6 rounded-[28px] bg-secondary/45 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/80">
              Question {step + 1} of {totalSteps}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">{activeQuestion.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{activeQuestion.subtitle}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {activeQuestion.options.map((option) => {
                // Create normalized key for comparison
                let normalizedKey: string;
                if (activeQuestion.id === "goal") {
                  const goalMap: Record<string, string> = {
                    [t.options.discipline]: "discipline",
                    [t.options.health]: "health",
                    [t.options.learning]: "learning",
                    [t.options.spirituality]: "spirituality",
                    [t.options.productivity]: "productivity",
                    [t.options.financial]: "financial",
                    [t.options.social]: "social",
                    [t.options.creative]: "creative",
                  };
                  normalizedKey = goalMap[option] || option.toLowerCase();
                } else if (activeQuestion.id === "dailyTime") {
                  const timeMap: Record<string, string> = {
                    [t.options.fiveMin]: "5 min",
                    [t.options.tenMin]: "10 min",
                    [t.options.twentyMin]: "20 min",
                    [t.options.thirtyMin]: "30 min",
                    [t.options.fortyFiveMin]: "45 min",
                    [t.options.sixtyMin]: "60 min",
                  };
                  normalizedKey = timeMap[option] || option;
                } else if (activeQuestion.id === "preferredType") {
                  const typeMap: Record<string, string> = {
                    [t.options.mental]: "mental",
                    [t.options.physical]: "physical",
                    [t.options.religious]: "religious",
                    [t.options.study]: "study",
                    [t.options.mixed]: "mixed",
                    [t.options.mindfulness]: "mindfulness",
                    [t.options.work]: "work",
                  };
                  normalizedKey = typeMap[option] || option.toLowerCase();
                } else {
                  normalizedKey = option.toLowerCase();
                }

                const isSelected = answers[activeQuestion.id] === normalizedKey;

                const getHelpText = () => {
                  // Use localized help text from translations
                  if (activeQuestion.id === "goal") {
                    return (t.quiz as any).helpGoal?.[normalizedKey] || "";
                  }

                  if (activeQuestion.id === "dailyTime") {
                    return (t.quiz as any).helpTime?.[normalizedKey] || "";
                  }

                  if (activeQuestion.id === "preferredType") {
                    return (t.quiz as any).helpType?.[normalizedKey] || "";
                  }

                  return "";
                };

                return (
                  <div key={option}>
                    <button
                      type="button"
                      onClick={() => handleSelect(option)}
                      className={`w-full rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-[0_18px_40px_rgba(109,94,252,0.25)]"
                          : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      {option}
                    </button>
                    {isSelected && getHelpText() && (
                      <p className="mt-2 text-xs text-muted-foreground italic">
                        {getHelpText()}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Preview count */}
            {answers.dailyTime && (
              <div className="mt-5 rounded-[16px] bg-primary/5 p-3 border border-primary/20">
                <p className="text-xs font-medium text-primary">
                  💡 {t.quiz.basedOnAnswers}
                </p>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl border border-border bg-card px-4 text-sm font-semibold text-foreground transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canContinue}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_rgba(109,94,252,0.28)] transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                {step === totalSteps - 1 ? "See suggestions" : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
