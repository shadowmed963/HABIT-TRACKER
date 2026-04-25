import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { LogOut, Zap, Plus } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import AddHabitModal from "@/components/premium/AddHabitModal";
import ConfettiEffect from "@/components/premium/ConfettiEffect";
import ToastContainer, { showToast } from "@/components/premium/ToastNotification";
import AuthPanel, { type AuthMode } from "@/components/habit-tracker/AuthPanel";
import AIHabitQuiz from "@/components/habit-tracker/AIHabitQuiz";
import HabitGrid from "@/components/habit-tracker/HabitGrid";
import ProgressChart from "@/components/habit-tracker/ProgressChart";
import Landing from "./Landing";
import {
  createHabitItem,
  type HabitItem,
  type HabitSuggestion,
  calculateCurrentStreak,
  calculateBestStreak,
  getWeeklyAverageCompletion,
  getBestDayInfo,
  getDaysSinceLastCompleted,
  getWeakHabit,
  calculateDailyPoints,
  getActionableWeakHabitAdvice,
  isStreakAtRisk,
} from "@/components/habit-tracker/habit-data";
import {
  authenticateUser,
  clearActiveUser,
  createUserAccount,
  createUserAccountWithSupabase,
  getActiveUser,
  getStoredUsers,
  updateUserAccount,
  loadUserFromSupabase,
  completeUserOnboarding,
} from "@/components/habit-tracker/user-storage";
import {
  isSupabaseConfigured,
  signInWithPassword,
  signUpWithPassword,
} from "@/lib/supabaseClient";
import supabase from "@/lib/supabaseClient";
import AppShell from "@/components/layout/AppShell";

interface ActiveUserState {
  id: string;
  email: string;
  name: string;
  created_at: string;
  onboardingComplete: boolean;
}

