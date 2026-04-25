import { motion } from "framer-motion";
import { TrendingUp, Flame, Target, Award, Calendar } from "lucide-react";
import type { HabitItem } from "./habit-data";
import {
  calculateCurrentStreak,
  calculateBestStreak,
  calculateCompletionRate,
} from "./habit-data";
import { useMemo } from "react";

interface StatsPanelProps {
  habits: HabitItem[];
  createdAt?: string;
}

interface Stat {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  bgColor: string;
  trend?: string;
}

export default function StatsPanel({ habits, createdAt }: StatsPanelProps) {
  const stats = useMemo<Stat[]>(() => {
    if (!habits || habits.length === 0) {
      return [
        {
          icon: <Target className="w-5 h-5" />,
          label: "Habits Started",
          value: 0,
          color: "text-blue-600",
          bgColor: "bg-blue-100",
        },
        {
          icon: <TrendingUp className="w-5 h-5" />,
          label: "Completion Rate",
          value: "0%",
          color: "text-emerald-600",
          bgColor: "bg-emerald-100",
        },
        {
          icon: <Flame className="w-5 h-5" />,
          label: "Current Streak",
          value: 0,
          color: "text-orange-600",
          bgColor: "bg-orange-100",
        },
        {
          icon: <Award className="w-5 h-5" />,
          label: "Best Streak",
          value: 0,
          color: "text-purple-600",
          bgColor: "bg-purple-100",
        },
      ];
    }

    const totalHabits = habits.length;
    const completionRate = calculateCompletionRate(habits);
    const currentStreak = calculateCurrentStreak(habits);
    const bestStreak = calculateBestStreak(habits);
    const avgStreakPerHabit = totalHabits > 0 ? Math.round(bestStreak / totalHabits) : 0;

    return [
      {
        icon: <Target className="w-5 h-5" />,
        label: "Habits Started",
        value: totalHabits,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        trend: `Track ${totalHabits} habit${totalHabits !== 1 ? "s" : ""}`,
      },
      {
        icon: <TrendingUp className="w-5 h-5" />,
        label: "Completion Rate",
        value: `${completionRate}%`,
        color: "text-emerald-600",
        bgColor: "bg-emerald-100",
      },
      {
        icon: <Flame className="w-5 h-5" />,
        label: "Current Streak",
        value: currentStreak,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        trend: "Keep the fire burning!",
      },
      {
        icon: <Award className="w-5 h-5" />,
        label: "Best Streak",
        value: bestStreak,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
        trend: avgStreakPerHabit > 0 ? `Avg ${avgStreakPerHabit} days per habit` : "Start tracking to build streaks",
      },
    ];
  }, [habits]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const counterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={`${stat.label}-${index}`}
          variants={itemVariants}
          className="group rounded-xl p-4 transition-all hover:shadow-md hover:-translate-y-1 backdrop-blur-sm border bg-slate-100/60 border-slate-200/50"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className={`${stat.bgColor} p-2.5 rounded-lg ${stat.color} flex-shrink-0`}>
              {stat.icon}
            </div>
            <p className="text-xs font-medium text-muted-foreground whitespace-nowrap">
              {stat.label}
            </p>
          </div>

          <motion.div
            variants={counterVariants}
            className={`${stat.color} text-3xl sm:text-4xl font-bold mb-1`}
          >
            {stat.value}
          </motion.div>

          {stat.trend && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {stat.trend}
            </p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
