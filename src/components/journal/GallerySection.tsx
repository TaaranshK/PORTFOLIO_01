"use client";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import shimlaQuietEstate from "@/assets/shimla/shimla-quiet-estate.jpeg";

function SingleFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      ref={ref}
      onClick={() => navigate("/story/1?page=1")}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden stone-border group cursor-pointer h-[320px] md:h-[460px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="pointer"
    >
      <img
        src={shimlaQuietEstate}
        alt="The Quiet Estate"
        className="w-full h-full object-contain bg-ink opacity-75 group-hover:opacity-95 transition-all duration-700"
      />

      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0.92, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 flex flex-col justify-end p-5 md:p-7 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
      >
        <p className="font-inter text-[10px] tracking-widest uppercase text-neon mb-2">Part 01 - Begin</p>
        <h3 className="font-garamond text-2xl md:text-3xl text-paper mb-1">Letters, Light, and Late Nights</h3>
        <p className="font-inter text-sm text-paper/75 max-w-lg">One frame, seven pages, and a memory that still breathes.</p>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section id="gallery" className="section-pad">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-stone mb-4">05 - Moments</p>
          <h2 className="font-garamond display-md text-paper mb-3">Frames</h2>
          <p className="font-inter text-sm text-paper/40 max-w-sm">
            A single frame for your full journey. Open it and move through pages.
          </p>
        </motion.div>

        <SingleFrame />
      </div>
    </section>
  );
}
