import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { certifications, type CertificationIcon } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { ComponentType } from "react";
import type { IconProps } from "phosphor-react";
import {
  ChartBar,
  Database,
  Lightning,
  Medal,
  PuzzlePiece,
  Robot,
  TerminalWindow,
} from "phosphor-react";

type IconComponent = ComponentType<IconProps>;

const certificationIcons: Record<CertificationIcon, { Icon: IconComponent; className: string }> = {
  python: { Icon: TerminalWindow, className: "text-[#3776AB] group-hover:text-primary transition-colors" },
  database: { Icon: Database, className: "text-foreground/80 group-hover:text-primary transition-colors" },
  agile: { Icon: Lightning, className: "text-yellow-400 group-hover:text-yellow-300 transition-colors" },
  analytics: { Icon: ChartBar, className: "text-emerald-400 group-hover:text-emerald-300 transition-colors" },
  ml: { Icon: Robot, className: "text-sky-400 group-hover:text-sky-300 transition-colors" },
  dsa: { Icon: PuzzlePiece, className: "text-lime-400 group-hover:text-lime-300 transition-colors" },
};

function renderCertificationIcon(icon: CertificationIcon) {
  const iconSpec = certificationIcons[icon] ?? {
    Icon: Medal,
    className: "text-muted-foreground",
  };
  const Icon = iconSpec.Icon;

  return <Icon size={28} weight="duotone" className={iconSpec.className} aria-hidden="true" />;
}

const doubled = [...certifications, ...certifications];

export function Certifications() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="certifications"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-display font-bold text-foreground"
          style={{ fontSize: "18vw", opacity: 0.025, whiteSpace: "nowrap" }}
        >
          EARNED
        </span>
      </div>

      <div ref={ref} className="relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="px-6 md:px-16 lg:px-24 mb-16"
        >
          <motion.div variants={fadeUp} className="section-label mb-4">
            05 — Certifications
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-display-md font-light text-foreground"
          >
            What I've Earned
          </motion.h2>
        </motion.div>

        {/* Marquee row */}
        <div className="relative overflow-hidden py-4">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 animate-marquee" style={{ width: "max-content" }}>
            {doubled.map((cert, i) => (
              <motion.div
                key={`${cert.name}-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: (i % certifications.length) * 0.08 }}
                className="flex items-center gap-4 px-6 py-4 bg-surface-alt border border-border rounded-sm shrink-0 min-w-[260px] hover:border-primary/40 transition-colors duration-300 group"
              >
                <span className="shrink-0">
                  {renderCertificationIcon(cert.icon)}
                </span>
                <div className="flex flex-col">
                  <span className="font-body text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                    {cert.name}
                  </span>
                  <span className="font-mono-custom text-xs text-muted-foreground tracking-wider">
                    {cert.issuer}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section number */}
      <div
        className="absolute right-4 bottom-4 font-display font-bold text-foreground pointer-events-none select-none"
        style={{ fontSize: "22vw", opacity: 0.02, lineHeight: 0.9 }}
      >
        06
      </div>
    </section>
  );
}
