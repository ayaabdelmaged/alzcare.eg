import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

/**
 * StaggeredMenu - High-performance mobile menu with GSAP animations
 * 
 * Performance optimizations:
 * 1. Only animates transform (x, y, rotate) and opacity - GPU accelerated
 * 2. Uses single timeline for coordinated animations
 * 3. Kills animations on unmount to prevent memory leaks
 * 4. Uses will-change sparingly and removes after animation
 * 5. Staggered animations instead of individual tweens
 * 6. Hardware acceleration via translateZ(0)
 */

// Animation constants - avoid magic numbers
const ANIMATION_CONFIG = {
  // Durations in seconds
  DURATION: {
    OVERLAY: 0.35,
    PANEL: 0.5,
    ITEMS: 0.5,
    CLOSE: 0.4,
  },
  // Easing functions
  EASE: {
    OPEN: 'power3.out',
    CLOSE: 'power3.in',
    ITEMS: 'power2.out',
  },
  // Stagger timing
  STAGGER: {
    ITEMS_IN: 0.06,
    ITEMS_OUT: 0.03,
  },
  // Delays
  DELAY: {
    ITEMS: 0.15,
  },
};

export const StaggeredMenu = ({
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  isFixed = false,
  accentColor = '#7C3AED',
  closeOnClickAway = true,
  onMenuClose,
  isOpen = false,
  onToggle,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  
  // Refs for DOM elements
  const containerRef = useRef(null);
  const panelRef = useRef(null);
  const overlayRef = useRef(null);
  const itemsRef = useRef([]);
  
  // Ref for timeline - allows killing on cleanup
  const timelineRef = useRef(null);

  // Cleanup function to kill active animations
  const killAnimations = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
  }, []);

  // Handle component mounting based on isOpen state
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  // Toggle body class for pausing heavy background animations
  // This prevents jank by reducing GPU workload during sidebar animation
  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      body.classList.add('sidebar-open');
      // Prevent body scroll when menu is open
      body.style.overflow = 'hidden';
    } else {
      body.classList.remove('sidebar-open');
      body.style.overflow = '';
    }

    // Cleanup to prevent memory leaks and stale classes
    return () => {
      body.classList.remove('sidebar-open');
      body.style.overflow = '';
    };
  }, [isOpen]);

  // Main animation effect
  useEffect(() => {
    if (!shouldRender) return;
    
    // Wait for next frame to ensure DOM is ready
    const frameId = requestAnimationFrame(() => {
      const panel = panelRef.current;
      const overlay = overlayRef.current;
      const menuItems = itemsRef.current.filter(Boolean);

      if (!panel || !overlay) return;

      // Kill any existing animations before starting new ones
      killAnimations();

      // Create new timeline
      const tl = gsap.timeline({
        defaults: {
          // Force GPU acceleration
          force3D: true,
        },
      });

      timelineRef.current = tl;

      if (isOpen) {
        // === OPENING ANIMATION ===
        // Set initial states (using transforms only)
        gsap.set(panel, { x: '100%' });
        gsap.set(overlay, { opacity: 0 });
        if (menuItems.length > 0) {
          gsap.set(menuItems, { y: 50, opacity: 0 });
        }

        // Build opening timeline
        tl
          // Overlay fade in
          .to(overlay, {
            opacity: 1,
            duration: ANIMATION_CONFIG.DURATION.OVERLAY,
            ease: ANIMATION_CONFIG.EASE.OPEN,
          })
          // Panel slides in (using x transform, not left)
          .to(panel, {
            x: '0%',
            duration: ANIMATION_CONFIG.DURATION.PANEL,
            ease: ANIMATION_CONFIG.EASE.OPEN,
          }, '<0.1') // Slight overlap for smoothness
          // Items stagger in (using y transform and opacity only)
          .to(menuItems, {
            y: 0,
            opacity: 1,
            duration: ANIMATION_CONFIG.DURATION.ITEMS,
            ease: ANIMATION_CONFIG.EASE.ITEMS,
            stagger: ANIMATION_CONFIG.STAGGER.ITEMS_IN,
          }, `-=${ANIMATION_CONFIG.DURATION.PANEL * 0.5}`);

      } else {
        // === CLOSING ANIMATION ===
        tl
          // Items stagger out first (reverse order for visual appeal)
          .to(menuItems, {
            y: 30,
            opacity: 0,
            duration: ANIMATION_CONFIG.DURATION.CLOSE * 0.6,
            ease: ANIMATION_CONFIG.EASE.CLOSE,
            stagger: {
              each: ANIMATION_CONFIG.STAGGER.ITEMS_OUT,
              from: 'end', // Reverse stagger
            },
          })
          // Panel slides out
          .to(panel, {
            x: '100%',
            duration: ANIMATION_CONFIG.DURATION.CLOSE,
            ease: ANIMATION_CONFIG.EASE.CLOSE,
          }, '<0.1')
          // Overlay fades out
          .to(overlay, {
            opacity: 0,
            duration: ANIMATION_CONFIG.DURATION.CLOSE,
            ease: ANIMATION_CONFIG.EASE.CLOSE,
          }, '<')
          // Unmount after animation completes
          .call(() => {
            setShouldRender(false);
          });
      }
    });

    // Cleanup on unmount or when dependencies change
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isOpen, shouldRender, killAnimations]);

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      killAnimations();
    };
  }, [killAnimations]);

  // Handle click outside to close menu
  useEffect(() => {
    if (!closeOnClickAway || !isOpen) return;

    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        handleClose();
      }
    };

    // Delay listener to prevent immediate close on open click
    const timerId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timerId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, isOpen]);

  // Close handler
  const handleClose = useCallback(() => {
    onMenuClose?.();
    onToggle?.(false);
  }, [onMenuClose, onToggle]);

  // Don't render if not needed
  if (!shouldRender) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`staggered-menu ${isFixed ? 'fixed inset-0 z-[10000]' : 'absolute inset-0'}`}
      // Prevent body scroll when menu is open
      style={{ touchAction: 'none' }}
    >
      {/* Overlay - uses opacity only for animation (GPU accelerated) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={handleClose}
        style={{ 
          opacity: 0,
          // GPU acceleration for smooth opacity transitions
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
        aria-hidden="true"
      />

      {/* Panel - uses transform: translateX only for GPU acceleration */}
      <aside
        ref={panelRef}
        className="absolute top-0 right-0 h-full w-full sm:w-[85%] md:w-[70%] max-w-md bg-[#0a0118] shadow-2xl shadow-purple-500/20 flex flex-col border-l border-purple-500/20"
        style={{
          // GPU-accelerated transform - no left/right/width/margin
          transform: 'translateX(100%) translateZ(0)',
          backfaceVisibility: 'hidden',
          // Hide scrollbar
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-3 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-xl transition-colors z-10"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Content Area */}
        <div 
          className="flex-1 flex flex-col pt-20 pb-8 px-8 overflow-y-auto"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Logo & Brand Name */}
          <div className="mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54"/>
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent">ALZCare.eg</h2>
                <p className="text-xs text-gray-400">AI-Powered Alzheimer's Care</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1" role="navigation">
            <ul className="space-y-1">
              {items.map((item, idx) => (
                <li
                  key={item.label + idx}
                  ref={(el) => (itemsRef.current[idx] = el)}
                  // Initial state for animation
                  style={{ opacity: 0, transform: 'translateY(50px)' }}
                >
                  <Link
                    to={item.link}
                    onClick={handleClose}
                    className="group flex items-center gap-4 py-3 text-white hover:text-purple-400 transition-colors"
                  >
                    {displayItemNumbering && (
                      <span
                        className="text-sm font-medium opacity-40 group-hover:opacity-100 transition-opacity text-purple-400"
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    )}
                    <span className="text-3xl sm:text-4xl font-bold uppercase tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          {displaySocials && socialItems.length > 0 && (
            <div
              ref={(el) => (itemsRef.current[items.length] = el)}
              className="mt-auto pt-8 border-t border-white/10"
              style={{ opacity: 0, transform: 'translateY(50px)' }}
            >
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-4 text-purple-400"
              >
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialItems.map((social, idx) => (
                  <a
                    key={social.label + idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 font-medium transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Auth Buttons */}
          <div
            ref={(el) => (itemsRef.current[items.length + 1] = el)}
            className="mt-8 space-y-3"
            style={{ opacity: 0, transform: 'translateY(50px)' }}
          >
            <Link
              to="/auth/login"
              onClick={handleClose}
              className="block w-full py-4 text-center text-purple-400 font-semibold text-lg border-2 border-purple-500/30 rounded-2xl hover:bg-purple-500/10 hover:border-purple-500/50 transition-all"
            >
              Sign In
            </Link>
            <Link
              to="/auth/signup"
              onClick={handleClose}
              className="block w-full py-4 text-center text-white font-semibold text-lg bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </aside>

      {/* Hide scrollbar for webkit browsers */}
      <style>{`
        .staggered-menu aside::-webkit-scrollbar,
        .staggered-menu aside > div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
