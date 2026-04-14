import { Globe, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme-context";

export default function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme();
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    if (!anim) return;
    const t = setTimeout(() => setAnim(false), 300);
    return () => clearTimeout(t);
  }, [anim]);

  const next = theme === "system" ? "dark" : theme === "dark" ? "light" : "system";

  const handleClick = () => {
    setAnim(true);
    setTheme(next as any);
  };

  const label = theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light";

  return (
    <button
      aria-label={`Theme: ${label}`}
      title={`Theme: ${label} (click to toggle)`}
      onClick={handleClick}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 focus:outline-none ${isDark ? "bg-popover/80 text-foreground" : "bg-secondary/80 text-secondary-foreground"} shadow-sm`}
    >
      <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${anim ? "scale-110 rotate-12" : ""}`}>
        {theme === "dark" ? <Moon className="h-5 w-5" /> : theme === "light" ? <Sun className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
