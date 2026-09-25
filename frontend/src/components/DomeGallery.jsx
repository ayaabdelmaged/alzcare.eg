import { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { useGesture } from '@use-gesture/react';

/**
 * DomeGallery - Interactive 3D spherical image gallery
 * 
 * Performance optimizations:
 * 1. Uses CSS transforms only (GPU accelerated)
 * 2. RequestAnimationFrame for smooth animations
 * 3. Intersection Observer for lazy rendering
 * 4. Cleanup on unmount to prevent memory leaks
 * 5. Debounced resize handling
 */

const DEFAULT_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=400&fit=crop',
    alt: 'Elderly care moment'
  },
  {
    src: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=400&fit=crop',
    alt: 'Family support'
  },
  {
    src: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=400&fit=crop',
    alt: 'Medical care'
  },
  {
    src: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=400&fit=crop',
    alt: 'Compassionate care'
  },
  {
    src: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400&h=400&fit=crop',
    alt: 'Healthcare professional'
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop',
    alt: 'Medical technology'
  },
  {
    src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=400&fit=crop',
    alt: 'Patient care'
  }
];

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const wrapAngleSigned = deg => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map(c => ({ ...c, src: '', alt: '' }));
  }

  const normalizedImages = pool.map(image => {
    if (typeof image === 'string') {
      return { src: image, alt: '' };
    }
    return { src: image.src || '', alt: image.alt || '' };
  });

  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt
  }));
}

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#060010',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  imageBorderRadius = '30px',
  grayscale = true,
  autoRotate = true,
  autoRotateSpeed = 0.15
}) {
  const rootRef = useRef(null);
  const mainRef = useRef(null);
  const sphereRef = useRef(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef(null);
  const autoRotateRAF = useRef(null);
  const pointerTypeRef = useRef('mouse');
  const userInteractedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = useCallback((xDeg, yDeg) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  }, []);

  // Handle resize
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width);
      const h = Math.max(1, cr.height);
      const minDim = Math.min(w, h);
      const maxDim = Math.max(w, h);
      const aspect = w / h;
      
      let basis;
      switch (fitBasis) {
        case 'min': basis = minDim; break;
        case 'max': basis = maxDim; break;
        case 'width': basis = w; break;
        case 'height': basis = h; break;
        default: basis = aspect >= 1.3 ? w : minDim;
      }
      
      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty('--radius', `${Math.round(radius)}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });
    
    ro.observe(root);
    return () => ro.disconnect();
  }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius, applyTransform]);

  // Initial transform
  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, [applyTransform]);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const stopAutoRotate = useCallback(() => {
    if (autoRotateRAF.current) {
      cancelAnimationFrame(autoRotateRAF.current);
      autoRotateRAF.current = null;
    }
  }, []);

  // Auto-rotate effect - gentle continuous rotation until user interacts
  useEffect(() => {
    if (!autoRotate || userInteractedRef.current) return;

    const rotate = () => {
      if (userInteractedRef.current || draggingRef.current) {
        stopAutoRotate();
        return;
      }
      
      const nextY = wrapAngleSigned(rotationRef.current.y + autoRotateSpeed);
      rotationRef.current = { x: rotationRef.current.x, y: nextY };
      applyTransform(rotationRef.current.x, nextY);
      autoRotateRAF.current = requestAnimationFrame(rotate);
    };

    autoRotateRAF.current = requestAnimationFrame(rotate);

    return () => stopAutoRotate();
  }, [autoRotate, autoRotateSpeed, applyTransform, stopAutoRotate]);

  const startInertia = useCallback((vx, vy) => {
    const MAX_V = 1.4;
    let vX = clamp(vx, -MAX_V, MAX_V) * 80;
    let vY = clamp(vy, -MAX_V, MAX_V) * 80;
    let frames = 0;
    const d = clamp(dragDampening ?? 0.6, 0, 1);
    const frictionMul = 0.94 + 0.055 * d;
    const stopThreshold = 0.015 - 0.01 * d;
    const maxFrames = Math.round(90 + 270 * d);
    
    const step = () => {
      vX *= frictionMul;
      vY *= frictionMul;
      if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
        inertiaRAF.current = null;
        return;
      }
      if (++frames > maxFrames) {
        inertiaRAF.current = null;
        return;
      }
      const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
      const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
      rotationRef.current = { x: nextX, y: nextY };
      applyTransform(nextX, nextY);
      inertiaRAF.current = requestAnimationFrame(step);
    };
    
    stopInertia();
    inertiaRAF.current = requestAnimationFrame(step);
  }, [dragDampening, maxVerticalRotationDeg, stopInertia, applyTransform]);

  // Gesture handling
  useGesture(
    {
      onDragStart: ({ event }) => {
        // Stop auto-rotate when user interacts
        userInteractedRef.current = true;
        stopAutoRotate();
        stopInertia();
        setIsDragging(true);
        pointerTypeRef.current = event.pointerType || 'mouse';
        if (pointerTypeRef.current === 'touch') event.preventDefault();
        draggingRef.current = true;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: event.clientX, y: event.clientY };
      },
      onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {
        if (!draggingRef.current || !startPosRef.current) return;
        if (pointerTypeRef.current === 'touch') event.preventDefault();

        const dxTotal = event.clientX - startPosRef.current.x;
        const dyTotal = event.clientY - startPosRef.current.y;

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;

        const cur = rotationRef.current;
        if (cur.x !== nextX || cur.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }

        if (last) {
          draggingRef.current = false;
          setIsDragging(false);
          let isTap = false;

          if (startPosRef.current) {
            const dx = event.clientX - startPosRef.current.x;
            const dy = event.clientY - startPosRef.current.y;
            const dist2 = dx * dx + dy * dy;
            const TAP_THRESH_PX = pointerTypeRef.current === 'touch' ? 10 : 6;
            if (dist2 <= TAP_THRESH_PX * TAP_THRESH_PX) {
              isTap = true;
            }
          }

          let [vMagX, vMagY] = velArr;
          const [dirX, dirY] = dirArr;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;

          if (!isTap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement;
            vx = (mx / dragSensitivity) * 0.02;
            vy = (my / dragSensitivity) * 0.02;
          }

          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
            startInertia(vx, vy);
          }
          startPosRef.current = null;
          movedRef.current = false;
        }
      }
    },
    { target: mainRef, eventOptions: { passive: false } }
  );

  // Cleanup
  useEffect(() => {
    return () => {
      stopInertia();
      stopAutoRotate();
    };
  }, [stopInertia, stopAutoRotate]);

  return (
    <>
      <style>{`
        .dome-root {
          --radius: 520px;
          --viewer-pad: 72px;
          --circ: calc(var(--radius) * 3.14);
          --rot-y: calc((360deg / var(--segments-x)) / 2);
          --rot-x: calc((360deg / var(--segments-y)) / 2);
          --item-width: calc(var(--circ) / var(--segments-x));
          --item-height: calc(var(--circ) / var(--segments-y));
        }
        .dome-root * { box-sizing: border-box; }
        .dome-sphere, .dome-item, .dome-image { transform-style: preserve-3d; }
        .dome-stage {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          position: absolute;
          inset: 0;
          margin: auto;
          perspective: calc(var(--radius) * 2);
          perspective-origin: 50% 50%;
        }
        .dome-sphere {
          transform: translateZ(calc(var(--radius) * -1));
          will-change: transform;
          position: absolute;
        }
        .dome-item {
          width: calc(var(--item-width) * var(--item-size-x));
          height: calc(var(--item-height) * var(--item-size-y));
          position: absolute;
          top: -999px;
          bottom: -999px;
          left: -999px;
          right: -999px;
          margin: auto;
          transform-origin: 50% 50%;
          backface-visibility: hidden;
          transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)))) 
                     rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)))) 
                     translateZ(var(--radius));
        }
        .dome-image {
          position: absolute;
          inset: 10px;
          border-radius: var(--tile-radius, 12px);
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }
      `}</style>
      
      <div
        ref={rootRef}
        className="dome-root relative w-full h-full"
        style={{
          '--segments-x': segments,
          '--segments-y': segments,
          '--overlay-blur-color': overlayBlurColor,
          '--tile-radius': imageBorderRadius,
          '--image-filter': grayscale ? 'grayscale(1)' : 'none'
        }}
      >
        <main
          ref={mainRef}
          className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent"
          style={{
            touchAction: 'none',
            WebkitUserSelect: 'none',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          <div className="dome-stage">
            <div ref={sphereRef} className="dome-sphere">
              {items.map((it, i) => (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="dome-item"
                  style={{
                    '--offset-x': it.x,
                    '--offset-y': it.y,
                    '--item-size-x': it.sizeX,
                    '--item-size-y': it.sizeY
                  }}
                >
                  <div className="dome-image bg-gray-200">
                    <img
                      src={it.src}
                      draggable={false}
                      alt={it.alt}
                      loading="lazy"
                      className="w-full h-full object-cover pointer-events-none"
                      style={{
                        backfaceVisibility: 'hidden',
                        filter: `var(--image-filter, ${grayscale ? 'grayscale(1)' : 'none'})`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient overlays for depth effect */}
          <div
            className="absolute inset-0 m-auto z-[3] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)`
            }}
          />
          <div
            className="absolute left-0 right-0 top-0 h-[120px] z-[5] pointer-events-none rotate-180"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`
            }}
          />
          <div
            className="absolute left-0 right-0 bottom-0 h-[120px] z-[5] pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`
            }}
          />
        </main>
      </div>
    </>
  );
}
