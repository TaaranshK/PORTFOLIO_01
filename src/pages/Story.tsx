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

const STORY_TITLE = "Between the Silence and the Worlds";
const STORY_DATE = "2026 - Present";

const PARTS: StoryPart[] = [
  {
    tag: "The Beginning",
    mood: "Isolated but Growing",
    title: "Hostel, Panic, and a New Version",
    readTime: "5 min",
    paragraphs: [
      "In 2022, he joined college and felt alone on a crowded campus. He did not know anyone, and the day his mother helped him settle into the hostel was heavier than expected because it was his first time living away from home.",
      "The pandemic years had changed him more than he admitted. Class 11 and 12 went online, and somewhere in that phase he became quieter, less social, and unsure whether he could blend in again.",
      "Gaming became a comfort habit. After classes, he rushed back to his room and played with the same 2-3 friends online. He did start talking to classmates, mostly boys, but still felt awkward around many people.",
      "At the same time, his CGPA dropped across the first three semesters. In fourth semester, he reset his routine, worked on himself daily, practiced coding seriously, solved DSA regularly, and slowly brought peace back into his days.",
    ],
  },
  {
    tag: "The Plot Twist",
    mood: "Unexpected",
    title: "Unchained Silence",
    readTime: "5 min",
    paragraphs: [
      "Around November-December, there were two classmates who usually stayed in their own zone. For almost two years, he never found the right moment to talk properly.",
      "One day, while coding on his laptop at the back of class, he saw one of them sitting ahead and finally decided to speak. That one decision changed the rhythm of his days.",
      "He became friends with her, and then with her friend too. Through those conversations, he started understanding perspective better, especially around respect, communication, and emotional safety. He laughed more, went out more, and started opening up again.",
    ],
  },
  {
    tag: "The Tragedy",
    mood: "Shattered",
    title: "The Month Time Split",
    readTime: "6 min",
    paragraphs: [
      "On 26 February, after final exams, he returned home. On the way back to Ajmer, his mother told him his father had severe heart issues and doctors advised immediate surgery.",
      "The family held onto one sentence, everything will be fine. On 5 March, the surgery went well, and for a brief moment everyone felt life had returned.",
      "Then on 13 March, everything broke. His father was in the garden, had asked him to read an article, and moments later panic took over. There was shouting, a rushed attempt to drive, a neighbor stepping in, and a race to the hospital.",
      "After that day, the world felt unnaturally silent. Some memories from that moment still remain too sharp to be put fully into words.",
    ],
  },
  {
    tag: "Mirror Days",
    mood: "Healing",
    title: "Learning to Feel Again",
    readTime: "6 min",
    paragraphs: [
      "After some time, he promised himself he would become a better and stronger person. Around that phase, he got a condolence message from her, and that one message brought unexpected relief.",
      "He returned to college when CRT had started. People showed care, but inside he still felt numb, as if concern was visible around him but unreachable within him.",
      "Then those two friends asked him to come to Nahargarh. They laughed, clicked pictures, and for a few hours his mind stopped fighting itself.",
      "After that, he used to pick and drop one of them for college, and those drives became quiet therapy sessions. They spoke about family, fear, future, opinions, and survival in small fragments.",
      "He later took a short Udaipur trip with his mother to reset. By his birthday, things had softened a little, and a midnight call stayed with him longer than expected.",
    ],
  },
{
  tag: "The Mistake",
  mood: "Tender and Uncertain",
  title: "The Letter",
  readTime: "4 min",
  paragraphs: [
    "A few days later, she asked for help with her laptop. She felt insecure and frightened because it was her first time getting her laptop repaired and she started crying. But he was there for her, and he would be there no matter what.",
    "He got it repaired. She gave him a chai party. They laughed, giggled, and shared thoughts, and honestly, he felt good.",
    "By then, he had developed feelings and believed there might be a chance things were mutual. On the last day of the second insem, a random plan was made to watch the re-release of Om Shanti Om, and he chose to confess through a handwritten letter.",
    "The letter was deeply honest and probably the most beautiful thing he had written. The mistake was not writing it; the mistake was not understanding the time and mental state she was in. That one decision changed the air between them.",
  ],
},
{
  tag: "The Response",
  mood: "Quiet and Heavy",
  title: "The Message That Redefined Everything",
  readTime: "5 min",
  paragraphs: [
    "She replied directly, respectfully, and with clarity. She said it was out of the blue, she felt overwhelmed, and she had only ever seen him as a close friend.",
    "She appreciated his honesty but could not reciprocate those feelings. She also shared that she was already anxious and not in the headspace for emotionally complex dynamics.",
    "She said friendship still mattered to her, though things felt awkward. He read that message many times, not to argue with it, but to absorb it with dignity.",
    "There were private conversations later that remained private. That night, he sat with music and let reality settle.",
    "But it was not the end. He never wanted to make things awkward; he only wanted to be honest about what he felt in that moment.",
    "He respected that she opened up and shared her side, and he was genuinely sorry for any hurt or trouble caused.",
    "He understood her point and respected her space and headspace. She had always been a good friend, and he still valued that friendship.",
  ],
},

  {
    tag: "Open End",
    mood: "Lowkey Hopeful",
    title: "What Remains",
    readTime: "3 min",
    paragraphs: [
      "Not every story ends cleanly. Some stories stay open and still shape a person for years.",
      "What remains is not just heartbreak, but perspective: grief, friendship, timing, boundaries, and the weight of words, all learned at once.",
      "If this feels familiar, it is because many people carry chapters like this quietly, unfinished on paper, but deeply complete in what they teach.",
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
