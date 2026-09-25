import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * useScrollReveal - Intersection Observer hook for scroll-triggered animations
 * 
 * Benefits:
 * 1. Eliminates duplicate code across pages
 * 2. Proper cleanup to prevent memory leaks
 * 3. Configurable threshold and rootMargin
 * 4. Returns ref and visibility state
 * 
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for early/late triggering
 * @param {boolean} options.triggerOnce - Only trigger once (default: true)
 * @returns {[React.RefObject, boolean]} - [ref, isVisible]
 */
export const useScrollReveal = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
};

/**
 * useIntersectionObserver - More flexible version with callback
 * 
 * @param {Function} callback - Callback when intersection changes
 * @param {Object} options - IntersectionObserver options
 * @returns {React.RefObject} - ref to attach to element
 */
export const useIntersectionObserver = (callback, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    root = null,
  } = options;

  const ref = useRef(null);
  const callbackRef = useRef(callback);

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        callbackRef.current(entries);
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, root]);

  return ref;
};

export default useScrollReveal;
