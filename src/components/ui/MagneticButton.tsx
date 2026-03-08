import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "outline" | "filled";
}

export function MagneticButton({ children, className = "", onClick, href, variant = "outline" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const baseClass =
    variant === "filled"
      ? "relative overflow-hidden px-8 py-4 rounded-full font-body text-sm tracking-widest uppercase transition-all duration-400"
      : "relative overflow-hidden px-8 py-4 rounded-full border font-body text-sm tracking-widest uppercase transition-all duration-400";

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="inline-block"
    >
      <Tag
        href={href}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        onClick={onClick}
        className={`${baseClass} ${
          variant === "outline"
            ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            : "bg-primary text-primary-foreground hover:bg-primary-dim"
        } ${className}`}
      >
        {/* Shimmer overlay */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.2) 50%, transparent 60%)",
            backgroundSize: "200% auto",
          }}
        />
        <span className="relative z-10">{children}</span>
      </Tag>
    </motion.div>
  );
}
