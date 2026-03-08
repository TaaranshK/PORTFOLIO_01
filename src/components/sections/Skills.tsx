import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

const tagFloatDurations = [4, 5, 6, 7, 5.5, 4.5, 6.5, 7.5, 5, 6];

export function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Diagonal texture lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-full bg-foreground opacity-[0.02]"
            style={{
              left: `${i * 14}%`,
              transform: "rotate(15deg) scaleY(2)",
              transformOrigin: "top",
            }}
          />
        ))}
      </div>

      {/* Watermark heading */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-display font-bold text-foreground"
          style={{ fontSize: "20vw", opacity: 0.025, whiteSpace: "nowrap" }}
        >
          WHAT I SPEAK
        </span>
      </div>

      <div className="relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="section-label mb-4">
            02 — Skills
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-display-md font-light text-foreground"
          >
            What I Speak
          </motion.h2>
        </motion.div>

        {/* Category groups */}
        <div className="flex flex-col gap-12">
          {Object.entries(skills).map(([category, items], catIdx) => (
            <motion.div
              key={category}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="flex flex-col gap-4"
            >
              <motion.span
                variants={fadeUp}
                className="font-mono-custom text-xs text-primary/60 tracking-[0.25em] uppercase"
              >
                {category}
              </motion.span>

              <div className="flex flex-wrap gap-3">
                {items.map((skill, i) => {
                  const floatDuration = tagFloatDurations[(i + catIdx) % tagFloatDurations.length];
                  return (
                    <motion.div
                      key={skill}
                      variants={{
                        hidden: { scale: 0, opacity: 0 },
                        visible: {
                          scale: 1,
                          opacity: 1,
                          transition: {
                            duration: 0.5,
                            delay: i * 0.05,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        },
                      }}
                      animate={inView ? {
                        y: [0, -4, 0],
                        transition: {
                          duration: floatDuration,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.3,
                        }
                      } : {}}
                      whileHover={{
                        y: -6,
                        borderColor: "hsl(var(--primary))",
                        transition: { duration: 0.2 },
                      }}
                      className="px-4 py-2 rounded-full border border-border bg-surface-alt font-mono-custom text-xs text-foreground/70 hover:text-foreground transition-colors duration-300"
                    >
                      {skill}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section number */}
      <div
        className="absolute right-4 bottom-8 font-display font-bold text-foreground pointer-events-none select-none"
        style={{ fontSize: "22vw", opacity: 0.02, lineHeight: 0.9 }}
      >
        03
      </div>
    </section>
  );
}
