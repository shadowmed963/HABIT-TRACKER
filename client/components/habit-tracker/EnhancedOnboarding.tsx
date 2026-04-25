import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Clock, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { useLanguage } from "@/lib/language-context";
import type { HabitSuggestion } from "./habit-data";

interface EnhancedOnboardingProps {
  onComplete: () => void;
  onBack: () => void;
}

interface OnboardingStep {
  id: number;
  question: string;
  type: "improvement" | "time" | "type" | "goal";
  options: { label: string; value: string; icon?: React.ComponentType<any> }[];
  hint?: string;
}

export default function EnhancedOnboarding({
  onComplete,
  onBack,
}: EnhancedOnboardingProps) {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState(0);

  const steps: OnboardingStep[] = [
    {
      id: 1,
      question: t.quiz.improveArea,
      type: "improvement",
      options: [
        { label: t.options.fitness, value: "fitness", icon: Zap },
        { label: t.options.mindfulness, value: "mindfulness" },
        { label: t.options.productivity, value: "productivity" },
        { label: t.options.learning, value: "learning" },
        { label: t.options.health, value: "health" },
        { label: t.options.creativity, value: "creativity" },
      ],
      hint: t.quiz.improveAreaDesc,
    },
    {
      id: 2,
      question: t.quiz.dailyTime,
      type: "time",
      options: [
        { label: t.options.fiveMin, value: "short" },
        { label: t.options.tenMin, value: "medium" },
        { label: t.options.twentyMin, value: "long" },
        { label: t.options.thirtyPlusMin, value: "very-long" },
      ],
      hint: t.quiz.dailyTimeDesc,
    },
    {
      id: 3,
      question: t.quiz.preference,
      type: "type",
      options: [
        { label: t.options.physical, value: "physical" },
        { label: t.options.mental, value: "mental" },
        { label: t.options.study, value: "learning" },
        { label: t.options.creative, value: "creative" },
        { label: t.options.social, value: "social" },
        { label: t.options.selfCare, value: "selfcare" },
      ],
      hint: t.quiz.preferenceDesc,
    },
    {
      id: 4,
      question: t.quiz.goal,
      type: "goal",
      options: [
        { label: t.options.consistency, value: "consistency" },
        { label: t.options.skills, value: "skills" },
        { label: t.options.stress, value: "stress" },
        { label: t.options.health, value: "health" },
      ],
      hint: t.quiz.goalDesc,
    },
  ];

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isComplete = Object.keys(answers).length === steps.length;

  const handleSelectOption = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [step.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else if (isComplete) {
      // Quiz complete, move to suggestions screen
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const pageTransition = {
    x: { type: "spring" as const, stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              {t.quiz.step} {currentStep + 1} {t.quiz.of} {steps.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Question Content */}
        <div className="mb-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
            >
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                  {step.question}
                </h2>
                {step.hint && (
                  <p className="text-slate-600 dark:text-slate-400">{step.hint}</p>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {step.options.map((option) => {
                  const isSelected = answers[step.id] === option.value;
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => handleSelectOption(option.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl text-left font-medium transition-all border-2 ${
                        isSelected
                          ? "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 dark:border-emerald-400 text-emerald-900 dark:text-emerald-100"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-emerald-300 dark:hover:border-emerald-600"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 transition-colors ${
                            isSelected
                              ? "bg-emerald-500 border-emerald-500"
                              : "border-slate-300 dark:border-slate-600"
                          }`}
                        />
                        {option.label}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-between">
          <Button
            onClick={handlePrev}
            variant="outline"
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {t.quiz.back}
          </Button>

          <Button
            onClick={handleNext}
            disabled={!answers[step.id]}
            className="gap-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
          >
            {currentStep === steps.length - 1 ? t.quiz.seeSuggestions : t.quiz.continue}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
