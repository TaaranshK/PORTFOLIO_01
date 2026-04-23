import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { personal } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { fadeUp, staggerContainer } from "@/lib/animations";

const socialLinks = [
  { label: "taaransh.kapoor@gmail.com", href: `mailto:${personal.email}` },
  { label: "LinkedIn ↗", href: personal.linkedin },
  { label: "GitHub ↗", href: personal.github },
];

export function Contact() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 md:px-16 lg:px-24 overflow-hidden text-center"
    >
      {/* Elaborate background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[700px] h-[700px] rounded-full animate-breathe"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            opacity: 0.07,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full animate-breathe-alt"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
            opacity: 0.1,
            top: "20%",
            left: "10%",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full animate-breathe"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary-dim)) 0%, transparent 70%)",
            opacity: 0.06,
            bottom: "10%",
            right: "5%",
          }}
        />
        {/* Radial lines */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-px bg-foreground opacity-[0.025]"
            style={{
              height: "50vmax",
              transformOrigin: "top center",
              transform: `translate(-50%, 0) rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </div>

      {/* Section label */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="relative z-10 flex flex-col items-center gap-10"
      >
        <motion.div variants={fadeUp} className="section-label">
          06 — Contact
        </motion.div>

        {/* Giant headline */}
        <div className="overflow-hidden">
          <motion.h2
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0)" },
              visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
            }}
            className="font-display text-display-md md:text-display-xl font-light text-foreground leading-none break-words"
          >
            LET'S BUILD
          </motion.h2>
        </div>
        <div className="overflow-hidden -mt-4">
          <motion.h2
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0)" },
              visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1, delay: 0.15, ease: [0.76, 0, 0.24, 1] } },
            }}
            className="font-display text-display-md md:text-display-xl font-light text-stroke-gold leading-none break-words"
          >
            SOMETHING
          </motion.h2>
        </div>
        <div className="overflow-hidden -mt-4">
          <motion.h2
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0)" },
              visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] } },
            }}
            className="font-display text-display-md md:text-display-xl font-light text-foreground leading-none break-words"
          >
            WORTH REMEMBERING.
          </motion.h2>
        </div>

        {/* CTA Button */}
        <motion.div variants={fadeUp} className="mt-6">
          <MagneticButton href={`mailto:${personal.email}`} variant="outline">
            Get In Touch
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.ul
          variants={staggerContainer}
          className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mt-4"
        >
          {socialLinks.map((s) => (
            <motion.li key={s.label} variants={fadeUp}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group font-body text-sm text-foreground/50 hover:text-foreground transition-colors duration-300"
              >
                {s.label}
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* Footer note */}
        <motion.p
          variants={fadeUp}
          className="font-mono-custom text-xs text-muted-foreground tracking-[0.2em] mt-16"
        >
          TAARANSH KAPOOR © 2025 · FULL STACK DEVELOPER & AI ENGINEER
        </motion.p>
      </motion.div>
    </section>
  );
}
