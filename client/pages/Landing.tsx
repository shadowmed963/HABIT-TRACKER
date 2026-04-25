import { motion, type Variants } from "framer-motion";
import { Sparkles, ArrowRight, Grid3X3, TrendingUp, Heart } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useEffect, useState } from "react";

export default function Landing({ onStart }: { onStart: () => void }) {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-green-200/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-200/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-12">
        <motion.div
          className="max-w-3xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-green-100/70 dark:bg-green-900/30 px-4 py-2 text-sm font-semibold text-green-700 dark:text-green-300 backdrop-blur-sm border border-green-200/50 dark:border-green-800/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-4 w-4" />
              <span>{t.landing?.badge || "AI-Powered Habit Tracking"}</span>
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-slate-900 dark:text-slate-100 leading-tight mb-6"
          >
            {t.landing?.headline || "Build a calm,\nconsistent life\nin 30 days"}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-center text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {t.landing?.subheadline ||
              "Transform your habits with AI-powered suggestions, beautiful tracking, and daily motivation. Start your journey to becoming the best version of yourself."}
          </motion.p>

          {/* Feature Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 sm:mb-12"
          >
            {[
              {
                icon: Grid3X3,
                title: t.landing?.feature1Title || "Visual Tracking",
                desc: t.landing?.feature1Desc || "Beautiful 30-day grid view",
              },
              {
                icon: Sparkles,
                title: t.landing?.feature2Title || "Smart AI",
                desc: t.landing?.feature2Desc || "Personalized habit suggestions",
              },
              {
                icon: TrendingUp,
                title: t.landing?.feature3Title || "Real Progress",
                desc: t.landing?.feature3Desc || "Animated charts & insights",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  className="rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 p-4 sm:p-6 text-center hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all"
                  whileHover={{ y: -5 }}
                  variants={itemVariants}
                >
                  <motion.div
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-3 mx-auto"
                    variants={floatingVariants}
                    animate="animate"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              onClick={onStart}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.landing?.ctaButton || "Start Your Journey"}
              <ArrowRight className="h-5 w-5" />
            </motion.button>
            <motion.button
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-600 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 px-8 py-4 text-lg font-semibold text-slate-900 dark:text-slate-100 backdrop-blur-sm transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.landing?.learnMore || "Learn More"}
            </motion.button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {t.landing?.trustedBy || "Trusted by habit builders worldwide"}
            </p>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  10K+
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {t.landing?.users || "Active Users"}
                </p>
              </div>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  4.8★
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {t.landing?.rating || "App Rating"}
                </p>
              </div>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  30 days
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {t.landing?.challenge || "Free Challenge"}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {t.landing?.scrollDown || "Scroll down"}
          </p>
          <div className="h-6 w-4 rounded-full border-2 border-slate-400 dark:border-slate-600 flex items-start justify-center p-1">
            <motion.div
              className="h-1 w-1 bg-slate-400 dark:bg-slate-600 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
