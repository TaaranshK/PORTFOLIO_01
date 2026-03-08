import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { personal } from "@/data/portfolio";
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";
import taaranshPhoto from "@/assets/taaransh-moody.jpeg";

const stats = [
  { value: "8.5", label: "CGPA" },
  { value: "400+", label: "DSA Problems" },
  { value: "2", label: "Internships" },
  { value: "B.Tech", label: "CS Engineering" },
];

export function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" ref={ref} className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Background watermark */}
      <div
        className="absolute left-0 top-0 font-display font-bold text-foreground pointer-events-none select-none"
        style={{ fontSize: "28vw", opacity: 0.025, lineHeight: 0.9, top: "-2vw" }}
      >
        02
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-start">
        {/* Left Column */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-8"
        >
          <motion.div variants={fadeUp} className="section-label">
            01 — About
          </motion.div>

          <motion.h2
            variants={slideInLeft}
            className="font-display text-display-md font-light text-foreground leading-tight"
          >
            I build things that work.
            <br />
            <em className="text-primary not-italic">And things that feel.</em>
          </motion.h2>

          <motion.p variants={fadeUp} className="font-body text-foreground/60 text-lg leading-relaxed max-w-2xl">
            {personal.bio}
          </motion.p>

          <motion.p variants={fadeUp} className="font-body text-foreground/50 leading-relaxed max-w-2xl">
            Currently pursuing {personal.education.degree} at {personal.education.institution} ({personal.education.year}).
            I thrive at the intersection of elegant code and meaningful user experiences — whether that's a machine learning
            pipeline or a hand-crafted UI component.
          </motion.p>

          {/* Stat Pills */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap gap-3 mt-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-surface-alt"
              >
                <span className="font-display text-xl font-semibold text-primary">{stat.value}</span>
                <span className="font-mono-custom text-xs text-muted-foreground tracking-wider uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column — Portrait */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0">
            {/* Offset decorative frame — gold */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -20 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-4 -left-4 w-full h-full border border-primary/40 rounded-sm"
            />

            {/* Second offset frame — accent green */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-4 -right-4 w-full h-full border border-accent/30 rounded-sm"
            />

            {/* Photo */}
            <div className="relative w-full h-full rounded-sm overflow-hidden border border-border">
                <img
                  src={taaranshPhoto}
                  alt="Taaransh Kapoor"
                  className="w-full h-full object-cover object-center"
                  style={{ filter: "contrast(1.08) saturate(0.85)" }}
                />

              {/* Gradient overlay — blend into site background at bottom */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, transparent 50%, hsl(var(--background) / 0.7) 100%)",
                }}
              />

              {/* Subtle gold vignette corners */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 60px hsl(var(--primary) / 0.08)",
                }}
              />

              {/* Name tag bottom-left */}
              <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                <span className="font-display text-lg text-foreground/90 font-light">{personal.name}</span>
                <span className="font-mono-custom text-[10px] text-primary/80 tracking-widest uppercase">{personal.location}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
