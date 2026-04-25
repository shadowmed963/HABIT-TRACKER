import { motion, easeOut } from "framer-motion";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface OnboardingWelcomeProps {
  onStart: () => void;
  userName?: string;
}

export default function OnboardingWelcome({ onStart, userName }: OnboardingWelcomeProps) {
  const { language } = useLanguage();

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
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const benefits = [
    { icon: "🎯", title: "AI-Powered", desc: "Get personalized habit suggestions" },
    { icon: "📊", title: "Track Progress", desc: "Beautiful 30-day visual tracking" },
    { icon: "🔥", title: "Build Streaks", desc: "Stay consistent and motivated" },
  ];

  return (
    <motion.div
      className="rounded-[32px] border border-border/70 bg-gradient-to-br from-card/95 to-card/85 p-6 sm:p-8 shadow-lg overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <motion.div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4 mx-auto"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {userName ? `Let's set up your habits, ${userName}!` : "Let's get started!"}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            We'll help you build habits that stick with AI-powered guidance
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl bg-secondary/50 border border-border/50 p-4 text-center hover:bg-secondary/70 transition"
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl mb-2">{benefit.icon}</div>
              <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* What to Expect */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl bg-primary/5 border border-primary/20 p-6 mb-8"
        >
          <h3 className="font-semibold text-foreground mb-4 text-lg">What to Expect:</h3>
          <div className="space-y-3">
            {[
              "Answer 3 quick questions about your goals",
              "Get 3-8 AI-suggested habits tailored to you",
              "Customize your habits and start tracking",
              "Track daily progress and build streaks",
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <motion.div
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                >
                  {idx + 1}
                </motion.div>
                <p className="text-muted-foreground pt-0.5">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onStart}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-6 py-4 text-lg font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start the Quiz
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-center text-xs text-muted-foreground"
        >
          Takes about 2 minutes • You can always skip or change habits later
        </motion.p>
      </div>
    </motion.div>
  );
}
