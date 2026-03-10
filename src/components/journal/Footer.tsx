"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="border-t border-stone/20 py-10 px-6 md:px-12"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-garamond text-lg italic text-paper/30">
          stillwater
        </p>
        <p className="font-inter text-[10px] tracking-widest uppercase text-stone">
          Built in the hours between midnight and honesty
        </p>
        <p className="font-inter text-[10px] text-stone/50">
          © {new Date().getFullYear()}
        </p>
      </div>
    </motion.footer>
  );
}
