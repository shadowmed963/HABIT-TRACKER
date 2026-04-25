import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Confetto {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
}

export default function ConfettiEffect() {
  const [confetti, setConfetti] = useState<Confetto[]>([]);

  useEffect(() => {
    // Generate confetti pieces
    const pieces: Confetto[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.2,
      duration: 2.5 + Math.random() * 0.5,
      rotation: Math.random() * 360,
    }));
    setConfetti(pieces);

    // Clean up after animation
    const timer = setTimeout(() => setConfetti([]), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            left: `${piece.left}%`,
            top: "-20px",
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            top: "100vh",
            opacity: 0,
            rotate: 720,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
          }}
          className={`absolute w-2 h-2 ${
            [
              "bg-green-500",
              "bg-blue-500",
              "bg-purple-500",
              "bg-pink-500",
              "bg-yellow-500",
            ][piece.id % 5]
          } rounded-full`}
        />
      ))}
    </div>
  );
}
