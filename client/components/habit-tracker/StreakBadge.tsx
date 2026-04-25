import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface StreakBadgeProps {
  streak: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export default function StreakBadge({
  streak,
  size = "md",
  animated = true,
}: StreakBadgeProps) {
  const sizeClasses = {
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-11 w-11 text-base",
  };

  const fireVariants = {
    animate: {
      scale: [1, 1.15, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatDelay: 1.5,
      },
    },
  };

  const pulseVariants = {
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(239, 68, 68, 0.3)",
        "0 0 0 8px rgba(239, 68, 68, 0)",
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
  };

  if (streak === 0) {
    return null;
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} inline-flex items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 font-bold text-white shadow-lg`}
      variants={animated ? pulseVariants : {}}
      animate={animated ? "animate" : ""}
    >
      <motion.div
        className="relative flex items-center justify-center"
        variants={fireVariants}
        animate={animated ? "animate" : ""}
      >
        <Flame className="absolute h-full w-full p-0.5" />
        {streak > 0 && (
          <motion.span
            className="text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {streak}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
