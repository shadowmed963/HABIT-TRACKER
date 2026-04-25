import { motion } from "framer-motion";
import type { HabitItem } from "@/components/habit-tracker/habit-data";

interface ChartLiveProps {
  habits: HabitItem[];
  days?: number;
}

export default function ChartLive({ habits, days = 30 }: ChartLiveProps) {
  if (!habits || habits.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 rounded-[24px] bg-gradient-to-br from-slate-50/80 to-slate-100/40 dark:from-card/80 dark:to-card/40 backdrop-blur-md border border-slate-200/50 dark:border-border/50">
        <p className="text-muted-foreground">Add habits to see your progress chart</p>
      </div>
    );
  }

  // Calculate completion percentage for each day
  const chartData = Array.from({ length: days }, (_, dayIndex) => {
    const totalSlots = habits.length;
    const completedSlots = habits.filter(
      (habit) => habit.completions[dayIndex]
    ).length;
    return {
      day: dayIndex + 1,
      percentage: (completedSlots / totalSlots) * 100,
    };
  });

  // Find min and max for scaling
  const maxPercentage = 100;
  const minPercentage = 0;

  // Generate SVG path for the line chart
  const width = 600;
  const height = 200;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = chartData.map((data, i) => {
    const x = (i / (days - 1)) * chartWidth + padding;
    const y =
      height -
      (((data.percentage - minPercentage) / (maxPercentage - minPercentage)) *
        chartHeight +
        padding);
    return { x, y, percentage: data.percentage };
  });

  const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  // Area under the curve
  const areaData =
    `M ${padding} ${height - padding} ` +
    points.map((p, i) => `${i === 0 ? "L" : "L"} ${p.x} ${p.y}`).join(" ") +
    ` L ${width - padding} ${height - padding} Z`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-[24px] bg-gradient-to-br from-slate-50/80 to-slate-100/40 dark:from-card/80 dark:to-card/40 backdrop-blur-md border border-slate-200/50 dark:border-border/50 p-6 shadow-soft-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Progress Chart</h3>
          <p className="text-xs text-muted-foreground">Last {days} days</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Average</p>
          <p className="text-2xl font-bold text-primary">
            {Math.round(
              chartData.reduce((sum, d) => sum + d.percentage, 0) / days
            )}%
          </p>
        </div>
      </div>

      {/* SVG Chart */}
      <svg width="100%" height="250" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((value) => {
          const y = height - (((value - minPercentage) / (maxPercentage - minPercentage)) * chartHeight + padding);
          return (
            <g key={`grid-${value}`}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-300 dark:text-gray-700"
                strokeDasharray="4"
                opacity={value === 0 || value === 100 ? 0 : 0.5}
              />
              <text
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                className="text-xs fill-muted-foreground"
              >
                {value}%
              </text>
            </g>
          );
        })}

        {/* Area under curve */}
        <motion.path
          d={areaData}
          fill="url(#gradientFill)"
          opacity={0.2}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>

        {/* Line */}
        <motion.path
          d={pathData}
          stroke="url(#gradientStroke)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Data points */}
        {points.map((point, i) => (
          <motion.g
            key={`point-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.01 * i + 1, duration: 0.3 }}
          >
            {/* Outer circle (on hover highlight) */}
            <circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill="white"
              stroke="#22c55e"
              strokeWidth="2"
              className="dark:fill-card"
            />
            {/* Center dot */}
            <circle cx={point.x} cy={point.y} r="3" fill="#22c55e" />
          </motion.g>
        ))}

        {/* Today indicator (last point) */}
        <motion.line
          x1={points[days - 1]?.x || 0}
          y1={height - padding}
          x2={points[days - 1]?.x || 0}
          y2={padding}
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary/30"
          strokeDasharray="4"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Day 1</span>
        <span>Today ({days}d)</span>
      </div>
    </motion.div>
  );
}
