import { CheckCircle2, Flame, LineChart, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/use-animations";
import {
  getCompletionRate,
  getBestStreakValue,
  getCurrentStreakFromDay,
  getTodayCompleted,
  getAllDaysChartData,
  type HabitItem,
} from "./habit-data";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProgressOverviewProps {
  habits: HabitItem[];
}

const statBaseClass =
  "rounded-[24px] border border-border/60 bg-card/90 p-4 shadow-sm";

export default function ProgressOverview({ habits }: ProgressOverviewProps) {
  const { t } = useLanguage();
  const completionRate = getCompletionRate(habits);
  const allDaysData = getAllDaysChartData(habits);
  const todayCompleted = getTodayCompleted(habits);
  const currentStreak = getCurrentStreakFromDay(habits);
  const bestStreak = getBestStreakValue(habits);

  // Count up animations for stats
  const animatedCompletionRate = useCountUp(completionRate, 800, habits.length > 0);
  const animatedTodayCompleted = useCountUp(todayCompleted, 600, habits.length > 0);
  const animatedCurrentStreak = useCountUp(currentStreak, 600, habits.length > 0);
  const animatedBestStreak = useCountUp(bestStreak, 700, habits.length > 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const statCardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="space-y-4"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div className="grid gap-4 sm:grid-cols-3" variants={containerVariants}>
        <motion.div
          className={`${statBaseClass} bg-[linear-gradient(135deg,rgba(109,94,252,0.14),rgba(255,255,255,0.9))] dark:bg-[linear-gradient(135deg,rgba(109,94,252,0.25),rgba(60,50,100,0.6))]`}
          variants={statCardVariants}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{t.progress.completionRate}</p>
            <motion.div
              initial={{ rotate: -30, scale: 0.5 }}
              whileInView={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              viewport={{ once: true }}
            >
              <LineChart className="h-5 w-5 text-primary" />
            </motion.div>
          </div>
          <motion.p
            className="mt-4 text-3xl font-semibold text-foreground"
            key={completionRate}
          >
            {animatedCompletionRate}%
          </motion.p>
          <p className="mt-2 text-sm text-muted-foreground">{t.progress.completionDesc}</p>
        </motion.div>

        <motion.div
          className={statBaseClass}
          variants={statCardVariants}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{t.progress.doneToday}</p>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              viewport={{ once: true }}
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </motion.div>
          </div>
          <motion.p
            className="mt-4 text-3xl font-semibold text-foreground"
            key={todayCompleted}
          >
            {animatedTodayCompleted}
            <span className="ml-1 text-base font-medium text-muted-foreground">/ {habits.length || 0}</span>
          </motion.p>
          <p className="mt-2 text-sm text-muted-foreground">{t.progress.doneTodayDesc}</p>
        </motion.div>

        <motion.div
          className={statBaseClass}
          variants={statCardVariants}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{t.progress.currentStreak}</p>
            <motion.div
              initial={{ rotate: 0 }}
              whileInView={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Flame className="h-5 w-5 text-orange-500" />
            </motion.div>
          </div>
          <motion.p
            className="mt-4 text-3xl font-semibold text-foreground"
            key={currentStreak}
          >
            🔥 {animatedCurrentStreak} {" "}
            <span className="text-base font-medium text-muted-foreground">| 🏆 {animatedBestStreak}</span>
          </motion.p>
          <p className="mt-2 text-sm text-muted-foreground">Current • Best streak</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="rounded-[30px] border border-border/70 bg-card/88 p-5 shadow-sm sm:p-6"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <motion.div
              className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
            >
              <Sparkles className="h-4 w-4" />
              {t.progress.progressChart}
            </motion.div>
            <motion.h2
              className="text-xl font-semibold text-foreground"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
            >
              Progress over 30 days
            </motion.h2>
            <motion.p
              className="mt-2 text-sm leading-6 text-muted-foreground"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.35 }}
            >
              Real-time completion percentage for all days
            </motion.p>
          </div>
          <motion.div
            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            viewport={{ once: true }}
          >
            {habits.length} {t.progress.habitsActive}
          </motion.div>
        </div>

        <div className="mt-8">
          {habits.length > 0 && allDaysData.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={allDaysData}>
                  <defs>
                    <linearGradient id="colorPercentage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="day"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: "12px" }}
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: "12px" }}
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    domain={[0, 100]}
                    label={{ value: "%", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value: number) => `${value}%`}
                    labelFormatter={(label) => `Day ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="percentage"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={true}
                    animationDuration={800}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </motion.div>
          ) : (
            <motion.div
              className="flex h-[300px] items-center justify-center rounded-[20px] bg-secondary/30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <p className="text-sm text-muted-foreground">
                {t.common.addHabitsToSeeChart}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
}
