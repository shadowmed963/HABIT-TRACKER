import { motion } from "framer-motion";
import { X, Plus, Sparkles, Clock, Target, CheckCircle2, Activity, BookOpen, Droplets, Heart, Brain, Zap, Leaf, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { useLanguage } from "@/lib/language-context";
import { showToast } from "@/components/premium/ToastNotification";
import type { HabitSuggestion } from "./habit-data";

interface HabitSuggestionsProps {
  suggestions: HabitSuggestion[];
  onConfirm: (selectedHabits: HabitSuggestion[]) => void;
  onBack: () => void;
}

// Map habit categories to icons
const categoryIcons: Record<string, React.ReactNode> = {
  health: <Heart className="h-5 w-5" />,
  fitness: <Activity className="h-5 w-5" />,
  learning: <BookOpen className="h-5 w-5" />,
  wellness: <Droplets className="h-5 w-5" />,
  mental: <Brain className="h-5 w-5" />,
  energy: <Zap className="h-5 w-5" />,
  nature: <Leaf className="h-5 w-5" />,
  sleep: <Moon className="h-5 w-5" />,
  custom: <Heart className="h-5 w-5" />,
};

function getCategoryIcon(category: string): React.ReactNode {
  return categoryIcons[category] || <Heart className="h-5 w-5" />;
}

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function HabitSuggestions({
  suggestions,
  onConfirm,
  onBack,
}: HabitSuggestionsProps) {
  const { t, language } = useLanguage();
  const [selectedHabits, setSelectedHabits] = useState<Set<number>>(
    new Set(suggestions.map((_, i) => i))
  );
  const [customHabit, setCustomHabit] = useState("");
  const [customHabits, setCustomHabits] = useState<HabitSuggestion[]>([]);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const toggleHabit = (index: number) => {
    const updated = new Set(selectedHabits);
    if (updated.has(index)) {
      updated.delete(index);
    } else {
      updated.add(index);
    }
    setSelectedHabits(updated);
  };

  const addCustomHabit = () => {
    const trimmedName = customHabit.trim();
    if (!trimmedName) {
      showToast("Please enter a habit name.", "error", 1000);
      return;
    }

    const allHabits = [...suggestions, ...customHabits];
    const duplicate = allHabits.some(
      (habit) => habit.name.trim().toLowerCase() === trimmedName.toLowerCase(),
    );

    if (duplicate) {
      showToast("Habit already exists.", "info", 1000);
      return;
    }

    const newHabit: HabitSuggestion = {
      name: trimmedName,
      description: "Custom habit",
      estimatedTime: "medium",
      category: "custom",
    };
    setCustomHabits([...customHabits, newHabit]);
    setCustomHabit("");
    setShowCustomInput(false);
  };

  const removeCustomHabit = (index: number) => {
    setCustomHabits(customHabits.filter((_, i) => i !== index));
  };

  const allHabits = [...suggestions, ...customHabits];
  const finalSelected = Array.from(selectedHabits)
    .map((i) => allHabits[i])
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-calm-100/50 dark:bg-calm-900/30 border border-calm-200 dark:border-calm-800/50 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-calm-600 dark:text-calm-400" />
            <span className="text-sm font-medium text-calm-700 dark:text-calm-300">
              AI-Powered Suggestions
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Ready to start?
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Pick habits that resonate with you, or add your own
          </p>
        </motion.div>

        {/* Suggestions Grid */}
        <motion.div
          className="grid gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {allHabits.map((habit, index) => {
            const isSelected = selectedHabits.has(index);
            const isCustom = index >= suggestions.length;

            return (
              <motion.div
                key={`${habit.name}-${index}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer group ${
                  isSelected
                    ? "bg-calm-50 dark:bg-calm-900/20 border-calm-500 dark:border-calm-400 shadow-lg shadow-calm-500/10"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-calm-300 dark:hover:border-calm-600"
                }`}
                onClick={() => toggleHabit(index)}
              >
                {/* Background glow on select */}
                {isSelected && (
                  <motion.div
                    layoutId={`glow-${index}`}
                    className="absolute inset-0 bg-gradient-to-r from-calm-500/10 to-serene-500/10 rounded-2xl -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}

                <div className="flex gap-4">
                  {/* Icon and Checkbox */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <div className="p-2 rounded-lg bg-calm-500/10 text-calm-600">
                      {getCategoryIcon(habit.category || "custom")}
                    </div>
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-calm-500 border-calm-500"
                        : "border-slate-300 dark:border-slate-600"
                    }`}>
                      {isSelected && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                      {habit.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {habit.description}
                    </p>

                    {/* Info badges */}
                    <div className="flex flex-wrap gap-2">
                      {habit.estimatedTime && (
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-calm-100 dark:bg-calm-900/30 text-xs font-medium text-calm-700 dark:text-calm-300">
                          <Clock className="w-3 h-3" />
                          {habit.estimatedTime}
                        </div>
                      )}
                      {habit.category && (
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-serene-100 dark:bg-serene-900/30 text-xs font-medium text-serene-700 dark:text-serene-300">
                          <Target className="w-3 h-3" />
                          {habit.category}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Remove button for custom habits */}
                  {isCustom && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCustomHabit(index - suggestions.length);
                      }}
                      className="flex-shrink-0 p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Add Custom Habit Button */}
          {!showCustomInput && (
            <motion.button
              variants={itemVariants}
              onClick={() => setShowCustomInput(true)}
              className="p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-calm-400 dark:hover:border-calm-600 transition-colors flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:text-calm-600 dark:hover:text-calm-400"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Custom Habit</span>
            </motion.button>
          )}

          {/* Custom Habit Input */}
          {showCustomInput && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-emerald-500 dark:border-emerald-400"
            >
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Habit name
              </label>
              <div className="flex gap-3">
                <Input
                  autoFocus
                  value={customHabit}
                  onChange={(e) => setCustomHabit(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCustomHabit()}
                  placeholder="e.g., Read a book..."
                  className="flex-1"
                />
                <Button
                  onClick={addCustomHabit}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Add
                </Button>
              </div>
              <button
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomHabit("");
                }}
                className="mt-3 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 mb-8"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Ready to begin?
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {finalSelected.length} habit{finalSelected.length !== 1 ? "s" : ""} selected
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-3 justify-between max-w-3xl mx-auto"
        >
          <Button onClick={onBack} variant="outline">
            Back
          </Button>
          <Button
            onClick={() => onConfirm(finalSelected)}
            disabled={finalSelected.length === 0}
            className="bg-calm-600 hover:bg-calm-700 dark:bg-calm-600 dark:hover:bg-calm-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start 30-Day Challenge
            <CheckCircle2 className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
    </div>
  );
}
