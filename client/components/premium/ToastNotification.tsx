import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, Zap } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

let toastId = 0;
let toastCallback: ((toast: Toast) => void) | null = null;

export function showToast(message: string, type: ToastType = "success", duration = 3000) {
  const id = `toast-${toastId++}`;
  if (toastCallback) {
    toastCallback({ id, message, type, duration });
  }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    toastCallback = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);

      if (toast.duration) {
        const timer = setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toast.id));
        }, toast.duration);
        return () => clearTimeout(timer);
      }
    };
  }, []);

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "info":
        return <Zap className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800";
      case "error":
        return "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800";
      case "info":
        return "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -10, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -10, x: 20 }}
            transition={{ duration: 0.3 }}
            className={`rounded-lg border flex items-center gap-3 px-4 py-3 shadow-soft-lg backdrop-blur-sm pointer-events-auto ${getStyles(
              toast.type
            )}`}
          >
            {getIcon(toast.type)}
            <span className="text-sm font-medium text-foreground">
              {toast.message}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
