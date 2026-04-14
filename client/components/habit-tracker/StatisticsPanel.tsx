import { Award, Target, TrendingUp, Zap } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import {
  getBestHabit,
  getSuccessRate,
  getTodayCompleted,
  getWorstHabit,
  type HabitItem,
} from "./habit-data";

interface StatisticsPanelProps {
  habits: HabitItem[];
}

export default function StatisticsPanel({ habits }: StatisticsPanelProps) {
  const { t } = useLanguage();
  const successRate = getSuccessRate(habits);
  const todayCompleted = getTodayCompleted(habits);
  const bestHabit = getBestHabit(habits);
  const worstHabit = getWorstHabit(habits);

  const statCardClass =
    "rounded-[20px] border border-border/50 bg-card/60 p-4 backdrop-blur-sm";

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {/* Success Rate */}
      <div className={statCardClass}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {t.statistics.successRate}
          </p>
          <TrendingUp className="h-4 w-4 text-primary" />
        </div>
        <p className="mt-3 text-2xl font-bold text-foreground">{successRate}%</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {t.statistics.overallCompletion}
        </p>
      </div>

      {/* Completed Today */}
      <div className={statCardClass}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {t.statistics.today}
          </p>
          <Zap className="h-4 w-4 text-emerald-500" />
        </div>
        <p className="mt-3 text-2xl font-bold text-foreground">
          {todayCompleted}
          <span className="ml-1 text-sm font-medium text-muted-foreground">
            / {habits.length || 0}
          </span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {t.statistics.habitsCompleted}
        </p>
      </div>

      {/* Total Habits */}
      <div className={statCardClass}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {t.statistics.tracking}
          </p>
          <Target className="h-4 w-4 text-purple-500" />
        </div>
        <p className="mt-3 text-2xl font-bold text-foreground">{habits.length}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {t.statistics.activeHabits}
        </p>
      </div>

      {/* Best Habit */}
      <div className={statCardClass}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {t.statistics.best}
          </p>
          <Award className="h-4 w-4 text-amber-500" />
        </div>
        <p className="mt-3 text-sm font-bold text-foreground truncate">
          {bestHabit?.habit.name || "—"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {bestHabit?.count || 0} {t.statistics.completions}
        </p>
      </div>

      {/* Worst Habit */}
      <div className={statCardClass}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {t.statistics.focusArea}
          </p>
          <Target className="h-4 w-4 text-orange-500" />
        </div>
        <p className="mt-3 text-sm font-bold text-foreground truncate">
          {worstHabit?.habit.name || "—"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {worstHabit?.count || 0} {t.statistics.completions}
        </p>
      </div>
    </div>
  );
}
