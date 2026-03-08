import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experience } from "@/data/portfolio";
import { fadeUp, slideInRight, staggerContainer } from "@/lib/animations";

function ExperienceCard({ exp, index }: { exp: typeof experience[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="relative pl-12 md:pl-20"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-3 flex items-center justify-center">
        <div className="relative">
          {/* Pulse ring */}
          {inView && (
            <div className="absolute inset-0 rounded-full border border-primary animate-pulse-ring" />
          )}
          <div className="w-3 h-3 rounded-full bg-primary relative z-10" />
        </div>
      </div>

      {/* Card */}
      <motion.div
        variants={slideInRight}
        className="bg-surface-alt border border-border rounded-sm p-8 hover:border-primary/30 transition-colors duration-500"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono-custom text-xs text-primary/60 tracking-widest">
                {exp.id}
              </span>
              <span className="font-mono-custom text-xs text-muted-foreground px-2 py-0.5 border border-border rounded-full">
                {exp.type}
              </span>
            </div>
            <h3 className="font-display text-display-sm font-light text-foreground">
              {exp.role}
            </h3>
            <p className="font-body text-primary mt-1 text-lg">{exp.company}</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
            <span className="font-mono-custom text-sm text-foreground/60">{exp.duration}</span>
            <span className="font-mono-custom text-xs text-muted-foreground">{exp.location}</span>
          </div>
        </div>

        {/* Bullets */}
        <motion.ul
          variants={staggerContainer}
          className="flex flex-col gap-3 mb-6"
        >
          {exp.bullets.map((bullet, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="flex items-start gap-3 font-body text-foreground/60 text-sm leading-relaxed"
            >
              <span className="text-primary mt-1 shrink-0">→</span>
              {bullet}
            </motion.li>
          ))}
        </motion.ul>

        {/* Tech Pills */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="font-mono-custom text-xs px-3 py-1 rounded-full bg-background border border-border text-foreground/60"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="experience"
      className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Watermark */}
      <div
        className="absolute right-0 top-0 font-display font-bold text-foreground pointer-events-none select-none"
        style={{ fontSize: "28vw", opacity: 0.025, lineHeight: 0.9 }}
      >
        04
      </div>

      <div ref={ref} className="relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeUp} className="section-label mb-4">
            03 — Experience
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-display-md font-light text-foreground"
          >
            Where I've Built
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="absolute left-[5px] md:left-[9px] top-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent origin-top"
            style={{ height: "100%" }}
          />

          <div className="flex flex-col gap-12">
            {experience.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