function ProgressHero({
  percentage,
  completed,
  total,
  currentStreak,
  bestStreak,
  weeklyAverage,
  inactiveDays,
  weakHabitSuggestion,
  reminderMessage,
  dailyPoints,
}: {
  percentage: number;
  completed: number;
  total: number;
  currentStreak: number;
  bestStreak: number;
  weeklyAverage: number;
  inactiveDays: number;
  weakHabitSuggestion: string;
  reminderMessage: string;
  dailyPoints: number;
}) {
  const { t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[28px] border border-slate-200/50 bg-gradient-to-br from-slate-50/80 to-slate-100/60 p-6 shadow-[0_8px_16px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/40 dark:shadow-[0_20px_40px_rgba(15,23,42,0.14)]"
    >
      <div className="absolute -right-6 top-8 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/15" />
      <div className="absolute -left-8 bottom-8 h-24 w-24 rounded-full bg-emerald-500/8 blur-3xl dark:bg-emerald-500/12" />
      <div className="relative grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-cyan-200/80">{t.common.dailyProgress}</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{t.common.habitMomentum}</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">{t.common.habitMomentumDesc}</p>
        </div>
        <motion.div
          className="relative flex h-36 w-36 items-center justify-center rounded-[28px] bg-gradient-to-br from-slate-200/90 to-slate-300/80 shadow-[0_8px_20px_rgba(15,23,42,0.1)] dark:bg-gradient-to-br dark:from-slate-900/90 dark:to-slate-950/80 dark:shadow-[0_18px_42px_rgba(15,23,42,0.3)]"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute inset-0 rounded-[28px] border border-slate-300/30 dark:border-slate-700/20" />
          <motion.svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 120 120"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="rgba(148,163,184,0.1)"
              strokeWidth="2.5"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="url(#progressGrad)"
              strokeWidth="2.5"
              strokeDasharray={`${2 * Math.PI * 52}`}
              strokeDashoffset={`${2 * Math.PI * 52 * (1 - percentage / 100)}`}
              strokeLinecap="round"
              initial={{ strokeDashoffset: `${2 * Math.PI * 52}` }}
              animate={{ strokeDashoffset: `${2 * Math.PI * 52 * (1 - percentage / 100)}` }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </motion.svg>
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 text-center shadow-inner">
            <motion.span
              className="text-4xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-cyan-300 dark:to-emerald-300 bg-clip-text text-transparent"
              key={`perc-${Math.round(percentage)}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {Math.round(percentage)}%
            </motion.span>
          </div>
        </motion.div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <motion.div
          className="rounded-3xl bg-gradient-to-br from-emerald-50/60 to-emerald-100/40 border border-emerald-200/50 p-4 text-sm text-slate-700 hover:border-emerald-300/50 transition-colors dark:bg-gradient-to-br dark:from-emerald-500/20 dark:to-emerald-600/10 dark:border-emerald-400/30 dark:text-slate-300 dark:hover:border-emerald-400/50"
          whileHover={{ y: -2, boxShadow: "0 12px 24px rgba(16, 185, 129, 0.15)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-700/70 dark:text-emerald-300/70">{t.common.completedHabits}</p>
          <motion.p
            className="mt-2 text-lg font-semibold text-emerald-900 dark:text-emerald-100"
            key={`comp-${completed}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {completed} {t.common.habit}
          </motion.p>
        </motion.div>
        <motion.div
          className="rounded-3xl bg-gradient-to-br from-blue-50/60 to-blue-100/40 border border-blue-200/50 p-4 text-sm text-slate-700 hover:border-blue-300/50 transition-colors dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-blue-600/10 dark:border-blue-400/30 dark:text-slate-300 dark:hover:border-blue-400/50"
          whileHover={{ y: -2, boxShadow: "0 12px 24px rgba(59, 130, 246, 0.15)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-blue-700/70 dark:text-blue-300/70">{t.common.totalHabits}</p>
          <motion.p
            className="mt-2 text-lg font-semibold text-blue-900 dark:text-blue-100"
            key={`total-${total}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {total} {t.common.habit}
          </motion.p>
        </motion.div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <motion.div
          className="rounded-3xl bg-gradient-to-br from-orange-50/60 to-orange-100/40 border border-orange-200/50 p-4 text-sm text-slate-700 hover:border-orange-300/50 transition-colors dark:bg-gradient-to-br dark:from-orange-500/20 dark:to-orange-600/10 dark:border-orange-400/30 dark:text-slate-300 dark:hover:border-orange-400/50"
          whileHover={{ y: -2, boxShadow: "0 12px 24px rgba(249, 115, 22, 0.15)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-orange-700/70 dark:text-orange-300/70">{t.common.currentStreakLabel}</p>
          <motion.p
            className="mt-2 text-lg font-semibold text-orange-900 dark:text-orange-100"
            key={`streak-${currentStreak}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {currentStreak} {t.common.days}
          </motion.p>
        </motion.div>
        <motion.div
          className="rounded-3xl bg-gradient-to-br from-purple-50/60 to-purple-100/40 border border-purple-200/50 p-4 text-sm text-slate-700 hover:border-purple-300/50 transition-colors dark:bg-gradient-to-br dark:from-purple-500/20 dark:to-purple-600/10 dark:border-purple-400/30 dark:text-slate-300 dark:hover:border-purple-400/50"
          whileHover={{ y: -2, boxShadow: "0 12px 24px rgba(168, 85, 247, 0.15)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-purple-700/70 dark:text-purple-300/70">{t.common.bestStreakLabel}</p>
          <motion.p
            className="mt-2 text-lg font-semibold text-purple-900 dark:text-purple-100"
            key={`best-${bestStreak}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {bestStreak} {t.common.days}
          </motion.p>
        </motion.div>
        <motion.div
          className="rounded-3xl bg-gradient-to-br from-cyan-50/60 to-cyan-100/40 border border-cyan-200/50 p-4 text-sm text-slate-700 hover:border-cyan-300/50 transition-colors dark:bg-gradient-to-br dark:from-cyan-500/20 dark:to-cyan-600/10 dark:border-cyan-400/30 dark:text-slate-300 dark:hover:border-cyan-400/50"
          whileHover={{ y: -2, boxShadow: "0 12px 24px rgba(34, 211, 238, 0.15)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-700/70 dark:text-cyan-300/70">{t.common.weeklyAverageLabel}</p>
          <motion.p
            className="mt-2 text-lg font-semibold text-cyan-900 dark:text-cyan-100"
            key={`weekly-${weeklyAverage}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {weeklyAverage}%
          </motion.p>
        </motion.div>
      </div>
      <motion.div
        className="mt-4 rounded-3xl bg-gradient-to-r from-amber-50/60 to-amber-100/40 border border-amber-200/50 p-4 text-sm text-amber-900 hover:border-amber-300/50 transition-colors dark:bg-gradient-to-r dark:from-amber-500/20 dark:to-amber-600/10 dark:border-amber-400/40 dark:text-amber-100 dark:hover:border-amber-400/60"
        whileHover={{ y: -2, boxShadow: "0 12px 28px rgba(251, 191, 36, 0.2)" }}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.25, type: "spring" }}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-amber-700/80 font-semibold dark:text-amber-300/80">{t.common.todayPoints}</p>
        <motion.div
          className="mt-3 flex items-baseline gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <motion.span
            className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-300 dark:to-amber-200 bg-clip-text text-transparent"
            key={`points-${dailyPoints}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            +{dailyPoints}
          </motion.span>
          <span className="text-sm text-amber-700/70 dark:text-amber-200/70">{t.common.pointsEarned}</span>
        </motion.div>
      </motion.div>
      <motion.div
        className="mt-4 rounded-3xl border border-slate-300/50 bg-gradient-to-r from-slate-100/80 via-slate-200/60 to-slate-100/80 p-4 text-sm text-slate-700 hover:border-slate-400/50 dark:border-slate-700/50 dark:bg-gradient-to-r dark:from-slate-900/80 dark:via-slate-950/60 dark:to-slate-900/80 dark:text-slate-200 dark:hover:border-slate-600/50 transition-colors"
        whileHover={{ boxShadow: "0 8px 20px rgba(15, 23, 42, 0.4)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <motion.p
          className="font-medium text-slate-900 dark:text-slate-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          {weakHabitSuggestion}
        </motion.p>
        <motion.p
          className="mt-2 text-slate-600 dark:text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          {reminderMessage}
        </motion.p>
      </motion.div>
    </motion.section>
  );
}

function AnalyticsChart({ data }: { data: Array<{ day: string; value: number }> }) {
  const { t } = useLanguage();

  const tooltipStyle = {
    background: "rgba(248,250,252,0.95)",
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: 18,
    color: "#1e293b",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.1 }}
      className="rounded-[28px] border border-slate-200/30 bg-gradient-to-br from-slate-50/80 to-slate-100/60 p-4 shadow-[0_8px_16px_rgba(15,23,42,0.08)] backdrop-blur-sm"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-600">
            {t.common.weeklyTrend}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            {t.common.completionCadence}
          </h2>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.12)" />
            <XAxis dataKey="day" />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="value" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
function HabitTable({ habits }: { habits: HabitItem[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.15 }}
      className="rounded-[28px] border border-slate-200/30 bg-gradient-to-br from-slate-50/80 to-slate-100/60 p-4 shadow-[0_8px_16px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-slate-700/30 dark:bg-slate-800/40 dark:shadow-[0_16px_36px_rgba(15,23,42,0.12)]"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Progress table</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Habit analytics</h2>
        </div>
        <span className="rounded-full bg-slate-200/50 px-3 py-2 text-xs font-semibold text-slate-700 dark:bg-slate-900/70 dark:text-slate-300">Mobile friendly</span>
      </div>

      <div className="overflow-x-auto rounded-[24px] border border-slate-300/30 bg-slate-100/50 dark:border-slate-700/30 dark:bg-slate-950/80">
        <table className="min-w-[680px] w-full border-collapse text-left text-sm">
          <thead>
            <tr className="text-slate-700 dark:text-slate-400">
              <th className="px-4 py-3">Habit</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Streak</th>
              <th className="px-4 py-3">Completion</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, index) => {
              const streak = calculateCurrentStreak([habit]);
              const completed = habit.completions.filter(Boolean).length;
              const percentage = habit.completions.length ? Math.round((completed / habit.completions.length) * 100) : 0;
              const status = habit.completions[habit.completions.length - 1] ? "Done" : "Pending";
              return (
                <tr key={habit.id} className={index % 2 === 0 ? "bg-slate-200/40 dark:bg-slate-800/30" : "bg-transparent"}>
                  <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-900 dark:text-slate-100">{habit.name}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-slate-700 dark:text-slate-300">{habit.category}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-slate-700 dark:text-slate-300">{streak}d</td>
                  <td className="whitespace-nowrap px-4 py-4 text-slate-700 dark:text-slate-300">{percentage}%</td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status === "Done" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300" : "bg-slate-300/50 text-slate-700 dark:bg-slate-700/70 dark:text-slate-300"}`}>
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}

function HabitList({ habits, onToggleDay }: { habits: HabitItem[]; onToggleDay: (habitId: string, dayIndex: number) => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.2 }}
      className="rounded-[28px] border border-slate-200/30 bg-gradient-to-br from-slate-50/80 to-slate-100/60 p-4 shadow-[0_8px_16px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-slate-700/30 dark:bg-slate-950/75 dark:shadow-[0_16px_36px_rgba(15,23,42,0.12)]"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-600 dark:text-slate-500">Habit list</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Quick actions</h2>
        </div>
        <span className="rounded-full bg-slate-200/50 px-3 py-2 text-xs font-semibold text-slate-700 dark:bg-slate-900/70 dark:text-slate-300">Fast toggles</span>
      </div>
      <div className="space-y-3">
        {habits.map((habit) => {
          const completed = habit.completions.filter(Boolean).length;
          const percentage = habit.completions.length ? Math.round((completed / habit.completions.length) * 100) : 0;
          const todayIndex = habit.completions.length - 1;
          const completedToday = habit.completions[todayIndex];
          return (
            <div key={habit.id} className="flex flex-col gap-3 rounded-3xl bg-slate-200/40 dark:bg-slate-950/80 px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">{habit.name}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{habit.category} · {percentage}% complete</p>
                </div>
                <button
                  onClick={() => onToggleDay(habit.id, todayIndex)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${completedToday ? "bg-emerald-500 text-slate-950" : "bg-slate-300 text-slate-900 hover:bg-slate-400 dark:bg-slate-700/40 dark:text-slate-100 dark:hover:bg-slate-700/60"}`}
                >
                  {completedToday ? "Undo" : "Complete"}
                </button>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-300/40 dark:bg-slate-700/30">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: `${percentage}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

export default function Index() {
  const [habits, setHabits] = useState<HabitItem[]>([]);
  const [activeUser, setActiveUser] = useState<ActiveUserState | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasStoredUsers, setHasStoredUsers] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAddHabitModal, setShowAddHabitModal] = useState(false);
  const [showConfettiState, setShowConfetti] = useState(false);
  const [removingHabitId, setRemovingHabitId] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const loadUser = async () => {
      if (isSupabaseConfigured() && supabase) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const result = await loadUserFromSupabase(user.email!);
          if (result.ok && result.user) {
            applyActiveUser(result.user);
            setIsHydrated(true);
            setShowLanding(false);
            setShowOnboarding(!result.user.onboardingComplete);
            return;
          }
        }
      }

      const storedUsers = getStoredUsers();
      const storedActiveUser = await getActiveUser();
      setHasStoredUsers(storedUsers.length > 0);

      if (storedActiveUser) {
        applyActiveUser(storedActiveUser);
        setShowLanding(false);
        setShowOnboarding(!storedActiveUser.onboardingComplete);
      }

      setIsHydrated(true);
    };

    loadUser();
  }, []);

  const initialSaveRef = useRef(true);

  useEffect(() => {
    if (!isHydrated || !activeUser) return;
    if (initialSaveRef.current) {
      initialSaveRef.current = false;
      return;
    }

    const saveHabits = async () => {
      const result = await updateUserAccount(activeUser.email, {
        habits,
        onboardingComplete: activeUser.onboardingComplete,
      });

      if (!result.ok) {
        showToast("Failed to save, try again", "error");
      }
    };

    saveHabits();
  }, [activeUser, habits, isHydrated]);

  const normalizeHabitName = (value: string) => value.trim().toLowerCase();

  const habitExists = (name: string) => {
    const normalized = normalizeHabitName(name);
    return habits.some((habit) => normalizeHabitName(habit.name) === normalized);
  };

  const sanitizeHabits = (items: HabitSuggestion[]) => {
    const unique = new Map<string, HabitSuggestion>();

    items.forEach((item) => {
      const name = item.name?.trim();
      if (!name) return;
      const key = normalizeHabitName(name);
      if (!unique.has(key)) {
        unique.set(key, { ...item, name });
      }
    });

    return Array.from(unique.values());
  };

  const applyActiveUser = (user: {
    id: string;
    email: string;
    name: string;
    created_at: string;
    habits: HabitItem[];
    onboardingComplete: boolean;
  }) => {
    setActiveUser({
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
      onboardingComplete: user.onboardingComplete,
    });
    setHabits(user.habits);
  };

  const logout = () => {
    clearActiveUser();
    setActiveUser(null);
    setHabits([]);
    setShowLanding(true);
    showToast("Logged out successfully", "success");
  };

  const toggleDay = (habitId: string, dayIndex: number) => {
    setHabits((current) => {
      const nextHabits = current.map((habit) => {
        if (habit.id !== habitId) return habit;
        const nextCompletions = [...habit.completions];
        nextCompletions[dayIndex] = !nextCompletions[dayIndex];
        return { ...habit, completions: nextCompletions };
      });

      const todayIndex = nextHabits[0]?.completions.length - 1 || 0;
      const allComplete = nextHabits.length > 0 && nextHabits.every((h) => h.completions[todayIndex]);

      if (allComplete) {
        setShowConfetti(true);
        showToast("?? All habits completed today!", "success", 3000);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        showToast("Saved", "success", 1000);
      }

      return nextHabits;
    });
  };

  const removeHabit = (habitId: string) => {
    setRemovingHabitId(habitId);
    setTimeout(() => {
      setHabits((current) => current.filter((habit) => habit.id !== habitId));
      setRemovingHabitId(null);
      showToast("Habit removed", "info");
    }, 300); // Matches the fade-out animation duration
  };

  const addHabit = (name: string, category: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      showToast("Please enter a habit name.", "error");
      return;
    }

    if (habitExists(trimmedName)) {
      showToast("Habit already exists.", "info");
      return;
    }

    const newHabit = createHabitItem({
      name: trimmedName,
      category,
      cadence: "daily",
    } as HabitSuggestion);

    setHabits((current) => [...current, newHabit]);
    showToast(`Saved`, "success", 1000);
  };

  const handleApplyHabits = async (suggestions: HabitSuggestion[], completeOnboarding: boolean) => {
    const sanitizedSuggestions = sanitizeHabits(suggestions);
    if (sanitizedSuggestions.length === 0) {
      showToast("Please choose at least one habit.", "error");
      return;
    }

    const preparedHabits = sanitizedSuggestions.map((habit) => createHabitItem(habit));
    setHabits(preparedHabits);

    if (!activeUser) {
      showToast("Unable to save habits, please sign in.", "error");
      return;
    }

    if (completeOnboarding) {
      const result = await completeUserOnboarding(activeUser.email, preparedHabits);
      if (result.ok && result.user) {
        applyActiveUser(result.user);
        setHabits(result.user.habits);
        setShowOnboarding(false);
        showToast("?? 30-Day Challenge started!", "success");
        return;
      }

      showToast(result.error || "Unable to start challenge.", "error");
      return;
    }

    await updateUserAccount(activeUser.email, {
      habits: preparedHabits,
      onboardingComplete: false,
    });
    setShowOnboarding(true);
    showToast("Habits added. Start the challenge when you’re ready!", "success");
  };

  const stats = useMemo(() => {
    if (!habits.length) {
      return { completedToday: 0, completionPercentage: 0, totalHabits: 0 };
    }

    const todayIndex = habits[0].completions.length - 1;
    const completedToday = habits.filter((h) => h.completions[todayIndex]).length;

    return {
      completedToday,
      completionPercentage: Math.round((completedToday / habits.length) * 100),
      totalHabits: habits.length,
    };
  }, [habits]);

  const advancedStats = useMemo(() => {
    if (!habits.length) {
      return {
        currentStreak: 0,
        bestStreak: 0,
        weeklyAverage: 0,
        weakHabitSuggestion: t.common.addHabitsToSeeChart,
        reminderMessage: t.common.startFirstDayHint,
        inactiveDays: 30,
        firstDayCompleted: false,
        streak3: false,
        streak7: false,
        bestDayLabel: t.common.noProgressYet,
        dailyPoints: 0,
      };
    }

    const currentStreak = calculateCurrentStreak(habits);
    const bestStreak = calculateBestStreak(habits);
    const weeklyAverage = getWeeklyAverageCompletion(habits, 7);
    const bestDayInfo = getBestDayInfo(habits);
    const weakHabit = getWeakHabit(habits);
    const inactiveDays = getDaysSinceLastCompleted(habits);
    const dailyPoints = calculateDailyPoints(habits, currentStreak, stats.completedToday, stats.totalHabits);
    const firstDayCompleted = habits.some((habit) => habit.completions.some(Boolean));
    const streak3 = bestStreak >= 3;
    const streak7 = bestStreak >= 7;

    const weakHabitSuggestion = getActionableWeakHabitAdvice(weakHabit, inactiveDays, t.common);

    let reminderMessage = t.common.greatWorkToday;

    if (stats.completedToday === 0 && habits.length > 0) {
      reminderMessage = inactiveDays >= 3
        ? t.common.restartSmallWin
        : t.common.noHabitsCompletedToday;
    } else if (inactiveDays > 0 && stats.completedToday > 0) {
      reminderMessage = inactiveDays === 1
        ? t.common.welcomeBackSingular
        : t.common.welcomeBackPlural.replace("{days}", inactiveDays.toString());
    }

    const bestDayLabel = bestDayInfo
      ? `${bestDayInfo.label}: ${bestDayInfo.percentage}%` 
      : t.common.noBestDayYet;

    return {
      currentStreak,
      bestStreak,
      weeklyAverage,
      weakHabitSuggestion,
      reminderMessage,
      inactiveDays,
      firstDayCompleted,
      streak3,
      streak7,
      bestDayLabel,
      dailyPoints,
    };
  }, [habits, stats.completedToday, stats.totalHabits, t]);

  const handleAuthSubmit = async (
    mode: AuthMode,
    credentials: {
      email: string;
      name?: string;
      code?: string;
      password?: string;
    }
  ) => {
    const email = credentials.email.trim();
    const name = credentials.name?.trim() ?? "";

    if (isSupabaseConfigured()) {
      if (mode === "signup") {
        if (!credentials.password)
          return { ok: false, error: "Password required for signup." };
        const { data, error } = await signUpWithPassword(email, credentials.password, name || undefined);

        if (error)
          return { ok: false, error: (error as any).message ?? String(error) };

        const created = await createUserAccountWithSupabase(name || "", email);
        if (!created.ok || !created.user) {
          return { ok: false, error: created.error ?? "Failed to create user profile in database" };
        }

        applyActiveUser(created.user);
        setShowOnboarding(!created.user.onboardingComplete);
        setIsHydrated(true);
        setHasStoredUsers(true);
        showToast("Welcome! ??", "success");
        return { ok: true };
      }

      if (mode === "login") {
        if (!credentials.password)
          return { ok: false, error: "Password required for login." };
        const { data, error } = await signInWithPassword(email, credentials.password);

        if (error)
          return { ok: false, error: (error as any).message ?? String(error) };

        const supabaseResult = await loadUserFromSupabase(email);
        if (supabaseResult.ok && supabaseResult.user) {
          applyActiveUser(supabaseResult.user);
          setShowOnboarding(!supabaseResult.user.onboardingComplete);
          setIsHydrated(true);
          setHasStoredUsers(true);
          showToast(`Welcome back! ??`, "success");
          return { ok: true };
        }

        const stored = getStoredUsers();
        const existing = stored.find((u) => u.email === email.toLowerCase());
        if (existing) {
          applyActiveUser(existing);
          setShowOnboarding(!existing.onboardingComplete);
          setIsHydrated(true);
          setHasStoredUsers(stored.length > 0);
          return { ok: true };
        }

        const profileName = (data?.user?.user_metadata as any)?.full_name || name || "";
        const created = createUserAccount(profileName || "", email);
        if (!created)
          return { ok: false, error: "Failed to create local profile" };

        applyActiveUser(created);
        setShowOnboarding(!created.onboardingComplete);
        setIsHydrated(true);
        setHasStoredUsers(true);
        return { ok: true };
      }
    }

    const result = mode === "signup" ? createUserAccount(name || "", email) : authenticateUser(email);
    if (!result) {
      return { ok: false, error: "Something went wrong." };
    }

    applyActiveUser(result);
    setIsHydrated(true);
    setHasStoredUsers(true);
    return { ok: true };
  };

  if (showLanding && !activeUser) {
    return <Landing onStart={() => setShowLanding(false)} />;
  }

  return (
    <>
      <ToastContainer />
      {showConfettiState && <ConfettiEffect />}
      <AppShell>
        {!isHydrated ? (
          <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 text-center text-slate-900">
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
              <Zap className="mx-auto mb-4 h-12 w-12 text-cyan-400" />
              <p className="text-sm text-slate-600">Loading your analytics dashboard...</p>
            </motion.div>
          </div>
        ) : !activeUser ? (
          <AuthPanel hasExistingUsers={hasStoredUsers} onSubmit={handleAuthSubmit} />
        ) : showOnboarding ? (
          <div className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
            <div className="mx-auto max-w-4xl">
              <AIHabitQuiz onApplyHabits={handleApplyHabits} />
            </div>
          </div>
        ) : (
          <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 px-5 pb-28 pt-6 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-slate-100/50 via-slate-100/20 to-transparent dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.div
              className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-cyan-400/8 via-cyan-400/3 to-transparent dark:from-cyan-500/15 dark:via-cyan-500/5 dark:to-transparent blur-3xl"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-[-20%] top-24 h-80 w-80 rounded-full bg-emerald-400/5 dark:bg-emerald-500/10 blur-3xl"
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-[-20%] top-32 h-64 w-64 rounded-full bg-cyan-400/5 dark:bg-cyan-500/8 blur-3xl"
              animate={{ y: [0, 30, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative mx-auto max-w-xl space-y-6">
              <motion.div
                className="flex items-center justify-between gap-4 rounded-[28px] border border-slate-200/30 bg-gradient-to-r from-slate-100/80 to-slate-200/80 px-5 py-4 shadow-[0_8px_20px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-slate-700/20 dark:bg-gradient-to-r dark:from-slate-900/90 dark:to-slate-950/80 dark:shadow-[0_18px_40px_rgba(15,23,42,0.14)] hover:border-slate-300/40 dark:hover:border-slate-700/40 transition-colors"
                whileHover={{ boxShadow: "0 20px 50px rgba(15,23,42,0.15)" }}
              >
                <div className="min-w-0">
                  <motion.p
                    className="text-xs uppercase tracking-[0.35em] text-slate-600 dark:text-slate-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Hello, {activeUser.name.split(" ")[0] || activeUser.name}
                  </motion.p>
                  <motion.h1
                    className="mt-2 text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-cyan-300 dark:to-emerald-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Habit Analytics
                  </motion.h1>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 16px rgba(239, 68, 68, 0.2)",
                  }}
                  onClick={logout}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-300/40 bg-gradient-to-br from-slate-200/50 to-slate-300/80 text-slate-700 transition hover:border-red-300/60 hover:text-red-600 dark:border-slate-700/30 dark:bg-gradient-to-br dark:from-slate-800/50 dark:to-slate-950/90 dark:text-slate-100 dark:hover:border-red-600/50 dark:hover:text-red-300"
                >
                  <LogOut className="h-5 w-5" />
                </motion.button>
              </motion.div>

              {/* Daily Reminder Banner - Prominent */}
              {advancedStats.reminderMessage && (
                <motion.div
                  className={`relative overflow-hidden rounded-[24px] border-2 px-5 py-4 shadow-lg ${
                    stats.completedToday === 0 && advancedStats.inactiveDays > 0
                      ? "border-red-500/50 bg-gradient-to-r from-red-950/60 to-red-900/40 shadow-red-500/20"
                      : "border-emerald-500/50 bg-gradient-to-r from-emerald-950/60 to-emerald-900/40 shadow-emerald-500/20"
                  }`}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
                  whileHover={{ scale: 1.02, boxShadow: stats.completedToday === 0 && advancedStats.inactiveDays > 0 ? "0 12px 32px rgba(239, 68, 68, 0.3)" : "0 12px 32px rgba(16, 185, 129, 0.3)" }}
                >
                  <motion.div className="relative">
                    <motion.div
                      className={`text-sm font-semibold ${
                        stats.completedToday === 0 && advancedStats.inactiveDays > 0
                          ? "text-red-200"
                          : "text-emerald-200"
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      {stats.completedToday === 0 && advancedStats.inactiveDays > 0 ? "?? " : "? "}
                      {advancedStats.reminderMessage}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* Streak at Risk Warning - Critical */}
              {isStreakAtRisk(habits, advancedStats.currentStreak) && advancedStats.currentStreak > 0 && (
                <motion.div
                  className="relative overflow-hidden rounded-[24px] border-2 border-orange-300/60 bg-gradient-to-r from-orange-50/80 to-orange-100/60 dark:border-orange-500/60 dark:from-orange-950/70 dark:to-orange-900/50 px-5 py-3 shadow-lg shadow-orange-500/20 dark:shadow-orange-500/20"
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4, type: "spring" }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="flex items-center gap-2 text-xs font-bold text-orange-900 dark:text-orange-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <motion.span
                      animate={{ rotate: [0, -5, 5, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      ??
                    </motion.span>
                    <span>
                      Your {advancedStats.currentStreak}-day streak is on the line! Complete one habit now to save it.
                    </span>
                  </motion.div>
                </motion.div>
              )}

              <ProgressHero
                percentage={stats.completionPercentage}
                completed={stats.completedToday}
                total={stats.totalHabits}
                currentStreak={advancedStats.currentStreak}
                bestStreak={advancedStats.bestStreak}
                weeklyAverage={advancedStats.weeklyAverage}
                inactiveDays={advancedStats.inactiveDays}
                weakHabitSuggestion={advancedStats.weakHabitSuggestion}
                reminderMessage={advancedStats.reminderMessage}
                dailyPoints={advancedStats.dailyPoints}
              />

              <HabitGrid
                habits={habits}
                onToggleDay={toggleDay}
                onRemoveHabit={removeHabit}
                removingHabitId={removingHabitId}
              />

              <ProgressChart habits={habits} range={30} />
            </motion.div>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddHabitModal(true)}
              className="fixed left-1/2 bottom-6 z-40 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-8 py-4 text-sm font-semibold text-slate-950 shadow-[0_24px_60px_rgba(14,165,233,0.3)] flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Habit
            </motion.button>

            <AddHabitModal isOpen={showAddHabitModal} onClose={() => setShowAddHabitModal(false)} onAdd={addHabit} />
          </div>
        )}
      </AppShell>
    </>
  );
}



