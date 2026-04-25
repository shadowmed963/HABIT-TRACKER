import { motion, useScroll } from "framer-motion";
import { User, LogOut, Settings, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { useMemo } from "react";
import type { HabitItem } from "@/components/habit-tracker/habit-data";
import { calculateCurrentStreak, getTodayIndex } from "@/components/habit-tracker/habit-data";

interface DashboardHeaderProps {
  userName?: string;
  habits: HabitItem[];
  onLogout?: () => void;
  onSettings?: () => void;
}

export default function DashboardHeader({
  userName,
  habits,
  onLogout,
  onSettings,
}: DashboardHeaderProps) {
  const { language, setLanguage } = useLanguage();
  const { scrollY } = useScroll();

  const stats = useMemo(() => {
    if (!habits || habits.length === 0) return null;

    const today = getTodayIndex();
    const completedToday = habits.filter((h) => h.completions[today]).length;
    const currentStreak = calculateCurrentStreak(habits);
    const successRate = Math.round((completedToday / habits.length) * 100);

    return {
      completedToday,
      totalHabits: habits.length,
      currentStreak,
      successRate,
    };
  }, [habits]);

  return (
    <>
      <motion.header
        className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md transition-shadow"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="px-4 py-4 sm:px-6 sm:py-5">
          {/* Top Row - Logo & Actions */}
          <div className="flex items-center justify-between mb-4 sm:mb-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500">
                <span className="text-lg font-bold text-white">✓</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Habit Tracker
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Your 30-day journey
                </p>
                {stats && (
                  <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    🔥 Streak: {stats.currentStreak} day{stats.currentStreak !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Mobile: Greeting */}
            <motion.div
              className="sm:hidden text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {userName ? `Hi, ${userName}` : "Welcome"}
              </p>
              {stats && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  {stats.completedToday}/{stats.totalHabits} done
                </p>
              )}
            </motion.div>

            {/* Right Actions */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Button
                variant="ghost"
                size="sm"
                disabled
                className="w-9 h-9 p-0 text-xs font-semibold"
              >
                EN
              </Button>

              {onSettings && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSettings}
                  className="w-9 h-9 p-0"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              )}

              {onLogout && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="w-9 h-9 p-0 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              )}
            </motion.div>
          </div>

          {stats && (
            <motion.div
              className="hidden sm:grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <span className="text-lg">✓</span>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Completed today</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {stats.completedToday}/{stats.totalHabits}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <span className="text-lg">🔥</span>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Current streak</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {stats.currentStreak} days
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <span className="text-lg">⭐</span>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Success rate</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {stats.successRate}%
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>

      {stats && (
        <motion.div
          className="sm:hidden sticky top-[70px] z-30 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md px-4 py-3"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center justify-around gap-2">
            <div className="flex-1 p-2 rounded-lg bg-emerald-100/50 dark:bg-emerald-900/20 text-center">
              <p className="text-[10px] text-slate-600 dark:text-slate-400">Today</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {stats.completedToday}/{stats.totalHabits}
              </p>
            </div>
            <div className="flex-1 p-2 rounded-lg bg-orange-100/50 dark:bg-orange-900/20 text-center">
              <p className="text-[10px] text-slate-600 dark:text-slate-400">Streak</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {stats.currentStreak}🔥
              </p>
            </div>
            <div className="flex-1 p-2 rounded-lg bg-purple-100/50 dark:bg-purple-900/20 text-center">
              <p className="text-[10px] text-slate-600 dark:text-slate-400">Success</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {stats.successRate}%
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
