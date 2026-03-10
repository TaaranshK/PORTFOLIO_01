import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import CustomCursor from "@/components/journal/CustomCursor";
import rememberTree from "@/assets/remember-tree.jpg";

interface StoryPart {
  tag: string;
  mood: string;
  title: string;
  readTime: string;
  paragraphs: string[];
}

const STORY_TITLE = "Letters, Light, and Late Nights";
const STORY_DATE = "2022 - Present";

const PARTS: StoryPart[] = [
  {
    tag: "The Beginning",
    mood: "Isolated but Growing",
    title: "Hostel, Panic, and a New Version of Me",
    readTime: "5 min",
    paragraphs: [
      "In 2022 when I first went to college, I felt alone in the whole campus. I did not know anyone. My mom came with me to settle me in the hostel and that moment was heavy because it was the first time I was living outside my home. Corona had just ended, Class 11 and 12 had gone online, and somewhere in those two years I had become a different person. Less social, more inside my head, and honestly scared if I would blend with people again.",
      "Gaming had become my comfort zone in that phase, and hostel life did not break that habit. I used to wait for classes to end, rush back to my room, and play with the same 2-3 people every day. Parallelly, I started interacting with people in class, mostly boys. The antisocialness had gone deep in me, so I often felt awkward, especially around girls. Still, one person did not make me feel awkward, and that friendship slowly became an important part of my days.",
      "While all this was happening, my CGPA in 1st, 2nd, and 3rd semester kept dropping and my mind kept shouting one thing: what are you doing with your life? In 4th semester I finally fixed it. I improved my CGPA, worked on myself daily, did coding seriously, solved 2-3 DSA questions almost every day, and life slowly became peaceful again. Small laughs with friends started feeling enough.",
    ],
  },
  {
    tag: "The Plot Twist",
    mood: "Unexpected",
    title: "The Day I Finally Spoke",
    readTime: "4 min",
    paragraphs: [
      "Around November-December, there were two people from my class who usually sat separately and stayed in their own zone. I liked the vibe but for almost two years I never got a real chance to talk. Then one day I was coding on my laptop at the last bench and saw one of them sitting in front. Something pinched inside me and said, just talk to her. In my head it felt like that Interstellar moment where Cooper is trying to stop himself through time, but still moving forward.",
      "I talked to her and I do not know why, but it felt nice. Time passed, we became friends, and then her other friend also became my friend. With them, I started understanding perspective better, especially how girls think about respect, communication, and emotional safety. We laughed, went places, shared random moments, and I started opening up in ways I had not done in years.",
    ],
  },
  {
    tag: "The Tragedy",
    mood: "Shattered",
    title: "The Month Everything Changed",
    readTime: "5 min",
    paragraphs: [
      "On 26 February I returned home after final exams. On my way back to Ajmer, my mom told me my dad had severe heart spikes and doctors advised immediate surgery. We admitted him with one sentence in our mouths: everything will be fine. On 5 March the surgery went great, papa came out smiling, and for a moment we felt like we got life back.",
      "Then on 13 March everything broke. Papa had asked me to read an article, he was sitting in the garden, and I had gone to my computer. Suddenly I heard mom shouting my name loudly. My legs were shaking while taking out the car, even the car touched the corner in panic, then a neighbor drove and we rushed to the hospital. After that moment, the world became very silent. Some things I still cannot write. Not because I forgot them, but because I remember them too clearly.",
    ],
  },
  {
    tag: "Mirror Days",
    mood: "Healing",
    title: "Seeing Myself Again",
    readTime: "6 min",
    paragraphs: [
      "After some time I looked at myself in the mirror and told myself I will become a better person from now on. Around that phase I got a condolence message from her and I cannot explain it, but it gave me relief. CRT had started, I went back to college, people showed care, but inside I was still numb. I could see concern in their eyes, but I could not feel much.",
      "Then those two asked me to come to Nahargarh. We laughed, clicked pictures, and for some hours my mind stopped fighting itself. After that, I used to pick and drop one person for college, and those drives became little therapy sessions. We talked about struggles, opinions, family, future, fear, everything in bits and pieces. I was finally feeling normal again.",
      "For a mood reset I went to Udaipur with my mom. Things started settling. My birthday came and those two made sure it was special. She called me exactly at 12, and that one moment stayed in my heart longer than I expected.",
    ],
  },
  {
    tag: "The Mistake",
    mood: "Tender and Uncertain",
    title: "The Letter in the Bag",
    readTime: "3 min",
    paragraphs: [
      "A few days later she asked for help with her laptop, I got it repaired, and she gave me a chai party. Life felt simple and warm. By then, I had developed feelings for her and somewhere I felt maybe it was mutual too. Then we made a random plan to watch the re-release of Om Shanti Om, and I decided that day I would confess in the old-school letter way.",
      "That letter was probably the most beautiful thing I had written for any person. But I made one mistake, I told her friend that I had hidden the letter in the bag. That one decision changed the air between us.",
    ],
  },
  {
    tag: "The Response",
    mood: "Quiet and Heavy",
    title: "A Message I Still Remember",
    readTime: "5 min",
    paragraphs: [
      "Her message came and it was very direct, respectful, and difficult at the same time. She said this was very out of the blue, she felt overwhelmed, and she had only ever considered me a really good friend. She appreciated that I opened up, but she could not reciprocate those feelings. She also said she had been anxious lately and was not in the headspace to deal with complicated emotional relationships right now.",
      "She said she values friendship, but this made things awkward for her, and still she was willing to continue as friends if I felt the same. I read that message again and again. Not to fight it, just to absorb it. There were some things said later on call too, but I will keep them private. That night I played There Is a Light That Never Goes Out and just sat with myself.",
    ],
  },
  {
    tag: "Open End",
    mood: "Lowkey Hopeful",
    title: "One Text Away",
    readTime: "2 min",
    paragraphs: [
      "Not every story ends cleanly. Some stories stay open and still shape you deeply. This one taught me grief, friendship, timing, boundaries, and the weight of words all at once.",
      "If you are reading this, then you know you are one text message away. Heyy Taaransh, how have you been?",
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

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-ink-raised">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-20">
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
            <p className="font-inter text-xs tracking-[0.3em] uppercase text-stone mb-4">
              {STORY_DATE} - {part.tag} - {part.mood}
            </p>
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
