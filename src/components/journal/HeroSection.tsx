"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const nameOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const taglineY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Atmospheric noise texture overlay */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10">
        
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px"
          }} />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,hsl(240_5%_5%/0.8)_100%)]" />
      </motion.div>

      {/* Horizontal rule — top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-[18%] left-0 right-0 h-px bg-stone/25 origin-left" />
      

      {/* Main content */}
      <motion.div
        style={{ opacity: nameOpacity, y: taglineY }}
        className="text-center px-6 relative z-10">
        
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-inter text-[10px] uppercase tracking-[0.3em] text-stone mb-10">
          
          Journal · Music · Humanity
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.62, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="font-garamond display-xl leading-none mb-6 text-stone-200">
          Taaransh Kapoor
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="font-garamond text-xl md:text-2xl italic max-w-lg mx-auto text-yellow-400">
          
          documenting the era. the interviews, the feels, the artists nobody around me knows
        </motion.p>
      </motion.div>

      {/* Horizontal rule — bottom */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-[18%] left-0 right-0 h-px bg-stone/25 origin-right" />
      

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-neon to-transparent" />
      </motion.div>
    </section>
  );
}
