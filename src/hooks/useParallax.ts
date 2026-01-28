import { useEffect, useState, useRef, RefObject, useCallback } from 'react';

export function useParallax(speed: number = 0.5): { ref: RefObject<HTMLDivElement>; offset: number } {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const rafId = useRef<number | null>(null);
  const ticking = useRef(false);

  const updateOffset = useCallback(() => {
    if (!ref.current) {
      ticking.current = false;
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how far the element is from the center of the viewport
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;
    
    // Apply parallax effect
    const parallaxOffset = distanceFromCenter * speed * -1;
    setOffset(parallaxOffset);
    ticking.current = false;
  }, [speed]);

  useEffect(() => {
    const handleScroll = () => {
      // Prevent multiple RAF calls - reduces forced reflows
      if (!ticking.current) {
        ticking.current = true;
        rafId.current = requestAnimationFrame(updateOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation with RAF
    rafId.current = requestAnimationFrame(updateOffset);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updateOffset]);

  return { ref, offset };
}
