import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import CustomCursor from "@/components/journal/CustomCursor";
import rememberTree from "@/assets/remember-tree.jpg";

/* ── Floating ambient particles ── */
function FloatingParticles() {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 12 + 10,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.35 + 0.08,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-paper"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["-18px", "18px", "-18px"],
            x: ["-10px", "10px", "-10px"],
            opacity: [p.opacity, p.opacity * 2.2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

interface StoryPart {
  tag: string;
  mood: string;
  title: string;
  readTime: string;
  paragraphs: string[];
}

const STORY_TITLE = "The Things We Felt But Never Held";
const STORY_DATE = "2026 - Present";

const PARTS: StoryPart[] = [
  {
    tag: "The Beginning",
    mood: "Isolated but Growing",
    title: "Hostel, Panic, and a New Version",
    readTime: "5 min",
    paragraphs: [
      "He didn’t notice the loneliness at first. In 2022, when he stepped onto the campus, it looked like everything he had imagined—crowded corridors, unfamiliar faces, voices blending into a constant hum. It should have felt exciting, but instead, it felt like standing in a crowd where no one could truly see him.",
      "The day his mother helped him settle into the hostel stayed with him longer than expected. She adjusted small things, stretched conversations, delaying the moment she had to leave. And when she finally did, the room didn’t feel new—it felt empty. That was the first night he realized that home isn’t a place, it’s a presence.",
      "The pandemic years had quietly rewritten him. Online classes had made him quieter, less expressive, unsure if he could blend in again. Conversations no longer came naturally, and he often felt like he was a step behind everyone emotionally.",
      "Gaming became his comfort. After classes, he rushed back to his room, logging into a world where nothing had changed. There, with his 2–3 friends, he didn’t have to explain himself. In real life, he tried talking to classmates, mostly boys, but there was always a gap he couldn’t cross.",
      "At the same time, his CGPA started slipping across the first three semesters. By the fourth, it wasn’t just numbers—it reflected something deeper. So he reset. He built discipline, practiced coding daily, solved DSA consistently, and slowly, peace began returning—not loudly, but quietly, like a slow sunrise.",
    ],
  },
  {
    tag: "The Plot Twist",
    mood: "Unexpected",
    title: "Unchained Silence",
    readTime: "5 min",
    paragraphs: [
      "There were two classmates he had noticed for almost two years. They stayed in their own world, not distant, just self-contained. He had never found the right moment to speak.",
      "Until one day, sitting at the back of the class coding on his laptop, he looked up, saw one of them ahead, and decided not to overthink. He simply spoke. That one small decision changed the rhythm of his days.",
      "Conversations started small, then grew. He became friends with her, and then with her friend too. Through them, he began understanding perspective—respect, communication, emotional safety.",
      "He laughed more. Went out more. Opened up again. For the first time in a long while, he wasn’t trying to fit in—he was just being.",
    ],
  },
  {
    tag: "The Tragedy",
    mood: "Shattered",
    title: "The Month Time Split",
    readTime: "6 min",
    paragraphs: [
      "On 26 February, after exams, he returned home. On the way back to Ajmer, his mother told him about his father’s severe heart condition. Surgery was needed immediately. Fear entered quietly, hidden behind one sentence the family kept repeating—everything will be fine.",
      "On 5 March, the surgery went well. For a brief moment, it felt like life had returned, like they had won.",
      "But on 13 March, everything broke. His father was in the garden, asking him to read an article, when suddenly panic took over. Voices rose, movements blurred, and control slipped away. A rushed drive, a neighbor stepping in, a desperate race to the hospital.",
      "Some moments don’t give you time to understand them. They just happen. And after that day, silence wasn’t peaceful anymore—it was heavy. Some memories stayed too sharp to ever fully put into words.",
    ],
  },
  {
    tag: "Mirror Days",
    mood: "Healing",
    title: "Learning to Feel Again",
    readTime: "6 min",
    paragraphs: [
      "After some time, he made a quiet promise to himself—to become stronger, not by choice, but by necessity. Around that phase, a condolence message from her arrived, and somehow, those few words made him feel less alone.",
      "When he returned to college, life had moved forward. People showed care, but inside, he felt numb—as if concern existed around him, but couldn’t reach within.",
      "Then one day, those two friends asked him to come to Nahargarh. They laughed, clicked pictures, and for a few hours, his mind stopped fighting itself. It wasn’t happiness—but it was relief.",
      "Small routines formed. He would pick and drop one of them, and those drives became quiet therapy sessions. Conversations about family, fear, future—spoken in fragments, but enough to feel alive again.",
      "He later took a short Udaipur trip with his mother, a reset he didn’t know he needed. By his birthday, things had softened slightly, and a midnight call stayed with him longer than expected.",
    ],
  },
  {
    tag: "The Mistake",
    mood: "Tender and Uncertain",
    title: "The Letter",
    readTime: "4 min",
    paragraphs: [
      "One day, she asked for help with her laptop. It was her first time dealing with something like that, and she felt anxious enough to cry. He stayed—not to fix her emotions, just the problem. And that was enough.",
      "He got it repaired. She gave him a chai party. They laughed, shared thoughts, and in that simplicity, he felt something he hadn’t in a long time—peace.",
      "Somewhere along the way, feelings had grown. Quietly, without forcing themselves. He believed there might be a chance.",
      "So on the last day of the second insem, after a spontaneous plan to watch Om Shanti Om, he wrote her a handwritten letter—honest, raw, probably the most real thing he had ever written.",
      "The mistake wasn’t the letter. The mistake was timing. He didn’t understand the weight she was already carrying. And sometimes, even the purest intentions arrive at the wrong moment.",
    ],
  },
  {
    tag: "The Response",
    mood: "Quiet and Heavy",
    title: "The Message That Redefined Everything",
    readTime: "5 min",
    paragraphs: [
      "She replied with clarity and respect. It was unexpected, overwhelming for her, and she had only ever seen him as a close friend.",
      "She appreciated his honesty but couldn’t reciprocate those feelings. She was already anxious and not in the headspace for something emotionally complex.",
      "She said the friendship still mattered, even if things felt awkward. He read that message many times—not to question it, but to accept it.",
      "There were conversations later, quiet and private. That night, he sat with music and let reality settle. It hurt, but it wasn’t bitterness—it was understanding.",
      "He never wanted to make things awkward. He only wanted to be honest. And she had been honest too.",
      "He respected her space, her feelings, her clarity. And despite everything, he still valued the friendship deeply.",
    ],
  },
  {
    tag: "Open End",
    mood: "Lowkey Hopeful",
    title: "What Remains",
    readTime: "3 min",
    paragraphs: [
      "Not every story ends cleanly. Some stories remain open, yet shape a person in ways nothing else can.",
      "What remained wasn’t just heartbreak—it was perspective. About grief, timing, boundaries, friendship, and the quiet weight of words.",
      "Some stories don’t become love stories. They become life lessons.",
      "And if this feels familiar, it’s because many people carry chapters like this—unfinished on paper, but deeply complete in what they teach.",
    ],
  },
];

export default function StoryPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedPage = Number(searchParams.get("page") || "1");
  const maxPage = PARTS.length;
  const page = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), maxPage)
    : 1;
  const part = PARTS[page - 1];

  useEffect(() => {
    if (requestedPage !== page) {
      setSearchParams({ page: String(page) }, { replace: true });
    }
    window.scrollTo(0, 0);
  }, [page, requestedPage, setSearchParams]);

  const goToPage = (nextPage: number) => {
    setSearchParams({ page: String(nextPage) });
  };

  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* ── Stagger helpers ── */
  const titleWords = STORY_TITLE.split(" ");

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-ink-raised">

        {/* ═══════ CINEMATIC INTRO · PAGE 1 ONLY ═══════ */}
        {page === 1 && (
          <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
            {/* atmospheric layers */}
            <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink-raised to-ink-raised" />
            <motion.div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 40% 30%, hsl(36 55% 58% / 0.06), transparent 60%), radial-gradient(ellipse at 70% 70%, hsl(118 22% 32% / 0.05), transparent 55%)" }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <FloatingParticles />

            {/* content */}
            <div className="relative z-10 px-6 max-w-2xl">
              {/* decorative top rule */}
              <motion.div
                className="mx-auto mb-10 h-px bg-gradient-to-r from-transparent via-stone/40 to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "10rem", opacity: 1 }}
                transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
              />

              {/* date */}
              <motion.p
                className="font-inter text-[11px] tracking-[0.35em] uppercase text-stone mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {STORY_DATE}
              </motion.p>

              {/* title — word stagger */}
              <h1 className="font-garamond text-4xl sm:text-5xl md:text-6xl leading-[1.2] text-paper mb-6">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 + i * 0.14, ease: "easeOut" }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* epigraph */}
              <motion.p
                className="font-garamond italic text-lg md:text-xl text-paper/50 max-w-md mx-auto mb-10 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, delay: 2.6 }}
              >
                Some chapters are meant to be read slowly.
              </motion.p>

              {/* decorative bottom rule */}
              <motion.div
                className="mx-auto mb-10 h-px bg-gradient-to-r from-transparent via-stone/40 to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "6rem", opacity: 1 }}
                transition={{ duration: 1.2, delay: 3.0, ease: "easeOut" }}
              />

              {/* CTA */}
              <motion.button
                onClick={scrollToContent}
                className="font-inter text-xs tracking-[0.25em] uppercase text-stone hover:text-paper transition-colors duration-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.4 }}
              >
                Begin Reading
              </motion.button>

              {/* scroll chevron */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.6 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="mx-auto text-stone/60"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </motion.svg>
              </motion.div>
            </div>
          </section>
        )}

        {/* ═══════ EXISTING STORY CONTENT ═══════ */}
        <div ref={contentRef} className="max-w-3xl mx-auto px-6 md:px-12 py-20">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/journal")}
            className="font-inter text-sm text-stone hover:text-paper transition-colors mb-12 flex items-center gap-2"
          >
            {'<-'} Back to Journal
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-56 md:h-[24rem] mb-12 rounded-sm overflow-hidden stone-border bg-ink"
          >
            <img src={rememberTree} alt="Remember Tree" className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="font-garamond display-md text-paper mb-2">{STORY_TITLE}</h1>
            <p className="font-inter text-xs uppercase tracking-[0.22em] text-neon mb-4">
              Page {String(page).padStart(2, "0")} of {String(maxPage).padStart(2, "0")}
            </p>
            <p className="font-inter text-xs text-stone">{part.readTime} read</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {part.paragraphs.map((paragraph, i) => (
              <motion.p
                key={`${page}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
                className="font-garamond text-lg md:text-xl leading-relaxed text-paper/78"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 pt-12 border-t border-stone/25 flex gap-4"
          >
            {page > 1 && (
              <button
                onClick={() => goToPage(page - 1)}
                className="flex-1 py-3 px-4 border border-stone/30 hover:border-neon text-stone hover:text-neon transition-all duration-300 rounded font-inter text-sm"
              >
                {'<-'} Previous Page
              </button>
            )}
            {page < maxPage && (
              <button
                onClick={() => goToPage(page + 1)}
                className="flex-1 py-3 px-4 border border-stone/30 hover:border-neon text-stone hover:text-neon transition-all duration-300 rounded font-inter text-sm"
              >
                Next Page {'->'}
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
