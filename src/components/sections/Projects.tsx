import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { fadeUp, staggerContainer } from "@/lib/animations";

function useCountUp(target: string, active: boolean) {
  const [display, setDisplay] = useState("0");
  const started = useRef(false);

  if (active && !started.current) {
    started.current = true;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");
    if (!isNaN(num)) {
      const duration = 1500;
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * num);
        setDisplay(`${current}${suffix}`);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    } else {
      setDisplay(target);
    }
  }

  return display || target;
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
      className="relative group grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 p-8 md:p-12 bg-surface-alt border border-border rounded-sm hover:border-primary/30 transition-all duration-500"
      style={{
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s",
        boxShadow: hovered ? "0 20px 60px hsl(0 0% 0% / 0.4)" : "none",
      }}
    >
      {/* Shimmer on hover */}
      <motion.div
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 pointer-events-none rounded-sm overflow-hidden"
        style={{
          background: `linear-gradient(105deg, transparent 30%, ${project.accent}18 50%, transparent 70%)`,
        }}
      />

      {/* Project number watermark */}
      <div
        className="absolute right-6 top-4 font-display font-bold text-foreground pointer-events-none select-none"
        style={{ fontSize: "8rem", opacity: 0.04, lineHeight: 0.9 }}
      >
        {project.id}
      </div>

      {/* Left: Content */}
      <div className="flex flex-col justify-between relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono-custom text-xs text-primary/60 tracking-widest">{project.id}</span>
            <span className="font-mono-custom text-xs text-muted-foreground">/ {project.shortName}</span>
          </div>

          <h3
            className="font-display text-display-sm font-light text-foreground mb-4 leading-tight"
            style={{ whiteSpace: "pre-line" }}
          >
            {project.name}
          </h3>

          <p className="font-body text-foreground/55 text-sm leading-relaxed mb-6 max-w-md">
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono-custom text-xs px-3 py-1 rounded-full bg-background border border-border text-foreground/60"
                style={{ borderColor: hovered ? `${project.accent}60` : undefined }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <MagneticButton href={project.github} variant="outline">
            GitHub ↗
          </MagneticButton>
          {project.live && (
            <MagneticButton href={project.live} variant="filled">
              Live Demo ↗
            </MagneticButton>
          )}
        </div>
      </div>

      {/* Right: Metrics */}
      <div className="flex flex-col justify-center gap-6 relative z-10">
        {project.metrics.map((m, i) => (
          <MetricItem key={m.label} metric={m} active={inView} accent={project.accent} delay={i * 0.15} />
        ))}
      </div>
    </motion.div>
  );
}

function MetricItem({
  metric,
  active,
  accent,
  delay,
}: {
  metric: { value: string; label: string };
  active: boolean;
  accent: string;
  delay: number;
}) {
  const display = useCountUp(metric.value, active);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ duration: 0.7, delay: 0.4 + delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col border-l-2 pl-6"
      style={{ borderColor: `${accent}80` }}
    >
      <span className="font-display text-4xl md:text-5xl font-light" style={{ color: accent }}>
        {display}
      </span>
      <span className="font-mono-custom text-xs text-muted-foreground tracking-widest uppercase mt-1">
        {metric.label}
      </span>
    </motion.div>
  );
}

export function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="projects" className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Watermark */}
      <div
        className="absolute left-0 top-0 font-display font-bold text-foreground pointer-events-none select-none"
        style={{ fontSize: "28vw", opacity: 0.025, lineHeight: 0.9 }}
      >
        05
      </div>

      <div ref={ref} className="relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeUp} className="section-label mb-4">
            04 — Projects
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-display-md font-light text-foreground"
          >
            What I've Built
          </motion.h2>
        </motion.div>

        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
