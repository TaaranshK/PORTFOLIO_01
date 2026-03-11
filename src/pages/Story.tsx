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
    title: "Hostel, Panic, and a New Version",
    readTime: "5 min",
    paragraphs: [
      "In 2022, when he joined college, he felt alone on a crowded campus. He did not know anyone, and the day his mother helped him settle into the hostel felt heavier than expected because it was his first time living away from home.",
      "The pandemic years had changed him more than he admitted. Class 11 and 12 went online, and somewhere in that phase he became quieter, less social, and unsure whether he could blend in again.",
      "Gaming became a comfort habit. After classes, he rushed back to his room and played with the same two or three friends online. He did start talking to classmates, mostly boys, but still felt awkward around many people.",
      "At the same time, his CGPA dropped across the first three semesters. In the fourth semester, he reset his routine, worked on himself daily, practiced coding seriously, solved DSA regularly, and slowly brought peace back into his days.",
    ],
  },
  {
    tag: "The Plot Twist",
    mood: "Unexpected",
    title: "The Day Silence Broke",
    readTime: "5 min",
    paragraphs: [
      "Around November and December, there were two classmates who usually stayed in their own zone. For almost two years, he never found the right moment to speak properly.",
      "One day, while coding on his laptop at the back of class, he saw one of them sitting ahead and finally decided to speak. That one decision changed the rhythm of his days.",
      "He became friends with her, and then with her friend too. Through those conversations, he started understanding perspective better, especially around respect, communication, and emotional safety. He laughed more, went out more, and started opening up again.",
    ],
  },
  {
    tag: "The Tragedy",
    mood: "Shattered",
    title: "The Month Everything Split",
    readTime: "6 min",
    paragraphs: [
      "On 26 February, after final exams, he returned home. On the way back to Ajmer, his mother told him his father had severe heart issues and doctors advised immediate surgery.",
      "The family held onto one sentence: everything will be fine. On 5 March, the surgery went well, and for a brief moment everyone felt life had returned.",
      "Then on 13 March, everything broke. His father was in the garden and had asked him to read an article, and moments later panic took over. There was shouting, a rushed attempt to drive, a neighbor stepping in, and a race to the hospital.",
      "After that day, the world felt unnaturally silent. Some memories from that moment still remain too sharp to be put fully into words.",
    ],
  },
  {
    tag: "Mirror Days",
    mood: "Healing",
    title: "Learning to Feel Again",
    readTime: "6 min",
    paragraphs: [
      "After some time, he promised himself he would become a better and stronger person. Around that phase, he received a condolence message from her, and that one message brought unexpected relief.",
      "He returned to college when CRT had started. People showed care, but inside he still felt numb, as if concern was visible around him but unreachable within him.",
      "Then those two friends asked him to come to Nahargarh. They laughed, clicked pictures, and for a few hours his mind stopped fighting itself.",
      "After that, he used to pick and drop one of them for college, and those drives became quiet therapy sessions. They spoke about family, fear, future, opinions, and survival in small fragments.",
      "He later took a short Udaipur trip with his mother to reset. By his birthday, things had softened a little, and a midnight call stayed with him longer than expected.",
    ],
  },
  {
    tag: "The Mistake",
    mood: "Tender and Uncertain",
    title: "A Letter, A Risk, A Misstep",
    readTime: "4 min",
    paragraphs: [
      "A few days later, she asked for help with her laptop. He got it repaired, she gave him a chai party, and life felt warm and simple for a while.",
      "By then, he had developed feelings and believed there might be a chance they were mutual. Before a plan to watch the re-release of Om Shanti Om, he chose to confess through a handwritten letter.",
      "The letter was deeply honest. The mistake was not writing it, the mistake was telling her friend where he had hidden it in the bag. That one decision changed the air between them.",
    ],
  },
  {
    tag: "The Response",
    mood: "Quiet and Heavy",
    title: "The Message That Redefined Everything",
    readTime: "5 min",
    paragraphs: [
      "Her reply was direct, respectful, and difficult to read at the same time. She said it came out of the blue, she felt overwhelmed, and she had only ever seen him as a close friend.",
      "She appreciated his honesty but could not reciprocate those feelings. She also said she was already anxious and not in the headspace to handle emotionally heavy conversations.",
      "She said the friendship still mattered to her, even though things had become awkward. He read the message many times, not to argue with it, but to accept it with dignity.",
      "There were private conversations later, and they stayed private. That night, he sat with music and let reality settle.",
    ],
  },
  {
    tag: "Open End",
    mood: "Lowkey Hopeful",
    title: "What Remains",
    readTime: "3 min",
    paragraphs: [
      "Not every story ends cleanly. Some stories stay open and still shape a person for years.",
      "What remains is not only heartbreak but perspective: lessons in grief, friendship, timing, boundaries, and the weight of words.",
      "If this feels familiar, it is because many people carry chapters like this quietly - unfinished on paper, yet complete in what they teach.",
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
