import { Flame } from "lucide-react";
import { motion } from "framer-motion";
import type { HabitItem } from "./habit-data";
import { useLanguage } from "@/lib/language-context";
import StreakBadge from "./StreakBadge";
import { CheckCircle2, Calendar } from "lucide-react";

interface HabitCardsProps {
  habits: HabitItem[];
  onMarkComplete?: (habitId: string) => void;
}

export default function HabitCards({ habits, onMarkComplete }: HabitCardsProps) {
  const { language } = useLanguage();

  if (habits.length === 0) return null;

  const calculateStreak = (completions: boolean[]): number => {
    let streak = 0;
    for (let i = completions.length - 1; i >= 0; i--) {
      if (completions[i]) streak++;
      else break;
    }
    return streak;
  };

  const calculateCompletion = (completions: boolean[]): number => {
    const completed = completions.filter(Boolean).length;
    return Math.round((completed / completions.length) * 100);
  };

  const isTodayComplete = (habit: HabitItem): boolean => {
    return habit.completions[29]; // Day 30 (index 29)
  };

  return (
    <div
      className="scrollbar-hide -mx-3 overflow-x-auto px-3 sm:-mx-6 sm:px-6"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="flex gap-2 pb-2 sm:gap-3">
        {habits.map((habit, index) => {
          const streak = calculateStreak(habit.completions);
          const completion = calculateCompletion(habit.completions);
          const todayComplete = isTodayComplete(habit);

          return (
            <motion.div
              key={habit.id}
              className={`min-w-[150px] rounded-[20px] border border-border/50 bg-gradient-to-br from-card/95 to-card/70 p-4 shadow-sm ring-1 ring-ring/20 hover:ring-primary/30 hover:border-primary/20 transition-all sm:min-w-[180px] sm:p-5 ${onMarkComplete ? "cursor-pointer" : ""}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(34, 197, 94, 0.1)" }}
              onClick={() => onMarkComplete?.(habit.id)}
              role={onMarkComplete ? "button" : "presentation"}
              tabIndex={onMarkComplete ? 0 : -1}
            >
              {/* Header with name and streak */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="truncate text-xs font-semibold text-foreground sm:text-sm leading-tight">
                    {habit.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {habit.category}
                  </p>
                </div>
                <StreakBadge streak={streak} size="sm" animated={streak > 0} />
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {completion}%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {habit.completions.filter(Boolean).length}/{habit.completions.length}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/60">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 via-green-400 to-emerald-500 shadow-md"
                    initial={{ width: 0 }}
                    animate={{ width: `${completion}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.05 }}
                  />
                </div>
              </div>

              {/* Today status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {todayComplete ? "Done today" : "Pending"}
                  </span>
                </div>
                {todayComplete && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
