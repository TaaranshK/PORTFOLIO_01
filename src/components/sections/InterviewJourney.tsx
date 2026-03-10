import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const INTERVIEW_MILESTONES = [
  {
    company: "Infosys Springboard",
    role: "Virtual Internship - Data Science",
    outcome: "Selected",
    duration: "2 months",
    learning: "First exposure to industry-level data science and real-world problem solving",
    icon: "📊",
    status: "success",
  },
  {
    company: "Mindtree (L&T Group)",
    role: "Full-Time Position",
    outcome: "Not Selected",
    duration: "40 rapid-fire questions in 30 mins",
    learning: "Importance of strong fundamentals in CN, DBMS, and OS. 34 out of 55 candidates selected.",
    icon: "🔧",
    status: "learning",
  },
  {
    company: "Tata Technologies",
    role: "Internship",
    outcome: "Selected",
    duration: "2 months",
    learning: "Practical experience in professional workflows and technical problem-solving",
    icon: "🏆",
    status: "success",
  },
  {
    company: "Cognizant",
    role: "Off-Campus Assessment",
    outcome: "Interview Completed",
    duration: "Java, SQL, Web Dev",
    learning: "Ability to clearly explain fundamental concepts matters as much as knowing them",
    icon: "💡",
    status: "insight",
  },
  {
    company: "Trycon",
    role: "Frontend Developer",
    outcome: "2nd Round (No Selection)",
    duration: "Multi-stage process",
    learning: "Strengthened focus on DSA and algorithmic problem-solving",
    icon: "🚀",
    status: "learning",
  },
  {
    company: "Nebula9.ai",
    role: "AI/ML Role",
    outcome: "Not Selected",
    duration: "Project Shortlist + Interview",
    learning: "Deepened knowledge of Generative AI and modern AI architectures like transformers",
    icon: "🤖",
    status: "learning",
  },
  {
    company: "Celebal Technologies",
    role: "Data Science / ML",
    outcome: "Final Round - High Potential",
    duration: "Out of 400 applicants",
    learning: "Confidence, communication, and preparation matter. Interviewer impressed with fresher knowledge.",
    icon: "⭐",
    status: "insight",
  },
];

function MilestoneCard({
  milestone,
  index,
  isInView,
}: {
  milestone: (typeof INTERVIEW_MILESTONES)[0];
  index: number;
  isInView: boolean;
}) {
  const getStatusColor = () => {
    switch (milestone.status) {
      case "success":
        return "border-accent bg-accent/5";
      case "learning":
        return "border-primary bg-primary/5";
      case "insight":
        return "border-accent/60 bg-accent/3";
      default:
        return "border-border";
    }
  };

  const getStatusBadge = () => {
    switch (milestone.status) {
      case "success":
        return "✓ Selected";
      case "learning":
        return "📚 Learning";
      case "insight":
        return "💭 Insight";
      default:
        return "→ Progress";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`relative ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"}`}
    >
      <div className={`p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${getStatusColor()}`}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{milestone.icon}</span>
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                {getStatusBadge()}
              </p>
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {milestone.company}
            </h3>
            <p className="font-body text-sm text-foreground/70 mt-1">{milestone.role}</p>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <p className="font-body text-xs text-muted-foreground">
            <span className="font-semibold">Duration:</span> {milestone.duration}
          </p>
          <p className="font-body text-xs text-muted-foreground">
            <span className="font-semibold">Outcome:</span> {milestone.outcome}
          </p>
        </div>

        <div className="pt-3 border-t border-border/30">
          <p className="font-body text-sm text-foreground/60 italic">
            "{milestone.learning}"
          </p>
        </div>
      </div>

      {/* Timeline dot */}
      <motion.div
        animate={isInView ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 ${
          milestone.status === "success"
            ? "border-accent bg-accent"
            : milestone.status === "insight"
              ? "border-accent/60 bg-accent/40"
              : "border-primary bg-primary"
        } ${index % 2 === 0 ? "md:-right-15" : "md:-left-15"} hidden md:block left-1/2 -translate-x-1/2`}
      />
    </motion.div>
  );
}

export function InterviewJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });
  const timelineInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="relative section-pad overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="font-mono-custom text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            04 — My Interview Journey
          </p>
          <h2 className="font-display text-display-md font-light text-foreground mb-4">
            Learning Through <span className="text-stroke">Every Feedback</span>
          </h2>
          <p className="font-body text-base text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            My journey into tech began during my third year of undergraduate studies. Every interview —
            successful or not — taught me something valuable. Here's what I learned:
          </p>
        </motion.div>

        {/* Key Learning Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={headInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 p-6 md:p-8 border border-accent/30 bg-accent/5 rounded-lg text-center"
        >
          <p className="font-display text-lg md:text-xl italic text-foreground">
            "Rejection is not failure — it is feedback."
          </p>
          <p className="font-body text-sm text-foreground/60 mt-3">
            After every interview, I identified what I lacked and worked to improve it.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={timelineInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Center line for desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent hidden md:block -translate-x-1/2" />

          {/* Milestones */}
          <div className="space-y-12">
            {INTERVIEW_MILESTONES.map((milestone, i) => (
              <MilestoneCard key={milestone.company} milestone={milestone} index={i} isInView={timelineInView} />
            ))}
          </div>
        </motion.div>

        {/* Key Takeaways */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 pt-12 border-t border-border"
        >
          <h3 className="font-display text-lg font-semibold text-foreground mb-6">
            What This Journey Made Me:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Technically Strong",
                desc: "Deep fundamentals in DSA, DBMS, networking, and AI/ML concepts",
              },
              {
                title: "Communication Master",
                desc: "Ability to clearly explain complex concepts and articulate problem-solving process",
              },
              {
                title: "Industry Ready",
                desc: "Understanding of real-world workflows, expectations, and professional practices",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                className="p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-background hover:border-accent/30 transition-all duration-300"
              >
                <h4 className="font-body font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="font-body text-sm text-foreground/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ongoing Journey */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={timelineInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="font-body text-foreground/60 italic">
            This journey is still ongoing. Every challenge brings improvement, every rejection brings wisdom.
          </p>
        </motion.div>
      </div>

      {/* Section number watermark */}
      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 font-display text-[20vw] font-bold text-foreground pointer-events-none select-none"
        style={{ opacity: 0.02, lineHeight: 1 }}
      >
        04
      </div>
    </section>
  );
}
