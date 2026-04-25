import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DashboardHeroProps {
  userName: string;
  completionPercentage: number;
  totalHabits: number;
  completedToday: number;
}

const motivationalQuotes = [
  "Every small step counts. You're building momentum.",
  "Consistency is the gateway to extraordinary results.",
  "Your future self will thank you for today's efforts.",
  "Progress > Perfection. Keep going.",
  "One day at a time. You've got this.",
  "The best time to start is now.",
  "Small habits, big changes.",
  "Show up for yourself today.",
];

export default function DashboardHero({
  userName,
  completionPercentage,
  totalHabits,
  completedToday,
}: DashboardHeroProps) {
  const [quote, setQuote] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Set daily quote based on day of year
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    setQuote(motivationalQuotes[dayOfYear % motivationalQuotes.length]);

    // Format current date
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
      day: "numeric",
    };
    setCurrentDate(
      new Date().toLocaleDateString("en-US", options)
    );
  }, []);

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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="overflow-hidden rounded-[32px] bg-gradient-to-br from-green-50 via-blue-50 to-slate-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-background p-6 shadow-sm ring-1 ring-ring/10 sm:p-8"
    >
      {/* Greeting Section */}
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Welcome back, <span className="text-primary">{userName}</span> 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{currentDate}</p>
      </motion.div>

      {/* Main Progress Circle Card */}
      <motion.div
        variants={itemVariants}
        className="mb-6 flex flex-col items-center justify-center rounded-[28px] bg-gradient-to-br from-slate-50/80 to-slate-100/40 dark:from-card/80 dark:to-card/40 backdrop-blur-md p-8 shadow-soft-lg border border-slate-200/50 dark:border-border/50"
      >
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Background Circle */}
          <svg
            className="absolute inset-0 -rotate-90"
            width="100%"
            height="100%"
            viewBox="0 0 200 200"
          >
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-300 dark:text-gray-700"
            />
            {/* Animated Progress Circle */}
            <motion.circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#gradientProgress)"
              strokeWidth="8"
              strokeDasharray={565}
              strokeDashoffset={565 - (565 * completionPercentage) / 100}
              strokeLinecap="round"
              animate={{
                strokeDashoffset: 565 - (565 * completionPercentage) / 100,
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <defs>
              <linearGradient
                id="gradientProgress"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="text-5xl font-bold text-primary mb-1"
            >
              {Math.round(completionPercentage)}%
            </motion.div>
            <p className="text-sm text-muted-foreground">Complete today</p>
            <p className="text-xs text-muted-foreground mt-1">
              {completedToday} of {totalHabits}
            </p>
          </motion.div>
        </div>

        {/* Action CTA */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 w-full rounded-full bg-gradient-to-r from-primary to-blue-500 text-white font-semibold py-3 shadow-[0_12px_32px_rgba(34,197,94,0.3)] hover:shadow-[0_16px_40px_rgba(34,197,94,0.4)] transition-all duration-300"
        >
          ✨ Start your day
        </motion.button>
      </motion.div>

      {/* Quote Section */}
      <motion.div
        variants={itemVariants}
        className="rounded-[20px] bg-slate-100/50 dark:bg-card/50 backdrop-blur-sm border border-slate-200/30 dark:border-border/30 p-4 text-center"
      >
        <p className="text-sm leading-relaxed text-foreground italic">
          "{quote}"
        </p>
      </motion.div>
    </motion.section>
  );
}
