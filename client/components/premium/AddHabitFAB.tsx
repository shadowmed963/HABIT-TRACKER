import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface AddHabitFABProps {
  onClick: () => void;
}

export default function AddHabitFAB({ onClick }: AddHabitFABProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, boxShadow: "0 12px 40px rgba(34, 197, 94, 0.4)" }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-green-600 text-white shadow-[0_8px_24px_rgba(34,197,94,0.3)] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/50 animate-fab-glow"
      title="Add new habit"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-slate-600/50 border-r-slate-600/50 opacity-0 group-hover:opacity-100"
      />
      <Plus className="h-7 w-7 relative z-10" />
    </motion.button>
  );
}
