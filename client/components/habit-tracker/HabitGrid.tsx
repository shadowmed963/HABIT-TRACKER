import { Check, Grid3X3, Trash2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useInteractionAnimation, useHapticFeedback } from "@/hooks/use-animations";
import { motion } from "framer-motion";
import type { HabitItem } from "./habit-data";
import { useState, useCallback } from "react";

interface HabitGridProps {
  habits: HabitItem[];
  onToggleDay: (habitId: string, dayIndex: number) => void;
  onRemoveHabit: (habitId: string) => void;
  onMarkTodayComplete?: (habitId: string) => void;
  onSetNotification?: (habitId: string) => void;
}

const CELL_SIZE_MOBILE = 32; // px — smaller on mobile to fit more days
const CELL_SIZE_DESKTOP = 36; // px

export default function HabitGrid({
  habits,
  onToggleDay,
  onRemoveHabit,
  onMarkTodayComplete,
  onSetNotification,
}: HabitGridProps) {
  const { t, language } = useLanguage();
  const today = 29; // Day 30 (0-indexed)
  const [animatingCells, setAnimatingCells] = useState<Set<string>>(new Set());
  const { trigger: triggerHaptic } = useHapticFeedback();
  
  // Use responsive cell size
  const cellSize = typeof window !== 'undefined' && window.innerWidth < 640 ? CELL_SIZE_MOBILE : CELL_SIZE_DESKTOP;

  const handleToggleWithAnimation = useCallback(
    (habitId: string, dayIndex: number) => {
      const cellKey = `${habitId}-${dayIndex}`;
      
      // Add to animating set
      setAnimatingCells((prev) => new Set(prev).add(cellKey));
      
      // Trigger haptic feedback for mobile
      triggerHaptic([10, 5, 10]);
      
      // Call the actual toggle
      onToggleDay(habitId, dayIndex);
      
      // Remove from animating set after animation
      setTimeout(() => {
        setAnimatingCells((prev) => {
          const next = new Set(prev);
          next.delete(cellKey);
          return next;
        });
      }, 300);
    },
    [onToggleDay, triggerHaptic]
  );

  return (  
    <motion.section
      className="rounded-[20px] border border-border/70 bg-card/88 p-3 shadow-sm sm:rounded-[30px] sm:p-5 sm:shadow"
      dir={language === "ar" ? "rtl" : "ltr"}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="flex items-start justify-between gap-2 sm:gap-4">
        <div>
          <motion.div
            className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary sm:px-3 sm:py-1 sm:text-xs"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          >
            <Grid3X3 className="h-3 w-3 sm:h-4 sm:w-4" />
            {t.grid.gridLabel}
          </motion.div>
          <motion.h2
            className="text-base font-semibold text-foreground sm:text-xl"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
          >
            {t.habits.gridTitle}
          </motion.h2>
          <motion.p
            className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm sm:mt-2 sm:leading-6"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          >
            {t.habits.gridDesc}
          </motion.p>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-[16px] sm:mt-6 sm:rounded-[24px]">
        <table className="w-full border-collapse">
          {/* Day headers */}
          <thead>
            <tr>
              <th className="sticky left-0 z-10 min-w-[100px] border-b border-border/50 bg-card/95 px-2 py-2 text-left sm:min-w-[140px] sm:px-3 sm:py-3">
                <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-[0.16em]">
                  {t.habits.habits}
                </span>
              </th>
              {Array.from({ length: 30 }, (_, i) => i).map((dayIndex) => (
                <th
                  key={`day-${dayIndex}`}
                  className={`border-b px-0.5 py-1.5 text-center transition sm:px-1 sm:py-2 ${
                    dayIndex === today
                      ? "border-primary bg-primary/12 ring-1 ring-primary/30"
                      : "border-border/30 bg-secondary/10"
                  }`}
                  style={{ width: `${cellSize}px` }}
                >
                  <span
                    className={`text-[8px] font-bold uppercase tracking-[0.08em] sm:text-[10px] sm:tracking-[0.12em] ${
                      dayIndex === today ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {dayIndex === today ? "📅" : ""}D{dayIndex + 1}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          {/* Habit rows */}
          <tbody>
            {habits.map((habit, habitIndex) => {
              const completedCount = habit.completions.filter(Boolean).length;

              return (
                <motion.tr
                  key={habit.id}
                  className="border-b border-border/30 hover:bg-secondary/20 transition"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: habitIndex * 0.05 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Habit name column */}
                  <td className="sticky left-0 z-10 min-w-[100px] bg-card/95 px-2 py-3 sm:min-w-[140px] sm:px-3 sm:py-4">
                    <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-xs font-semibold text-foreground sm:text-sm">
                          {habit.name}
                        </h3>
                        <div className="mt-0.5 flex items-center gap-1 sm:mt-1 sm:gap-2">
                          <p className="truncate text-[10px] text-primary font-medium sm:text-xs">
                            {habit.cadence}
                          </p>
                          <motion.span
                            className="inline-flex items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-primary sm:px-2 sm:text-[11px]"
                            key={completedCount}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            {completedCount}/30
                          </motion.span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        {habit.id !== "prayer" && habit.id !== "quran" && (
                          <motion.button
                            type="button"
                            onClick={() => onRemoveHabit(habit.id)}
                            className="flex-shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-popover text-muted-foreground transition hover:border-destructive hover:text-destructive hover:bg-destructive/5 sm:h-8 sm:w-8"
                            aria-label={`${t.grid.remove} ${habit.name}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 200, damping: 17 }}
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </motion.button>
                        )}
                        {habit.id !== "prayer" && habit.id !== "quran" && onSetNotification && (
                          <motion.button
                            type="button"
                            onClick={() => onSetNotification(habit.id)}
                            className="flex-shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-popover text-muted-foreground transition hover:border-primary hover:text-primary hover:bg-primary/5 sm:h-8 sm:w-8"
                            aria-label={`Set reminder for ${habit.name}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 200, damping: 17 }}
                          >
                            <Grid3X3 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Day cells */}
                  {habit.completions.map((isDone, dayIndex) => {
                    const cellKey = `${habit.id}-${dayIndex}`;
                    const isAnimating = animatingCells.has(cellKey);

                    return (
                      <td
                        key={cellKey}
                        className={`p-0.5 text-center transition sm:p-1 ${
                          dayIndex === today ? "bg-primary/8" : ""
                        }`}
                        style={{ width: `${cellSize}px` }}
                      >
                        <motion.button
                          type="button"
                          onClick={() => handleToggleWithAnimation(habit.id, dayIndex)}
                          className={`mx-auto flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold transition sm:h-9 sm:w-9 ${
                            isDone
                              ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                              : "border-border/50 bg-popover text-muted-foreground hover:border-primary/40 hover:bg-primary/5"
                          }`}
                          aria-label={`Toggle day ${dayIndex + 1} for ${habit.name}`}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          animate={
                            isAnimating
                              ? {
                                  scale: [1, 1.1, 1],
                                  boxShadow: [
                                    "0 0 0 0px rgba(16, 185, 129, 0.6)",
                                    "0 0 0 8px rgba(16, 185, 129, 0.1)",
                                    "0 0 0 0px rgba(16, 185, 129, 0)",
                                  ],
                                }
                              : isDone
                              ? {
                                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
                                }
                              : {}
                          }
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                        >
                          {isDone ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                            </motion.div>
                          ) : (
                            <span className="text-[10px] sm:text-xs">{dayIndex + 1}</span>
                          )}
                        </motion.button>
                      </td>
                    );
                  })}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {!habits.length && (
        <motion.div
          className="rounded-[16px] border border-dashed border-primary/30 bg-primary/5 p-4 text-center sm:rounded-[24px] sm:p-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="text-xs text-muted-foreground sm:text-sm">{t.habits.noHabits}</p>
        </motion.div>
      )}
    </motion.section>
  );
}
