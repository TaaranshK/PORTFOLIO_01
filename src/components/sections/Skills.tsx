import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { projects } from "@/data/portfolio";

type JourneyPoint = {
  year: string;
  label: string;
  sub: string;
  current?: boolean;
};

type SkillRow = {
  name: string;
  score: number;
  tool: string;
  accent?: boolean;
  problemsSolved: number; // Realistic problems solved in this skill
};

const JOURNEY: JourneyPoint[] = [
  { year: "2022", label: "JAIPUR", sub: "26.9124° N 75.7873° E" },
  { year: "2025", label: "VIRTUAL", sub: "Infosys Springboard" },
  { year: "2025", label: "GURUGRAM", sub: "28.4595° N 77.0266° E" },
  { year: "2026", label: "JAIPUR", sub: "26.9124° N 75.7873° E", current: true },
];

// Problems solved during each journey period
const JOURNEY_STATS = [
  { year: "2022", label: "JAIPUR", problems: 75, description: "Learning & Foundation" }, // Starting phase
  { year: "2025", label: "VIRTUAL", problems: 168, description: "Data Science & AI" }, // Infosys - FitPulse focus
  { year: "2025", label: "GURUGRAM", problems: 124, description: "Full Stack Development" }, // Tata - CRM platform
  { year: "2026", label: "JAIPUR", problems: 33, description: "Current & Ongoing" }, // DSTP - Current role
];

// Realistic skill metrics based on actual projects and experience
const SKILLS: SkillRow[] = [
  { name: "Web Development", score: 85, tool: "React.js / Next.js", problemsSolved: 95 },
  { name: "Full Stack Dev", score: 82, tool: "Spring Boot / Django", problemsSolved: 88 },
  { name: "Website Design", score: 80, tool: "Figma / Tailwind", problemsSolved: 75 },
  { name: "UI / UX", score: 78, tool: "Figma", problemsSolved: 70 },
  { name: "AI Integration", score: 78, tool: "LangChain / OpenAI", accent: true, problemsSolved: 65 },
  { name: "Gen AI / LLMs", score: 75, tool: "Hugging Face", problemsSolved: 60 },
  { name: "Machine Learning", score: 72, tool: "Scikit-learn", accent: true, problemsSolved: 58 },
  { name: "Data Visualization", score: 70, tool: "Plotly / Streamlit", problemsSolved: 48 },
  { name: "Platform Arch. Design", score: 68, tool: "Docker / AWS", problemsSolved: 52 },
  { name: "Graphic Design", score: 65, tool: "Photoshop / Canva", problemsSolved: 42 },
  { name: "App Development", score: 65, tool: "Android Studio", problemsSolved: 45 },
  { name: "Brand Identity", score: 62, tool: "Figma", problemsSolved: 38 },
  { name: "WordPress", score: 60, tool: "WordPress", accent: true, problemsSolved: 35 },
];

function arcPt(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

const MILE_ANGLES = [180, 130, 50, 8] as const;
const CX = 170;
const CY = 215;
const R = 148;
const ARC_LEN = Math.PI * R;
const TOTAL_PROBLEMS = 400;

const arcStart = arcPt(CX, CY, R, 180);
const arcEnd = arcPt(CX, CY, R, 0);
const ARC_PATH = `M ${arcStart.x},${arcStart.y} A ${R},${R} 0 0,1 ${arcEnd.x},${arcEnd.y}`;

const MILESTONES = JOURNEY.map((j, i) => ({
  ...j,
  ...arcPt(CX, CY, R, MILE_ANGLES[i] ?? 0),
}));

const AVG_SCORE_RAW = Math.round(SKILLS.reduce((sum, s) => sum + s.score, 0) / SKILLS.length);
const AVG_SCORE = Math.max(0, Math.min(100, AVG_SCORE_RAW));

function useCountUpNumber(target: number, active: boolean, durationMs = 1200) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTargetRef = useRef(target);

  useEffect(() => {
    if (!active) return;

    const start = Date.now();
    const startValue = value;
    
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (target - startValue) * eased);
      setValue(current);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    lastTargetRef.current = target;
    
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, durationMs, target, value]);

  return value;
}

