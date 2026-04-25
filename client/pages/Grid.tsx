import AppShell from "@/components/layout/AppShell";
import HabitGrid from "@/components/habit-tracker/HabitGrid";
import { getActiveUser, updateUserAccount } from "@/components/habit-tracker/user-storage";
import { useEffect, useState } from "react";
import { type HabitItem } from "@/components/habit-tracker/habit-data";
import { useNavigate } from "react-router-dom";

export default function GridPage() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState<HabitItem[]>([]);

  useEffect(() => {
    const loadActiveUser = async () => {
      const active = await getActiveUser();
      if (!active) {
        navigate("/");
        return;
      }
      setHabits(active.habits || []);
    };

    loadActiveUser();
  }, [navigate]);

  useEffect(() => {
    const saveData = async () => {
      const active = await getActiveUser();
      if (active) {
        updateUserAccount(active.email, { habits, onboardingComplete: true });
      }
    };

    saveData();
  }, [habits]);

  const toggleDay = (habitId: string, dayIndex: number) => {
    setHabits((current) =>
      current.map((habit) => {
        if (habit.id !== habitId) return habit;
        const nextCompletions = [...habit.completions];
        nextCompletions[dayIndex] = !nextCompletions[dayIndex];
        return { ...habit, completions: nextCompletions };
      }),
    );
  };

  const removeHabit = (habitId: string) => setHabits((current) => current.filter((h) => h.id !== habitId));

  return (
    <AppShell>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Habit Grid</h1>
        </div>
        <div>
          <HabitGrid
            habits={habits}
            onToggleDay={toggleDay}
            onRemoveHabit={removeHabit}
            onMarkTodayComplete={() => {}}
            onSetNotification={() => {}}
          />
        </div>
      </div>
    </AppShell>
  );
}
