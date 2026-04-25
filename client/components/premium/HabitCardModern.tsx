import { motion } from "framer-motion";
import type { HabitItem } from "@/components/habit-tracker/habit-data";
import { calculateCurrentStreak } from "@/components/habit-tracker/habit-data";
import { Flame, Trash2, MoreVertical } from "lucide-react";

interface HabitCardModernProps {
  habit: HabitItem;
  index: number;
  onToggleDay: (habitId: string, dayIndex: number) => void;
  onRemove: (habitId: string) => void;
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  green: { bg: "bg-green-500", text: "text-green-600", border: "border-green-200" },
  blue: { bg: "bg-blue-500", text: "text-blue-600", border: "border-blue-200" },
  purple: { bg: "bg-purple-500", text: "text-purple-600", border: "border-purple-200" },
  orange: { bg: "bg-orange-500", text: "text-orange-600", border: "border-orange-200" },
  pink: { bg: "bg-pink-500", text: "text-pink-600", border: "border-pink-200" },
  red: { bg: "bg-red-500", text: "text-red-600", border: "border-red-200" },
  cyan: { bg: "bg-cyan-500", text: "text-cyan-600", border: "border-cyan-200" },
};

export default function HabitCardModern({
  habit,
  index,
  onToggleDay,
  onRemove,
}: HabitCardModernProps) {
  const streak = calculateCurrentStreak([habit]);
  const completed = habit.completions.filter(Boolean).length;
  const completionRate = Math.round((completed / habit.completions.length) * 100);
  const color = colorMap[habit.category] || colorMap.green;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.05,
      },
    },
    hover: {
      y: -4,
      transition: { duration: 0.2 },
    },
  };

  const dayVariants = {
    unchecked: {
      scale: 1,
      opacity: 0.6,
    },
    checked: {
      scale: 1.1,
      opacity: 1,
      transition: {
        stiffness: 200,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="rounded-[24px] border border-slate-200/50 dark:border-border bg-gradient-to-br from-slate-50/80 to-slate-100/40 dark:from-card/80 dark:to-card/40 backdrop-blur-md p-5 shadow-soft-lg hover:shadow-floating transition-all duration-300"
    >
      {/* Header with Name, Streak, and Menu */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className={`${color.bg} h-2 w-2 rounded-full`} />
            <h3 className="font-semibold text-foreground text-lg">{habit.name}</h3>
          </div>
          <p className="text-xs text-muted-foreground">{habit.category}</p>
        </div>

        {/* Streak Badge */}
        {streak > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30"
          >
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
              {streak}
            </span>
          </motion.div>
        )}

        {/* Menu Button */}
        <button className="p-1 rounded-lg hover:bg-muted transition-colors">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-muted-foreground">
            Progress
          </span>
          <span className="text-xs font-semibold text-foreground">
            {completed}/{habit.completions.length}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <motion.div
            className={`h-full ${color.bg} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      {/* Day Toggles (Last 14 days) */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Last 14 days</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {habit.completions.slice(-14).map((completed, i) => {
            const dayIndex = habit.completions.length - 14 + i;
            const daysAgo = habit.completions.length - 1 - dayIndex;
            const isToday = daysAgo === 0;

            return (
              <motion.button
                key={dayIndex}
                variants={dayVariants}
                animate={completed ? "checked" : "unchecked"}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onToggleDay(habit.id, dayIndex)}
                className={`h-10 w-10 rounded-lg font-semibold text-xs transition-all flex items-center justify-center flex-shrink-0 ${
                  completed
                    ? `${color.bg} text-white shadow-soft-lg`
                    : "bg-gray-100 dark:bg-gray-800 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
                } ${isToday ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900" : ""}`}
                title={`${daysAgo} days ago`}
              >
                {!isToday ? (
                  <span className="text-xs">{i + 1}</span>
                ) : (
                  <span>Today</span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Stats Row */}
      <div className="mt-4 flex items-center justify-between pt-4 border-t border-border/30">
        <div>
          <p className="text-xs text-muted-foreground">Success Rate</p>
          <p className="text-lg font-bold text-primary">{completionRate}%</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(habit.id)}
          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </motion.button>
      </div>
    </motion.div>
  );
}
