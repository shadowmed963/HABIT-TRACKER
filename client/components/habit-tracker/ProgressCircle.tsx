import { getTodayCompleted, type HabitItem } from "./habit-data";
import { useLanguage } from "@/lib/language-context";

interface ProgressCircleProps {
  habits: HabitItem[];
}

export default function ProgressCircle({ habits }: ProgressCircleProps) {
  const { t } = useLanguage();
  const todayCompleted = getTodayCompleted(habits);
  const total = habits.length || 1;
  const percentage = Math.round((todayCompleted / total) * 100);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center gap-6 rounded-[28px] border border-border/70 bg-card/88 p-6 shadow-sm sm:p-8">
      <div className="relative h-32 w-32 sm:h-40 sm:w-40">
        <svg className="h-full w-full" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            stroke="hsl(var(--secondary))"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
            style={{ transform: "rotate(-90deg)", transformOrigin: "60px 60px" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-bold text-foreground sm:text-4xl">
            {percentage}%
          </p>
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            {t.common.todaysGoal}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            Completed today
          </p>
          <p className="mt-1 text-3xl font-bold text-foreground">
            {todayCompleted}
            <span className="ml-2 text-lg font-medium text-muted-foreground">
              / {total}
            </span>
          </p>
        </div>
        <div className="rounded-[16px] bg-primary/10 p-3">
          <p className="text-sm font-medium text-primary">
            {percentage === 100
              ? "🎉 Perfect day!"
              : percentage >= 50
                ? "✨ Great progress!"
                : percentage > 0
                  ? "💪 Keep going!"
                  : "🌅 Start your day"}
          </p>
        </div>
      </div>
    </div>
  );
}
