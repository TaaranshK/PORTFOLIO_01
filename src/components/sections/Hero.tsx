import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { personal } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";

const socials = [
  { label: "GitHub", href: personal.github },
  { label: "LinkedIn", href: personal.linkedin },
  { label: "Email", href: `mailto:${personal.email}` },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden px-6 md:px-16 lg:px-24 pt-28 pb-12"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.12] animate-breathe"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
            top: "20%",
            left: "-10%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.08] animate-breathe-alt"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            bottom: "10%",
            right: "-5%",
          }}
        />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute h-full w-px bg-foreground"
              style={{ left: `${(i + 1) * 10}%` }}
            />
          ))}
        </div>
      </div>

      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="section-label"
      >
        {personal.title}
      </motion.div>

      {/* Main hero text */}
      <motion.div
        style={{ y: textY, opacity }}
        className="flex-1 flex flex-col justify-center relative z-10 mt-8 md:mt-0"
      >
        <div className="overflow-hidden">
          <motion.h1
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="font-display text-display-md md:text-display-xl font-light text-foreground leading-none break-words"
          >
            {personal.firstName.toUpperCase()}
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="font-display text-display-md md:text-display-xl font-light text-stroke leading-none break-words"
          >
            {personal.lastName.toUpperCase()}
          </motion.h1>
        </div>

        {/* Sub-description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl font-body text-foreground/60 text-base md:text-lg leading-relaxed"
        >
          {personal.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap gap-4 items-center"
        >
          <MagneticButton
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            variant="outline"
          >
            View Work
          </MagneticButton>
          <MagneticButton href={`mailto:${personal.email}`} variant="filled">
            Get In Touch
          </MagneticButton>
          <MagneticButton 
            href="https://drive.google.com/file/d/1XeVF-6_JWM1jCbMriH7zVt9ltDwTKxeo/view?usp=sharing" 
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="flex items-end justify-between relative z-10"
      >
        {/* Socials */}
        <ul className="flex flex-col gap-2">
          {socials.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
            >
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-custom text-xs text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wider"
              >
                {s.label} ↗
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-primary/60" />
          <span
            className="font-mono-custom text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
        </div>
      </motion.div>

      {/* Section number watermark */}
      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 font-display text-[20vw] font-bold text-foreground pointer-events-none select-none"
        style={{ opacity: 0.02, lineHeight: 1 }}
      >
        01
      </div>
    </section>
  );
}
