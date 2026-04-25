import { motion } from "framer-motion";
import { useState } from "react";
import { ReactNode } from "react";

interface RippleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  rippleColor?: string;
}

export default function RippleButton({
  children,
  onClick,
  className = "",
  disabled = false,
  rippleColor = "rgba(34, 197, 94, 0.5)", // Calm green by default
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [nextId, setNextId] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = nextId;
    setNextId(id + 1);
    setRipples([...ripples, { id, x, y }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onClick?.();
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseDown={handleMouseDown}
      disabled={disabled}
      className={`relative overflow-hidden transition-all ${className}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {children}

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none rounded-full"
          initial={{
            x: ripple.x,
            y: ripple.y,
            width: 0,
            height: 0,
            opacity: 1,
            backgroundColor: rippleColor,
          }}
          animate={{
            x: ripple.x - 50,
            y: ripple.y - 50,
            width: 100,
            height: 100,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </motion.button>
  );
}
