import AppShell from "@/components/layout/AppShell";
import ProgressOverview from "@/components/habit-tracker/ProgressOverview";
import { getActiveUser } from "@/components/habit-tracker/user-storage";
import { useEffect, useState } from "react";
import { type HabitItem } from "@/components/habit-tracker/habit-data";
import { useNavigate } from "react-router-dom";

export default function ChartPage() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState<HabitItem[]>([]);

  useEffect(() => {
    const active = getActiveUser();
    if (!active) {
      navigate("/");
      return;
    }
    setHabits(active.habits || []);
  }, [navigate]);

  return (
    <AppShell>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Progress Chart</h1>
        </div>
        <ProgressOverview habits={habits} />
      </div>
    </AppShell>
  );
}
