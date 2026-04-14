import { useEffect, useState, useRef, useCallback } from "react";

/**
 * Hook to trigger animations on element load
 * Useful for page transitions and initial renders
 */
export function useInViewAnimation(triggerOnLoad = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!triggerOnLoad);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return { ref, isVisible };
}

/**
 * Hook to animate on user interaction (click, touch)
 * Returns animate state and toggle function
 */
export function useInteractionAnimation(resetDelay = 300) {
  const [animate, setAnimate] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const trigger = useCallback(() => {
    setAnimate(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setAnimate(false);
    }, resetDelay);
  }, [resetDelay]);

  const reset = useCallback(() => {
    setAnimate(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return { animate, trigger, reset };
}

/**
 * Hook for counting up animations
 * Animates a number from start to end
 */
export function useCountUp(end: number, duration = 600, shouldStart = true) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, shouldStart]);

  return count;
}

/**
 * Hook to add haptic feedback (vibration)
 * Works on devices that support the Vibration API
 */
export function useHapticFeedback() {
  const trigger = useCallback((pattern: number | number[] = 10) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  return { trigger };
}

/**
 * Hook to detect if element is in viewport and trigger animations
 */
export function useElementInViewport() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentElement = ref.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return { ref, isInView };
}

/**
 * Hook for scroll-triggered animations
 * Returns animation state based on scroll position
 */
export function useScrollTrigger(threshold = 0.5) {
  const [isTriggered, setIsTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentElement = ref.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTriggered(true);
        }
      },
      { threshold }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [threshold]);

  return { ref, isTriggered };
}

/**
 * Hook for stagger animation delays
 * Generates delay values for list items
 */
export function useStaggerDelays(itemCount: number, delayInterval = 50) {
  return Array.from({ length: itemCount }, (_, i) => i * delayInterval);
}

/**
 * Hook for smooth page transitions
 */
export function usePageTransition() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return { isLoading };
}

/**
 * Hook to add touch/mouse feedback
 * Useful for creating micro-interactions on tap
 */
export function useTapFeedback(onTap?: () => void) {
  const [isTapped, setIsTapped] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleTap = useCallback(() => {
    setIsTapped(true);
    onTap?.();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsTapped(false);
    }, 200);
  }, [onTap]);

  return { isTapped, handleTap };
}
