import { Flame } from "lucide-react";
import { motion } from "framer-motion";
import type { HabitItem } from "./habit-data";
import { useLanguage } from "@/lib/language-context";

interface HabitCardsProps {
  habits: HabitItem[];
}

export default function HabitCards({ habits }: HabitCardsProps) {
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

  return (
    <div
      className="scrollbar-hide -mx-3 overflow-x-auto px-3 sm:-mx-6 sm:px-6"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="flex gap-2 pb-2 sm:gap-3">
        {habits.map((habit, index) => {
          const streak = calculateStreak(habit.completions);
          const completion = calculateCompletion(habit.completions);

          return (
            <motion.div
              key={habit.id}
              className="min-w-[140px] rounded-[16px] border border-border/50 bg-gradient-to-br from-card to-card/80 p-3 shadow-sm ring-1 ring-ring/20 sm:min-w-[160px] sm:p-4"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -2, shadow: "0 8px 24px rgba(0,0,0,0.1)" }}
            >
              {/* Habit name */}
              <h3 className="truncate text-xs font-semibold text-foreground sm:text-sm">
                {habit.name}
              </h3>

              {/* Completion % */}
              <div className="mt-2 sm:mt-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">
                    Completed
                  </span>
                  <span className="text-sm font-bold text-emerald-600 sm:text-base">
                    {completion}%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary/60">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 via-green-400 to-emerald-500 shadow-md"
                    initial={{ width: 0 }}
                    animate={{ width: `${completion}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Streak */}
              <div className="mt-3 flex items-center gap-1.5 sm:mt-4">
                <motion.div
                  animate={streak > 0 ? { rotate: [0, 20, -20, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Flame
                    className={`h-4 w-4 ${
                      streak > 0 ? "text-orange-500" : "text-muted-foreground/30"
                    }`}
                  />
                </motion.div>
                <span className="text-xs font-semibold sm:text-sm">
                  <span className="text-orange-600">{streak}</span>
                  <span className="text-muted-foreground/60 ml-0.5">day</span>
                  {streak !== 1 && <span className="text-muted-foreground/60">s</span>}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style jsx>{`
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
