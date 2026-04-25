import { motion } from "framer-motion";
import { Sparkles, AlertCircle, CheckCircle2, Flame, TrendingUp, Zap, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { HabitItem } from "./habit-data";
import { useMemo } from "react";

interface DailyAIMessageProps {
  habits: HabitItem[];
  userName?: string;
}

const messageTemplates = {
  perfect_day: {
    messages: [
      "Perfect day! You've completed all habits. Your consistency is inspiring! 🌟",
      "All-star performance! You crushed every single habit today! 🎯",
      "100% completion! You're a habit master! Keep this energy going! ✨",
    ],
    icon: CheckCircle2,
    color: "emerald",
  },
  almost_there: {
    messages: [
      "Almost there! Just {{remaining}} more to complete today. You can do this! 💪",
      "{{completed}}/{{total}} done. Finish strong! 🔥",
      "So close! Complete {{remaining}} more habit{{plural}} to finish strong! 💫",
    ],
    icon: Zap,
    color: "amber",
  },
  halfway: {
    messages: [
      "Great start! You're halfway there. Keep the momentum! 🚀",
      "Half way through! Continue this energy and finish strong! ⚡",
      "Good progress! {{completed}} done, {{remaining}} to go! 💪",
    ],
    icon: TrendingUp,
    color: "blue",
  },
  just_started: {
    messages: [
      "You're off to a great start! {{completed}} habit{{plural}} done. Let's keep going! 🌱",
      "Just getting started! {{completed}} habit{{plural}} locked in. More to come! 🎯",
      "Beginning strong! {{completed}}/{{total}} habits. You've got this! 💫",
    ],
    icon: Sparkles,
    color: "purple",
  },
  nothing_yet: {
    messages: [
      "Ready to start today? Your first habit is just a click away! 🌅",
      "Let's build today's streak! Start with just one habit. 💪",
      "A new day, a new opportunity! Begin your habits now! 🚀",
    ],
    icon: Sparkles,
    color: "slate",
  },
  building_streak: {
    messages: [
      "You're on a {{streak}}-day streak! Don't break it now! 🔥",
      "{{streak}} days of consistency! You're unstoppable! ⚡",
      "{{streak}} days strong! Keep the fire burning! 🔥",
    ],
    icon: Flame,
    color: "orange",
  },
  consistency_milestone: {
    messages: [
      "You've been consistent for {{dayNumber}} days! That's incredible! 🎉",
      "{{dayNumber}} days in and you're still going strong! Amazing! 💯",
      "A full {{dayNumber}} days of building habits! You're a legend! 👑",
    ],
    icon: BookOpen,
    color: "indigo",
  },
};

export default function DailyAIMessage({ habits, userName }: DailyAIMessageProps) {
  const { t, language } = useLanguage();

  const messageData = useMemo(() => {
    if (habits.length === 0) return null;

    const today = 29; // Day 30 (0-indexed)
    const completedToday = habits.filter((h) => h.completions[today]).length;
    const totalHabits = habits.length;
    const remainingHabits = totalHabits - completedToday;
    const completionRate = Math.round((completedToday / totalHabits) * 100);

    // Calculate current streak
    let currentStreak = 0;
    for (let i = today; i >= 0; i--) {
      if (habits.every((h) => h.completions[i])) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Determine message type based on progress
    let messageType: keyof typeof messageTemplates;
    if (completedToday === 0) {
      messageType = "nothing_yet";
    } else if (completionRate === 100) {
      messageType = "perfect_day";
    } else if (completionRate >= 75) {
      messageType = "almost_there";
    } else if (completionRate >= 50) {
      messageType = "halfway";
    } else if (currentStreak > 1) {
      messageType = "building_streak";
    } else if (today >= 6) {
      messageType = "consistency_milestone";
    } else {
      messageType = "just_started";
    }

    const template = messageTemplates[messageType];
    let message = template.messages[Math.floor(Math.random() * template.messages.length)];

    // Replace variables
    message = message
      .replace("{{remaining}}", remainingHabits.toString())
      .replace("{{completed}}", completedToday.toString())
      .replace("{{total}}", totalHabits.toString())
      .replace("{{streak}}", currentStreak.toString())
      .replace("{{dayNumber}}", (today + 1).toString())
      .replace("{{plural}}", remainingHabits !== 1 ? "s" : "");

    return {
      message,
      type: messageType,
      icon: template.icon,
      color: template.color,
      completedToday,
      totalHabits,
      currentStreak,
    };
  }, [habits]);

  if (!messageData) return null;

  const colorClasses = {
    emerald:
      "from-emerald-50/80 to-green-50/80 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-800/40",
    amber:
      "from-amber-50/80 to-yellow-50/80 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800/40",
    blue:
      "from-blue-50/80 to-cyan-50/80 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800/40",
    purple:
      "from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800/40",
    slate:
      "from-slate-50/80 to-slate-100/80 dark:from-slate-800/30 dark:to-slate-900/30 border-slate-200 dark:border-slate-700/40",
    orange:
      "from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800/40",
    indigo:
      "from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800/40",
  };

  const textColors = {
    emerald: "text-emerald-900 dark:text-emerald-300",
    amber: "text-amber-900 dark:text-amber-300",
    blue: "text-blue-900 dark:text-blue-300",
    purple: "text-purple-900 dark:text-purple-300",
    slate: "text-slate-900 dark:text-slate-300",
    orange: "text-orange-900 dark:text-orange-300",
    indigo: "text-indigo-900 dark:text-indigo-300",
  };

  const iconBgColors = {
    emerald: "bg-emerald-100 dark:bg-emerald-900/40",
    amber: "bg-amber-100 dark:bg-amber-900/40",
    blue: "bg-blue-100 dark:bg-blue-900/40",
    purple: "bg-purple-100 dark:bg-purple-900/40",
    slate: "bg-slate-200 dark:bg-slate-800/40",
    orange: "bg-orange-100 dark:bg-orange-900/40",
    indigo: "bg-indigo-100 dark:bg-indigo-900/40",
  };

  const IconComponent = messageData.icon;
  const color = messageData.color as keyof typeof colorClasses;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`bg-gradient-to-r ${colorClasses[color]} border backdrop-blur-sm rounded-[24px] p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex gap-3 sm:gap-4 items-start">
        <motion.div
          className={`${iconBgColors[color]} p-3 rounded-[16px] flex-shrink-0 flex items-center justify-center`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${textColors[color]}`} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.p
            className={`text-xs sm:text-sm font-semibold ${textColors[color]}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t.common.aiDailyInsight}
          </motion.p>
          <motion.p
            className={`text-sm sm:text-base mt-1 ${textColors[color]} leading-relaxed`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {messageData.message}
          </motion.p>
          {messageData.currentStreak > 0 && (
            <motion.div
              className={`mt-3 flex items-center gap-2 text-xs sm:text-sm ${textColors[color]} opacity-75`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-current" />
              <span>
                {messageData.currentStreak} {t.common.dayStreak} • {messageData.completedToday}/{messageData.totalHabits} {t.common.today}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
