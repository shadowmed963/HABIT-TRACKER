import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, category: string) => void;
}

export default function AddHabitModal({
  isOpen,
  onClose,
  onAdd,
}: AddHabitModalProps) {
  const { t } = useLanguage();
  const [habitName, setHabitName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("green");

  const categories = [
    { name: t.common.healthCategory, color: "green", emoji: "💪" },
    { name: t.common.learningCategory, color: "blue", emoji: "📚" },
    { name: t.common.productivityCategory, color: "purple", emoji: "⚡" },
    { name: t.common.mindfulnessCategory, color: "orange", emoji: "🧘" },
    { name: t.common.socialCategory, color: "pink", emoji: "👥" },
    { name: t.common.financeCategory, color: "cyan", emoji: "💰" },
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (habitName.trim()) {
      onAdd(habitName, selectedCategory);
      setHabitName("");
      setSelectedCategory("green");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[32px] bg-slate-50 dark:bg-card shadow-floating p-6 max-h-[90vh] overflow-y-auto"
          >
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </motion.button>

            <motion.h2
              className="text-2xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {t.common.createNewHabit}
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 }}
              >
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t.common.habitName}
                </label>
                <motion.input
                  type="text"
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  placeholder={t.common.habitNamePlaceholder}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-card/50 focus:border-primary focus:outline-none focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all duration-200"
                  autoFocus
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-semibold text-foreground mb-3">
                  {t.common.categoryLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categories.map((cat, i) => (
                    <motion.button
                      key={cat.color}
                      type="button"
                      onClick={() => setSelectedCategory(cat.color)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 text-center ${
                        selectedCategory === cat.color
                          ? `border-${cat.color}-500 bg-${cat.color}-50 dark:bg-${cat.color}-950/30 shadow-[0_4px_12px_rgba(59,130,246,0.2)]`
                          : "border-border hover:border-border-50"
                      }`}
                    >
                      <motion.div
                        className="text-2xl mb-1"
                        animate={selectedCategory === cat.color ? { scale: 1.2 } : { scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {cat.emoji}
                      </motion.div>
                      <div className="text-xs font-semibold text-foreground">{cat.name}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="flex gap-3 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <motion.button
                  type="button"
                  onClick={onClose}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 rounded-full border-2 border-border text-foreground font-semibold hover:bg-muted transition-all"
                >
                  {t.common.cancel}
                </motion.button>
                <motion.button
                  type="submit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={
                    habitName.trim()
                      ? { scale: 1.08, boxShadow: "0 12px 32px rgba(34,197,94,0.4)" }
                      : {}
                  }
                  whileTap={habitName.trim() ? { scale: 0.92 } : {}}
                  className="flex-1 py-3 rounded-full bg-gradient-to-r from-primary to-green-600 text-white font-semibold shadow-[0_8px_24px_rgba(34,197,94,0.3)] hover:shadow-[0_12px_32px_rgba(34,197,94,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!habitName.trim()}
                >
                  <motion.span>
                    {t.common.createHabit} ✨
                  </motion.span>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
