import { useRef, useState, useCallback } from "react";

export const useSpotlightBorder = <T extends HTMLElement>() => {
  const inputRef = useRef<T>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!inputRef.current) return;

      const rect = inputRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setPosition({ x, y });
    },
    []
  );

  const handleFocus = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleBlur = useCallback(() => {
    setOpacity(0);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return {
    inputRef,
    position,
    opacity,
    handleMouseMove,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
  };
}; 