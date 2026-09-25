import React, { useRef, useState, useEffect, memo } from 'react';

/**
 * AnimatedCounter - Animates number counting with intersection observer
 * 
 * Performance optimizations:
 * 1. Memoized to prevent unnecessary re-renders
 * 2. Uses requestAnimationFrame for smooth 60fps animation
 * 3. Proper cleanup on unmount
 * 4. Intersection observer prevents animation until visible
 * 
 * @param {number} target - Target number to count to
 * @param {string} suffix - Suffix to append (e.g., '+', '%')
 * @param {string} prefix - Prefix to prepend (e.g., '$')
 * @param {number} duration - Animation duration in ms
 * @param {string} className - Additional CSS classes
 */
const AnimatedCounter = memo(({ 
  target, 
  suffix = '', 
  prefix = '',
  duration = 2000,
  className = '',
  formatNumber = true,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimatedRef = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          
          const startTime = performance.now();
          
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            setCount(Math.floor(easeOut * target));
            
            if (progress < 1) {
              rafRef.current = requestAnimationFrame(animate);
            }
          };
          
          rafRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration]);

  const displayValue = formatNumber ? count.toLocaleString() : count;

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
});

AnimatedCounter.displayName = 'AnimatedCounter';

export default AnimatedCounter;
