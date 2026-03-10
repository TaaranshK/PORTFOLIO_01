import Navigation from "@/components/journal/Navigation";
import HeroSection from "@/components/journal/HeroSection";
import InterviewChronicle from "@/components/journal/InterviewChronicle";
import MusicCorner from "@/components/journal/MusicCorner";
import GallerySection from "@/components/journal/GallerySection";
import Footer from "@/components/journal/Footer";
import CustomCursor from "@/components/journal/CustomCursor";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function PageTransitionOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="overlay"
          initial={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{ originY: 0 }}
          className="fixed inset-0 z-[9000] bg-ink pointer-events-none flex items-end justify-center pb-12"
        >
          <motion.p
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-garamond text-2xl italic text-paper/30"
          >
            stillwater
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Section divider — faint full-bleed line
function Divider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-stone/25 to-transparent" />
  );
}

const Journal = () => {
  return (
    <>
      <PageTransitionOverlay />
      <CustomCursor />
      <Navigation />

      <main>
        <HeroSection />
        <Divider />
        <InterviewChronicle />
        <Divider />
        <MusicCorner />
        <Divider />
        <GallerySection />
      </main>

      <Footer />
    </>
  );
};

export default Journal;
