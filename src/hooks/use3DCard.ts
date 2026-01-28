import { useState, useRef, MouseEvent, useCallback } from 'react';

interface Use3DCardReturn {
  ref: React.RefObject<HTMLDivElement>;
  style: React.CSSProperties;
  onMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

export function use3DCard(intensity: number = 15): Use3DCardReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const rafId = useRef<number | null>(null);

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

     // Cancel any pending animation frame to prevent queuing
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    // Store mouse coordinates
    const clientX = e.clientX;
    const clientY = e.clientY;

    // Use RAF to batch layout reads and prevent forced reflow
    rafId.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = clientX - centerX;
      const mouseY = clientY - centerY;
      
      const rotateXValue = (mouseY / (rect.height / 2)) * -intensity;
      const rotateYValue = (mouseX / (rect.width / 2)) * intensity;

      setRotateX(rotateXValue);
      setRotateY(rotateYValue);
    });
  }, [intensity]);

  const onMouseLeave = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    setRotateX(0);
    setRotateY(0);
    }, []);

  const style: React.CSSProperties = {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    transition: 'transform 0.1s ease-out',
  };

  return { ref, style, onMouseMove, onMouseLeave };
}
