import { ReactNode } from "react";
import { motion, MotionProps, Variants } from "framer-motion";

/* ============================================
   PAGE LOAD ANIMATIONS
   ============================================ */

interface FadeInUpProps extends MotionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export function FadeInUp({ children, delay = 0, duration = 0.4, ...props }: FadeInUpProps) {
  const $variants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: "easeOut", delay },
    },
  };

  return (
    <motion.div initial="hidden" whileInView="visible" variants={$variants} {...props}>
      {children}
    </motion.div>
  );
}

/* ============================================
   HABIT CHECK INTERACTION
   ============================================ */

interface HabitCheckAnimationProps extends MotionProps {
  children: ReactNode;
  animate?: boolean;
}

const habitCheckScale: Variants = {
  rest: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const habitCheckGlow: Variants = {
  rest: { boxShadow: "0 0 0 0px rgba(16, 185, 129, 0.6)" },
  animate: {
    boxShadow: [
      "0 0 0 0px rgba(16, 185, 129, 0.6)",
      "0 0 0 8px rgba(16, 185, 129, 0.1)",
      "0 0 0 0px rgba(16, 185, 129, 0)",
    ],
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function HabitCheckAnimation({ children, animate = false, ...props }: HabitCheckAnimationProps) {
  return (
    <motion.div
      initial="rest"
      animate={animate ? "animate" : "rest"}
      variants={habitCheckScale}
      {...props}
    >
      <motion.div
        initial="rest"
        animate={animate ? "animate" : "rest"}
        variants={habitCheckGlow}
        style={{ borderRadius: "0.5rem" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ============================================
   STREAK ANIMATION
   ============================================ */

interface StreakAnimationProps extends MotionProps {
  children: ReactNode;
  trigger?: number;
}

const streakBounce: Variants = {
  rest: { scale: 1 },
  animate: {
    scale: [1, 1.15, 1],
    transition: { duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] },
  },
};

const streakGlow: Variants = {
  rest: { boxShadow: "0 0 0 0px rgba(34, 197, 94, 0)" },
  animate: {
    boxShadow: [
      "0 0 0 0px rgba(34, 197, 94, 0)",
      "0 0 16px 4px rgba(34, 197, 94, 0.35)",
      "0 0 0 0px rgba(34, 197, 94, 0)",
    ],
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function StreakAnimation({ children, trigger, ...props }: StreakAnimationProps) {
  const shouldAnimate = trigger !== undefined;

  return (
    <motion.div
      key={trigger}
      initial="rest"
      animate={shouldAnimate ? "animate" : "rest"}
      variants={streakBounce}
      {...props}
    >
      <motion.div
        initial="rest"
        animate={shouldAnimate ? "animate" : "rest"}
        variants={streakGlow}
        style={{ borderRadius: "0.25rem" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ============================================
   BUTTON HOVER/TAP ANIMATION
   ============================================ */

interface AnimatedButtonProps extends MotionProps {
  children: ReactNode;
  onClick?: () => void;
}

export function AnimatedButton({ children, onClick, ...props }: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200, damping: 17 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/* ============================================
   CARD ANIMATION (with stagger)
   ============================================ */

interface CardAnimationProps extends MotionProps {
  children: ReactNode;
  index?: number;
  staggerDelay?: number;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: index * 0.05,
    },
  }),
};

export function CardAnimation({
  children,
  index = 0,
  staggerDelay = 0.05,
  ...props
}: CardAnimationProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      custom={index}
      variants={cardVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ============================================
   CHART LINE ANIMATION
   ============================================ */

interface ChartLineAnimationProps extends MotionProps {
  children: ReactNode;
  duration?: number;
}

export function ChartLineAnimation({
  children,
  duration = 0.8,
  ...props
}: ChartLineAnimationProps) {
  return (
    <motion.div
      initial={{ strokeDashoffset: 1000 }}
      whileInView={{ strokeDashoffset: 0 }}
      transition={{ duration, ease: "easeInOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ============================================
   AI SUGGESTIONS ANIMATION
   ============================================ */

interface AISuggestionAnimationProps extends MotionProps {
  children: ReactNode;
  delay?: number;
}

const aiSuggestionVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export function AISuggestionAnimation({
  children,
  delay = 0,
  ...props
}: AISuggestionAnimationProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={aiSuggestionVariants}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ============================================
   EMPTY STATE FLOATING ANIMATION
   ============================================ */

interface FloatingIconProps extends MotionProps {
  children: ReactNode;
}

const floatingVariants: Variants = {
  animate: {
    y: [-0, -8, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export function FloatingIcon({ children, ...props }: FloatingIconProps) {
  return (
    <motion.div initial="rest" animate="animate" variants={floatingVariants} {...props}>
      {children}
    </motion.div>
  );
}

/* ============================================
   SUCCESS FEEDBACK RIPPLE
   ============================================ */

interface SuccessRippleProps extends MotionProps {
  children: ReactNode;
  trigger?: boolean;
}

const rippleVariants: Variants = {
  rest: { boxShadow: "0 0 0 0px rgba(16, 185, 129, 0.7)" },
  ripple: {
    boxShadow: "0 0 0 12px rgba(16, 185, 129, 0)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function SuccessRipple({ children, trigger = false, ...props }: SuccessRippleProps) {
  return (
    <motion.div
      initial="rest"
      animate={trigger ? "ripple" : "rest"}
      variants={rippleVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ============================================
   CONTAINER WITH CHILD STAGGER
   ============================================ */

interface StaggerContainerProps extends MotionProps {
  children: ReactNode;
  staggerDuration?: number;
  delayBetweenChildren?: number;
}

export function StaggerContainer({
  children,
  staggerDuration = 0.3,
  delayBetweenChildren = 0.05,
  ...props
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delayBetweenChildren,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: staggerDuration, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true }}
      {...props}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