export function Skills() {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });
  const [hovered, setHovered] = useState<number | null>(null);
  const [journeyHovered, setJourneyHovered] = useState<number | null>(null);
  
  // Priority: journey hover > skill hover > default
  const currentJourney = journeyHovered !== null ? JOURNEY_STATS[journeyHovered] : null;
  const currentSkill = journeyHovered === null && hovered !== null ? SKILLS[hovered] : null;
  
  const countTarget = currentJourney 
    ? currentJourney.problems 
    : currentSkill 
    ? currentSkill.problemsSolved 
    : TOTAL_PROBLEMS;
    
  const arcFillPercent = (countTarget / TOTAL_PROBLEMS) * 100;
  
  const count = useCountUpNumber(countTarget, inView, 600);

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
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-display font-bold text-foreground"
          style={{ fontSize: "20vw", opacity: 0.02, whiteSpace: "nowrap" }}
        >
          TRAJECTORY
        </span>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="section-label mb-4">
            02 — Skills
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <motion.h2
              variants={fadeUp}
              className="font-display text-display-md font-light text-foreground leading-[1.03]"
            >
              Trajectory &amp;
              <br className="hidden sm:block" />
              Tooling
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-body text-foreground/60 text-sm md:text-base leading-relaxed pt-2"
            >
              A snapshot of my evolving expertise across internships, university projects, and
              independent builds — balancing engineering precision with design sensibility.
            </motion.p>
          </div>
        </motion.div>

        {/* Two-panel grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* LEFT: Arc journey */}
          <motion.div
            variants={fadeUp}
            className="bg-surface-alt border border-border rounded-sm p-8 md:p-10"
          >
            <div className="flex items-center gap-2 font-mono-custom text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="text-muted-foreground"
                aria-hidden="true"
              >
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                <line
                  x1="6"
                  y1="2.5"
                  x2="6"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <line
                  x1="6"
                  y1="6"
                  x2="9"
                  y2="7.5"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              DEV TIME &amp; LOCATION
            </div>

            <svg
              width="100%"
              viewBox={`0 0 340 ${CY + 40}`}
              className="block mt-4 overflow-visible"
            >
              <defs>
                <linearGradient
                  id="skills-traj-grad"
                  gradientUnits="userSpaceOnUse"
                  x1={arcStart.x}
                  y1={arcStart.y}
                  x2={arcEnd.x}
                  y2={arcEnd.y}
                >
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="60%" stopColor="hsl(var(--accent-bright))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>

              <path
                d={ARC_PATH}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="20"
                strokeLinecap="round"
                opacity={0.9}
              />

              <path
                d={ARC_PATH}
                fill="none"
                stroke="url(#skills-traj-grad)"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={ARC_LEN}
                strokeDashoffset={inView ? ARC_LEN * (1 - arcFillPercent / 100) : ARC_LEN}
                style={{
                  transition: "stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />

              {MILESTONES.map((m, i) => (
                <g key={`${m.year}-${i}`}>
                  {m.current && (
                    <circle
                      cx={m.x}
                      cy={m.y}
                      r="10"
                      fill="none"
                      stroke="hsl(var(--accent-bright))"
                      strokeWidth="1.2"
                      opacity="0.7"
                    >
                      {inView && (
                        <>
                          <animate
                            attributeName="r"
                            values="10;20"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.7;0"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </>
                      )}
                    </circle>
                  )}
                  <circle
                    cx={m.x}
                    cy={m.y}
                    r={m.current ? 7 : 5}
                    fill={m.current ? "hsl(var(--accent-bright))" : "hsl(var(--foreground))"}
                    opacity={m.current ? 1 : 0.9}
                    style={{ transition: "r 200ms ease, opacity 200ms ease" }}
                  />
                </g>
              ))}

              <text
                x={CX}
                y={CY - 14}
                textAnchor="middle"
                className="font-display"
                fill="hsl(var(--foreground))"
                fontSize="40"
                fontWeight="300"
              >
                {count}+
              </text>
              <text
                x={CX}
                y={CY + 12}
                textAnchor="middle"
                className="font-mono-custom"
                fill={journeyHovered !== null ? "hsl(var(--accent-bright))" : hovered !== null ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                fontSize="11"
                letterSpacing="2"
                style={{ transition: "fill 300ms ease" }}
              >
                {journeyHovered !== null 
                  ? JOURNEY_STATS[journeyHovered].description.toUpperCase() 
                  : hovered !== null 
                  ? SKILLS[hovered].name.toUpperCase() 
                  : "TOTAL PROBLEMS"}
              </text>
            </svg>

            <div className="grid grid-cols-4 mt-6 pt-6 border-t border-border/60">
              {JOURNEY.map((j, i) => (
                <div
                  key={`${j.year}-${j.label}`}
                  onMouseEnter={() => setJourneyHovered(i)}
                  onMouseLeave={() => setJourneyHovered(null)}
                  className={[
                    "px-1 cursor-pointer transition-all duration-200",
                    journeyHovered === i ? "opacity-100" : journeyHovered !== null ? "opacity-40" : "opacity-100",
                    i === 0 ? "text-left" : "",
                    i === JOURNEY.length - 1 ? "text-right" : "",
                    i !== 0 && i !== JOURNEY.length - 1 ? "text-center" : "",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "leading-none transition-all duration-200",
                      journeyHovered === i
                        ? "text-base text-accent-bright font-semibold"
                        : j.current
                        ? "text-base text-foreground font-semibold"
                        : "text-sm text-muted-foreground",
                    ].join(" ")}
                  >
                    {j.year}
                  </div>
                  <div
                    className={[
                      "mt-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-200",
                      journeyHovered === i
                        ? "text-primary font-semibold"
                        : j.current
                        ? "text-primary"
                        : "text-foreground/30",
                    ].join(" ")}
                  >
                    {j.label}
                  </div>
                  <div className={[
                    "mt-1 text-[10px] leading-snug transition-all duration-200",
                    journeyHovered === i ? "text-accent-bright font-medium" : "text-muted-foreground/60"
                  ].join(" ")}>
                    {j.sub}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Skill matrix */}
          <motion.div
            variants={fadeUp}
            className="bg-surface-alt border border-border rounded-sm p-8 md:p-10 flex flex-col"
          >
            <div className="flex items-center justify-between gap-6 pb-4 mb-4 border-b border-border/60">
              <div className="flex items-center gap-2 font-mono-custom text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="text-muted-foreground"
                  aria-hidden="true"
                >
                  <rect x="0" y="8" width="3" height="4" fill="currentColor" />
                  <rect x="4.5" y="5" width="3" height="7" fill="currentColor" />
                  <rect x="9" y="2" width="3" height="10" fill="currentColor" />
                </svg>
                SKILL MATRIX
              </div>
              <div className="hidden sm:flex gap-6 font-mono-custom text-[10px] tracking-[0.25em] text-foreground/35">
                <span>SKILL</span>
                <span>TOOL</span>
              </div>
            </div>

            <div className="flex-1 relative">
              {SKILLS.map((s, i) => (
                <div
                  key={s.name}
                  onMouseEnter={() => {
                    setJourneyHovered(null);
                    setHovered(i);
                  }}
                  onMouseLeave={() => setHovered(null)}
                  className="group flex items-center justify-between gap-4 py-2.5 border-b border-border/60 last:border-b-0"
                  style={{ opacity: hovered !== null && hovered !== i && journeyHovered === null ? 0.3 : 1 }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-sm text-foreground/60 group-hover:text-foreground transition-colors truncate">
                      {s.name}
                    </span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-background/40 border border-border text-muted-foreground tabular-nums group-hover:bg-background group-hover:text-foreground/80 transition-colors shrink-0">
                      {s.score}
                    </span>
                  </div>

                  <span
                    className={[
                      "text-sm text-right whitespace-nowrap transition-colors",
                      s.accent
                        ? "text-primary font-medium"
                        : "text-muted-foreground group-hover:text-foreground",
                    ].join(" ")}
                  >
                    {s.tool}
                  </span>
                </div>
              ))}

              {/* Hover line effect */}
              {hovered !== null && (
                <div
                  className="absolute left-1/2 bottom-0 w-px bg-gradient-to-b from-accent-bright via-primary to-transparent pointer-events-none"
                  style={{
                    transform: `translateX(-50%)`,
                    height: `calc(100% + 24px)`,
                    opacity: 0.6,
                    animation: "slideDown 400ms ease-out",
                  }}
                />
              )}

              <style>{`
                @keyframes slideDown {
                  from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-10px);
                  }
                  to {
                    opacity: 0.6;
                    transform: translateX(-50%) translateY(0);
                  }
                }
              `}</style>
            </div>

            <div className="mt-6 pt-5 border-t border-border/60 flex items-end justify-between gap-6">
              <div className="flex-1">
                <div className="font-mono-custom text-[10px] tracking-[0.22em] text-foreground/35 uppercase mb-2">
                  Avg score: {AVG_SCORE}%
                </div>
                <div className="h-1 rounded-full bg-background/50 overflow-hidden border border-border/60">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-primary/70 to-accent-bright"
                    style={{
                      width: inView ? `${AVG_SCORE}%` : "0%",
                      transition: "width 1600ms cubic-bezier(0.4,0,0.2,1) 500ms",
                    }}
                  />
                </div>
              </div>

              <div className="hidden md:block font-mono-custom text-[10px] text-muted-foreground/60 text-right leading-relaxed whitespace-nowrap">
                <div>// scores are self-assessed (total = 100)</div>
                <div>// always iterating, always improving</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="absolute right-4 bottom-8 font-display font-bold text-foreground pointer-events-none select-none"
        style={{ fontSize: "22vw", opacity: 0.02, lineHeight: 0.9 }}
      >
        03
      </div>
    </section>
  );
}
