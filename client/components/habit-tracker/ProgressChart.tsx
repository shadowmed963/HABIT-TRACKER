import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import type { HabitItem } from "./habit-data";
import {
  calculateBestStreak,
  calculateCurrentStreak,
  getBestDayInfo,
  getWeakHabit,
} from "./habit-data";
import { TrendingUp } from "lucide-react";

interface ProgressChartProps {
  habits: HabitItem[];
  range?: 7 | 14 | 30;
}

interface ChartDataPoint {
  day: string;
  dayNum: number;
  completionRate: number;
}

export default function ProgressChart({ habits, range = 30 }: ProgressChartProps) {
  const { t, language } = useLanguage();
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    if (habits.length === 0) {
      setChartData([]);
      return;
    }

    // Generate chart data for the specified range
    const data: ChartDataPoint[] = [];
    const habitCompletions = habits.map((h) => h.completions);

    for (let i = Math.max(0, 30 - range); i < 30; i++) {
      const completedCount = habitCompletions.filter(
        (completion) => completion[i]
      ).length;
      const completionRate = Math.round((completedCount / habits.length) * 100);

      const dayOffset = i - 29;
      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() + dayOffset);

      data.push({
        day: dateObj.toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", {
          month: "short",
          day: "numeric",
        }),
        dayNum: i + 1,
        completionRate,
      });
    }

    setChartData(data);
  }, [habits, range, language]);

  const chartOverview = useMemo(() => {
    if (!chartData.length || !habits.length) {
      return {
        current: 0,
        average: 0,
        trend: 0,
        bestDayLabel: "No best day yet.",
        progressMessage: "Add habits to begin tracking.",
        achievements: [],
      };
    }

    const currentRate = chartData[chartData.length - 1].completionRate;
    const averageRate = Math.round(
      chartData.reduce((sum, d) => sum + d.completionRate, 0) / chartData.length
    );
    const trend = currentRate - (chartData[Math.max(0, chartData.length - 7)].completionRate || 0);
    const bestDayInfo = getBestDayInfo(habits);
    const weakHabit = getWeakHabit(habits);
    const bestStreak = calculateBestStreak(habits);
    const currentStreak = calculateCurrentStreak(habits);
    const firstDayCompleted = habits.some((habit) => habit.completions.some(Boolean));

    const achievements = [
      {
        label: "First day completed",
        unlocked: firstDayCompleted,
      },
      {
        label: "3-day streak",
        unlocked: bestStreak >= 3,
      },
      {
        label: "7-day streak",
        unlocked: bestStreak >= 7,
      },
    ];

    const progressMessage = currentRate === 100
      ? "🎉 Perfect completion today! Keep your momentum going."
      : currentRate >= 75
        ? "✨ Excellent progress this week. Stay consistent."
        : currentRate >= 50
          ? "💪 Good effort. Focus on your weakest habit next."
          : currentRate > 0
            ? "🌱 You’re building momentum. One more habit makes a difference."
            : "🌅 No completion today yet. Start with one tiny habit. ";

    return {
      current: currentRate,
      average: averageRate,
      trend,
      bestDayLabel: bestDayInfo ? `${bestDayInfo.label}: ${bestDayInfo.percentage}%` : t.common.noBestDayYet,
      progressMessage,
      achievements,
      weakHabit,
      currentStreak,
      bestStreak,
    };
  }, [chartData, habits]);

  const renderCustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (cx === undefined || cy === undefined || !payload) return null;

    const isGood = payload.completionRate >= 75;

    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill={isGood ? "#22c55e" : "#f87171"}
        stroke="rgba(15, 23, 42, 0.85)"
        strokeWidth={2}
      />
    );
  };

  if (habits.length === 0) {
    return (
      <motion.div
        className="rounded-[24px] border border-border/70 bg-card/88 p-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-muted-foreground">
          {t.common.addHabitsToSeeChart || "Add habits to see your progress chart"}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="rounded-[24px] border border-border/70 bg-card/88 p-4 sm:p-6 shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <motion.div
              className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <TrendingUp className="h-4 w-4" />
              {t.progress.progressChart || "Progress"}
            </motion.div>
            <motion.h3
              className="text-lg font-semibold text-foreground"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {t.features.progressTitle || "30-Day Completion Rate"}
            </motion.h3>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {[
            {
              label: "Today",
              value: `${chartOverview.current}%`,
              color: "text-green-600 dark:text-green-400 bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-400/30",
            },
            {
              label: "Average",
              value: `${chartOverview.average}%`,
              color: "text-blue-600 dark:text-blue-400 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-400/30",
            },
            {
              label: "Trend",
              value: `${chartOverview.trend > 0 ? "+" : ""}${chartOverview.trend}%`,
              color: chartOverview.trend >= 0
                ? "text-green-600 dark:text-green-400 bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-400/30"
                : "text-red-600 dark:text-red-400 bg-gradient-to-br from-red-500/20 to-red-600/10 border-red-400/30",
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className={`rounded-[16px] ${stat.color} border p-3 text-center transition-all hover:shadow-lg hover:shadow-${stat.color.split('-')[1]}-500/20`}
              whileHover={{ y: -3, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + idx * 0.08 }}
            >
              <p className="text-xs font-medium opacity-70">{stat.label}</p>
              <motion.p
                className="mt-1 text-2xl font-bold"
                key={`stat-${idx}-${stat.value}`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {stat.value}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart */}
        <motion.div
          className="h-64 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 0, left: -30, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value: number) => `${value}%`}
              />
              <Area
                type="monotone"
                dataKey="completionRate"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRate)"
                dot={renderCustomDot}
                activeDot={{ r: 8, fill: "#22c55e" }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Footer insight */}
        <motion.div
          className="rounded-[16px] border border-primary/30 bg-gradient-to-r from-primary/8 via-primary/5 to-transparent p-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <motion.p
            className="text-sm text-foreground font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            {chartOverview.progressMessage}
          </motion.p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {chartOverview.achievements.map((achievement, idx) => (
              <motion.div
                key={achievement.label}
                className={`rounded-[14px] border px-3 py-2 text-xs font-semibold transition-all ${
                  achievement.unlocked
                    ? "border-emerald-400/50 bg-gradient-to-r from-emerald-500/15 to-emerald-600/5 text-emerald-100"
                    : "border-slate-700/50 bg-gradient-to-r from-slate-800/30 to-slate-900/20 text-slate-400"
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65 + idx * 0.1, duration: 0.3 }}
                whileHover={achievement.unlocked ? { scale: 1.05, y: -2 } : {}}
              >
                <motion.span
                  initial={{ rotate: 0 }}
                  whileHover={achievement.unlocked ? { rotate: 10 } : {}}
                  transition={{ duration: 0.2 }}
                >
                  {achievement.unlocked ? "✓" : "•"}
                </motion.span>{" "}
                {achievement.label}
              </motion.div>
            ))}
          </div>
          <motion.p
            className="mt-3 text-xs text-foreground/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.3 }}
          >
            {chartOverview.bestDayLabel}
          </motion.p>
          {chartOverview.weakHabit ? (
            <motion.p
              className="mt-2 text-xs text-foreground/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
            >
              Weakest habit:{" "}
              <motion.span
                className="font-semibold text-foreground"
                whileHover={{ textDecoration: "underline" }}
              >
                {chartOverview.weakHabit.habit.name}
              </motion.span>{" "}
              — {chartOverview.weakHabit.percentage}% complete.
            </motion.p>
          ) : null}
        </motion.div>
      </div>
    </motion.div>
  );
}
