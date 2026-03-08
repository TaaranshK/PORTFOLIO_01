import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-background"
        >
          {/* Subtle lines */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-full bg-border"
                style={{ left: `${(i + 1) * (100 / 13)}%` }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-8xl font-light text-primary"
              style={{ letterSpacing: "0.15em" }}
            >
              TK
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="h-px w-32 bg-primary origin-left"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-mono-custom text-xs tracking-[0.3em] text-foreground-secondary uppercase"
            >
              Taaransh Kapoor
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
