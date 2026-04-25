import { motion } from "framer-motion";
import { TrendingUp, Flame, Calendar, Target, CheckCircle2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import type { HabitItem } from "./habit-data";
import { getTodayIndex, getCurrentStreakFromDay, getBestStreakValue } from "./habit-data";
import { useLanguage } from "@/lib/language-context";

interface ProgressPanelProps {
  habits: HabitItem[];
}

export default function ProgressPanel({ habits }: ProgressPanelProps) {
  const { language } = useLanguage();

  // Calculate statistics
  const calculateStats = () => {
    if (habits.length === 0) return null;

    const totalDays = habits[0]?.completions.length || 30;
    const totalPossibleCompletions = habits.length * totalDays;
    const totalCompleted = habits.reduce(
      (sum, habit) => sum + habit.completions.filter(Boolean).length,
      0
    );
    const completionRate = Math.round((totalCompleted / totalPossibleCompletions) * 100);

    // Calculate current streak using fixed function (at least 1 habit per day)
    const currentStreak = getCurrentStreakFromDay(habits);

    // Calculate best streak using fixed function
    const bestStreak = getBestStreakValue(habits);

    return {
      completionRate,
      currentStreak,
      bestStreak,
      totalCompleted,
      totalPossible: totalPossibleCompletions,
    };
  };

  // Generate chart data
  const generateChartData = () => {
    const days = habits[0]?.completions.length || 30;
    return Array.from({ length: days }).map((_, index) => {
      const dayNumber = index + 1;
      const completed = habits.filter((habit) =>
        habit.completions[index]
      ).length;
      return {
        day: `D${dayNumber}`,
        completed,
        total: habits.length,
        percentage: habits.length > 0 ? (completed / habits.length) * 100 : 0,
      };
    });
  };

  const stats = calculateStats();
  const chartData = generateChartData();

  if (!stats || habits.length === 0) {
    return null;
  }

  const statItems = [
    {
      icon: TrendingUp,
      label: "Completion Rate",
      value: `${stats.completionRate}%`,
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: Flame,
      label: "Current Streak",
      value: `${stats.currentStreak} days`,
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Calendar,
      label: "Best Streak",
      value: `${stats.bestStreak} days`,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: CheckCircle2,
      label: "Total Completed",
      value: `${stats.totalCompleted}/${stats.totalPossible}`,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Statistics Grid */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Your Progress
        </h3>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative overflow-hidden p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all hover:shadow-lg"
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${item.color}`}
                />

                {/* Icon background */}
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${item.color} mb-4`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  {item.label}
                </p>
                <motion.p
                  className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-cyan-300 dark:to-slate-300 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {item.value}
                </motion.p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">
          30-Day Trend
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              className="dark:stroke-slate-700"
            />
            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              className="dark:stroke-slate-600"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="#94a3b8"
              className="dark:stroke-slate-600"
              style={{ fontSize: "12px" }}
              domain={[0, "dataMax"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value) => [`${value} habits`, "Completed"]}
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#22c55e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCompleted)"
              isAnimationActive={true}
              animationDuration={1000}
              dot={{ fill: "#22c55e", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Milestones */}
      {stats && (
        <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border border-emerald-200 dark:border-emerald-800/50">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
            Milestones
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${stats.currentStreak >= 3 ? "bg-emerald-500" : "bg-slate-300"}`} />
              <span className={stats.currentStreak >= 3 ? "text-emerald-700 dark:text-emerald-300 font-medium" : "text-slate-600 dark:text-slate-400"}>
                3-day streak
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${stats.currentStreak >= 7 ? "bg-emerald-500" : "bg-slate-300"}`} />
              <span className={stats.currentStreak >= 7 ? "text-emerald-700 dark:text-emerald-300 font-medium" : "text-slate-600 dark:text-slate-400"}>
                7-day streak
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${stats.currentStreak >= 30 ? "bg-emerald-500" : "bg-slate-300"}`} />
              <span className={stats.currentStreak >= 30 ? "text-emerald-700 dark:text-emerald-300 font-medium" : "text-slate-600 dark:text-slate-400"}>
                30-day master
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
