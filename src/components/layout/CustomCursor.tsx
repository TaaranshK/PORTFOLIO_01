"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const springConfig = { stiffness: 500, damping: 32 };
  const outerSpringConfig = { stiffness: 150, damping: 18 };

  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const outerSpringX = useSpring(cursorX, outerSpringConfig);
  const outerSpringY = useSpring(cursorY, outerSpringConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover"
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed z-[99999] rounded-full"
        style={{
          width: hovered ? 0 : 8,
          height: hovered ? 0 : 8,
          backgroundColor: "hsl(var(--primary))",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          transition: "width 0.2s, height 0.2s",
        }}
      />
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed z-[99998] rounded-full flex items-center justify-center"
        style={{
          width: hovered ? 72 : 40,
          height: hovered ? 72 : 40,
          border: `1px solid hsl(var(--primary) / ${hovered ? 0.9 : 0.5})`,
          backgroundColor: hovered ? "hsl(var(--primary) / 0.12)" : "transparent",
          x: outerSpringX,
          y: outerSpringY,
          translateX: "-50%",
          translateY: "-50%",
          transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), background-color 0.3s",
        }}
      >
        {hovered && (
          <span
            className="font-mono-custom text-primary"
            style={{ fontSize: "8px", letterSpacing: "0.1em", opacity: 0.9 }}
          >
            VIEW
          </span>
        )}
      </motion.div>
    </>
  );
}
