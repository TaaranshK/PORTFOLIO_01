"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [inMusicCorner, setInMusicCorner] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const throttleRef = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      // Throttle section check to every 100ms
      if (Date.now() - throttleRef.current > 100) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const inMusic = !!el?.closest("[data-section='music']");
        setInMusicCorner(inMusic);

        const isLink = !!el?.closest(
          "a, button, [data-cursor='pointer'], [role='button']"
        );
        setIsHovering(isLink);
        throttleRef.current = Date.now();
      }
    };

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${
          pos.current.x - 16
        }px, ${pos.current.y - 16}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${
          pos.current.x - 4
        }px, ${pos.current.y - 4}px, 0)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none w-8 h-8 rounded-full border border-neon transition-all duration-200 ${
          isHovering ? "scale-50 bg-neon" : "bg-neon/10"
        } ${inMusicCorner ? "animate-cursor-pulse" : ""}`}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
      />
      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 rounded-full bg-neon"
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
      />
    </>
  );
}
