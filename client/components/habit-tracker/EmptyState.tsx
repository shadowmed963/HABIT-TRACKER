import { motion, type Variants } from "framer-motion";
import { TrendingUp, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface EmptyStateProps {
  onCreateHabit?: () => void;
}

export default function EmptyState({ onCreateHabit }: EmptyStateProps) {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const messages = {
    en: {
      title: "No Habits Yet",
      description: "Start building better habits today",
      cta: "Create Your First Habit",
    },
    ar: {
      title: "لا توجد عادات حتى الآن",
      description: "ابدأ ببناء عادات أفضل اليوم",
      cta: "أنشئ عادتك الأولى",
    },
    fr: {
      title: "Pas d'habitudes Encore",
      description: "Commencez à construire de meilleures habitudes aujourd'hui",
      cta: "Créer Votre Première Habitude",
    },
  };

  const msg = messages[language as keyof typeof messages] || messages.en;

  // Animation variants for the container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  // Animation for the icon
  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    float: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Animation for text
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Animation for sparkles
  const sparkleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.6,
      transition: {
        duration: 0.4,
      },
    },
    pulse: {
      opacity: [0.6, 1, 0.6],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      className="min-h-[400px] flex flex-col items-center justify-center px-4 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main icon with sparkles */}
      <div className="relative mb-6 sm:mb-8">
        {/* Sparkle accents */}
        <motion.div
          className="absolute -top-4 -left-4 text-yellow-400"
          variants={sparkleVariants}
          initial="hidden"
          animate={["visible", "pulse"]}
        >
          <Sparkles size={20} />
        </motion.div>
        <motion.div
          className="absolute -bottom-4 -right-4 text-yellow-300"
          variants={sparkleVariants}
          initial="hidden"
          animate={["visible", "pulse"]}
          transition={{ delay: 0.3 }}
        >
          <Sparkles size={16} />
        </motion.div>

        {/* Main icon */}
        <motion.div
          variants={iconVariants}
          initial="hidden"
          animate={["visible", "float"]}
          className="relative"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center shadow-lg">
            <TrendingUp className="w-12 h-12 sm:w-14 sm:h-14 text-green-600" />
          </div>
        </motion.div>
      </div>

      {/* Title */}
      <motion.h2
        variants={textVariants}
        className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-2 sm:mb-3"
      >
        {msg.title}
      </motion.h2>

      {/* Description */}
      <motion.p
        variants={textVariants}
        className="text-muted-foreground text-center text-sm sm:text-base mb-6 sm:mb-8 max-w-xs"
      >
        {msg.description}
      </motion.p>

      {/* CTA Button */}
      <motion.button
        variants={textVariants}
        onClick={onCreateHabit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-6 sm:px-8 py-3 sm:py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 ${
          isArabic ? "rtl" : ""
        }`}
      >
        {msg.cta}
      </motion.button>

      {/* Decorative element */}
      <motion.div
        className="mt-12 sm:mt-16 w-32 h-1 bg-gradient-to-r from-green-200 via-green-300 to-green-200 rounded-full blur-sm"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
}
