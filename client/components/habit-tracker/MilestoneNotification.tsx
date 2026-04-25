import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Award, Trophy, Crown, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { calculateCurrentStreak, getMilestoneStorageKey } from "./habit-data";

interface MilestoneNotificationProps {
  habits: any[];
  onDismiss?: () => void;
}

interface Milestone {
  days: number;
  title: string;
  message: string;
  icon: React.ReactNode;
  color: string;
  celebration: boolean;
}

const milestones: Milestone[] = [
  {
    days: 1,
    title: "You Started! 🌱",
    message: "First day complete. Every journey begins with a single step!",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    celebration: false,
  },
  {
    days: 3,
    title: "Consistency Begins! 🔥",
    message: "3 days in a row! The habit is forming.",
    icon: <Flame className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    celebration: true,
  },
  {
    days: 7,
    title: "Week One Complete! 🎉",
    message: "Congratulations! You've built a week-long habit.",
    icon: <Award className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    celebration: true,
  },
  {
    days: 14,
    title: "Two Weeks Strong! 💪",
    message: "Halfway to a lifetime habit. You're unstoppable!",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    celebration: true,
  },
  {
    days: 21,
    title: "Three Weeks! ✨",
    message: "Science says habits stick around now. You're almost there!",
    icon: <Award className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-500",
    celebration: true,
  },
  {
    days: 30,
    title: "30-Day Legend! 👑",
    message: "You completed the challenge! This is how real change happens.",
    icon: <Crown className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500",
    celebration: true,
  },
];

export default function MilestoneNotification({
  habits,
  onDismiss,
}: MilestoneNotificationProps) {
  const [visibleMilestone, setVisibleMilestone] = useState<Milestone | null>(null);

  useEffect(() => {
    if (!habits || habits.length === 0) return;

    const currentStreak = calculateCurrentStreak(habits);

    // Check if this milestone hasn't been shown yet
    const milestone = milestones.find((m) => m.days === currentStreak);
    const storageKey = getMilestoneStorageKey(currentStreak);
    const hasShownMilestone = localStorage.getItem(storageKey);

    if (milestone && !hasShownMilestone && currentStreak > 0) {
      setVisibleMilestone(milestone);
      localStorage.setItem(storageKey, "shown");

      // Auto-dismiss after 8 seconds
      const timer = setTimeout(() => {
        setVisibleMilestone(null);
        onDismiss?.();
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [habits, onDismiss]);

  return (
    <AnimatePresence>
      {visibleMilestone && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
            onClick={() => setVisibleMilestone(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Celebration confetti effect */}
          {visibleMilestone.celebration && (
            <>
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: "-10px",
                  }}
                  animate={{
                    y: window.innerHeight + 20,
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1.5,
                    delay: Math.random() * 0.5,
                    ease: "easeIn",
                  }}
                />
              ))}
            </>
          )}

          {/* Modal */}
          <motion.div
            className={`relative z-10 max-w-md w-full rounded-[32px] bg-gradient-to-br ${visibleMilestone.color} p-8 shadow-2xl text-white overflow-hidden pointer-events-auto`}
            initial={{ scale: 0.5, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-slate-500/10 dark:bg-slate-700/30 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Icon */}
              <motion.div
                className="flex justify-center mb-6"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              >
                {visibleMilestone.icon}
              </motion.div>

              {/* Title */}
              <motion.h3
                className="text-3xl font-bold mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {visibleMilestone.title}
              </motion.h3>

              {/* Message */}
              <motion.p
                className="text-lg opacity-90 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {visibleMilestone.message}
              </motion.p>

              {/* Milestone counter */}
              <motion.div
                className="inline-block bg-slate-200/30 dark:bg-slate-700/30 rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                {visibleMilestone.days} Days in
              </motion.div>

              {/* Close button */}
              <motion.button
                onClick={() => setVisibleMilestone(null)}
                className="mt-6 w-full rounded-2xl bg-slate-200/30 hover:bg-slate-200/40 dark:bg-slate-700/30 dark:hover:bg-slate-700/40 px-4 py-3 font-semibold transition-all backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Keep the Streak Going! 🚀
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
