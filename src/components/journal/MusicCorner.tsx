"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ARTISTS = [
  { name: "Hozier",             origin: "Ireland",     genre: "Alternative/Folk",     note: "Every lyric feels like poetry set to ache and beauty." },
  { name: "Billie Eilish",       origin: "USA",         genre: "Darkwave/Electropop",   note: "When silence speaks louder than screams." },
  { name: "Tamino",              origin: "Belgium",     genre: "Alternative/Indie Pop", note: "Hauntingly beautiful in ways that linger." },
  { name: "Cigarettes After Sex", origin: "USA",        genre: "Slowcore/Ambient",      note: "Nothing else tastes quite like this." },
  { name: "Stephen Sanchez",     origin: "USA",         genre: "Alternative/Indie Pop", note: "Old soul in a new world." },
  { name: "Joji",                origin: "Japan/USA",   genre: "R&B/Electronic",        note: "Slow dancing in the dark—literally." },
  { name: "DJO",                 origin: "USA",         genre: "Indie Rock/Electronic", note: "Nostalgia wrapped in synth and truth." },
  { name: "Chris Isaak",         origin: "USA",         genre: "Rock/Rockabilly",       note: "Wicked Game never stops playing." },
  { name: "Lord Huron",          origin: "USA",         genre: "Indie Folk/Rock",       note: "Stories told in shadowed tones." },
  { name: "The Weeknd",          origin: "Canada",      genre: "R&B/Hip-hop",           note: "After hours of feeling." },
  { name: "Elliott James Ray",   origin: "USA",         genre: "Indie/Alternative",     note: "Whispers that echo." },
  { name: "Elvis Presley",       origin: "USA",         genre: "Rock & Roll/Country",   note: "The King of timeless melancholy." },
  { name: "Satinder Sartaj",     origin: "India",       genre: "Punjabi/Sufi",          note: "Soul music in Punjabi language." },
  { name: "Karan Aujla",         origin: "India",       genre: "Punjabi/Rap",           note: "Raw energy from Punjab." },
  { name: "Talwinder",           origin: "India",       genre: "Punjabi/Folk",          note: "Roots run deep." },
  { name: "Diljit Dosanjh",      origin: "India",       genre: "Punjabi/Pop",           note: "Turbans and timeless tracks." },
  { name: "Amit Trivedi",        origin: "India",       genre: "Bollywood/Composer",    note: "Maestro of modern melodies." },
  { name: "Arijit Singh",        origin: "India",       genre: "Bollywood/Indie Pop",   note: "Heartbreak in Hindi." },
  { name: "James",               origin: "UK",          genre: "Alternative/Indie",     note: "British melancholy perfected." },
  { name: "The Local Train",     origin: "India",       genre: "Indie Rock",            note: "Indian indie soul." },
  { name: "Shreya Ghoshal",      origin: "India",       genre: "Bollywood/Classical",   note: "Voice of a thousand emotions." },
  { name: "A.R. Rehman",         origin: "India",       genre: "Bollywood/Composer",    note: "Mozart of Madras." },
  { name: "Pritam",              origin: "India",       genre: "Bollywood/Composer",    note: "Modern Hindi film music architect." },
  { name: "K.K.",                origin: "India",       genre: "Bollywood/Playback",    note: "Forever cherished voice." },
  { name: "Shaanwill",                  origin: "India",       genre: "Bollywood/Playback",    note: "Silken voice, eternal charm." },
  { name: "Armaan Malik",        origin: "India",       genre: "Bollywood/Pop",         note: "Young soul, timeless voice." },
  { name: "Atif Aslam",          origin: "Pakistan",    genre: "Bollywood/Pakistani",   note: "Cross-border music magic." },
  { name: "Rahat Fateh Ali Khan", origin: "Pakistan",    genre: "Sufi/Qawwali",          note: "Sufi master, spiritual voice." },
  { name: "Jagjit Singh",        origin: "India",       genre: "Ghazal",                note: "Ghazal legend, immortal." },
];

const ARTIST_PHOTOS: Record<string, string> = {
  "Hozier": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/98/80/95/98809581-4a0e-68a6-04de-b72492e35939/196871908191.jpg/400x400bb.jpg",
  "Billie Eilish": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/400x400bb.jpg",
  "Tamino": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/df/f4/97/dff49708-fb5e-ab64-7424-cf427e86d12d/18UMGIM59685.rgb.jpg/400x400bb.jpg",
  "Cigarettes After Sex": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b3/5e/0f/b35e0fbe-2370-fc48-0f0c-977525e93bf2/720841214601_Cover.jpg/400x400bb.jpg",
  "Stephen Sanchez": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/64/d2/c5/64d2c511-67f4-ae09-5153-d39c3da413a3/21UMGIM75467.rgb.jpg/400x400bb.jpg",
  "Joji": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/e4/f6/bd/e4f6bd1d-c969-026d-bb63-f32c77649474/54391890016.jpg/400x400bb.jpg",
  "DJO": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/e5/94/31/e59431de-7591-58e6-c4d4-105b6373ad6a/5056494917336_1.jpg/400x400bb.jpg",
  "Chris Isaak": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/d0/34/9b/d0349b33-35fb-8913-8755-08b6a1bdd382/21UMGIM47740.rgb.jpg/400x400bb.jpg",
  "Lord Huron": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/55/41/4a/55414a18-861a-79d1-e575-5bf8cf205dbe/886445056839_Cover.jpg/400x400bb.jpg",
  "The Weeknd": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/aa/b4/2aaab42a-a4cb-a600-4a25-d78961495960/18UMGIM17204.rgb.jpg/400x400bb.jpg",
  "Elliott James Ray": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/30/a8/f1/30a8f1b6-e75d-55b4-ee88-667a062e0103/24UM1IM12416.rgb.jpg/400x400bb.jpg",
  "Elvis Presley": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/3e/63/93/3e6393fb-5fe2-1ef4-1c0d-6452919a351c/828768904824.jpg/400x400bb.jpg",
  "Satinder Sartaj": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ea/9d/6e/ea9d6e68-e4c0-bd25-b9a1-d75e370eda0a/SOS_FullAlbum_Inlay_2.jpg/400x400bb.jpg",
  "Karan Aujla": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/06/bd/e1/06bde161-335b-87fa-650a-f0d04bd9f55d/5021732889621.jpg/400x400bb.jpg",
  "Talwinder": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/4d/62/fd/4d62fd50-5bb8-4449-7a07-27a749dbde66/25UMGIM53708.rgb.jpg/400x400bb.jpg",
  "Diljit Dosanjh": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8a/89/e4/8a89e445-d2c6-f8ac-a828-27818b0c1afe/859749638209_cover.jpg/400x400bb.jpg",
  "Amit Trivedi": "https://is1-ssl.mzstatic.com/image/thumb/Music20/v4/ed/4c/52/ed4c520a-0714-0234-60cf-5f5b09ada16b/8902894355360_cover.jpg/400x400bb.jpg",
  "Arijit Singh": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/2e/0b/c0/2e0bc070-112f-a827-6ad8-6bc64f7caaff/840214460180.png/400x400bb.jpg",
  "James": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/6f/3b/68/6f3b6807-d9ff-5db0-82a5-19102e2fd985/06UMGIM58936.rgb.jpg/400x400bb.jpg",
  "The Local Train": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b4/ab/c3/b4abc3c3-bd25-b8cb-0011-4311e3f9497e/197189936111.jpg/400x400bb.jpg",
  "Shreya Ghoshal": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c6/6a/a3/c66aa366-4522-14b8-c629-7cfee5422fc0/Saiyaara_Album_Cover.jpg/400x400bb.jpg",
  "A.R. Rehman": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/2e/76/b5/2e76b58a-bc9f-89ad-a145-2da4683919de/886448872016.jpg/400x400bb.jpg",
  "Pritam": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/3d/c7/43/3dc74387-e7f4-2342-397c-4cf2037c69a5/8902894623223_cover.jpg/400x400bb.jpg",
  "K.K.": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/0e/1f/2c/0e1f2c44-dd63-51ef-ee87-8fe20eed7cd1/eb64bef1-c781-4f60-9e48-2809d1162a92.jpg/400x400bb.jpg",
  "Shaanwill": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/f5/11/1d/f5111d96-0ade-8d52-85da-82cabfe91ca3/849486008090_cover.jpg/400x400bb.jpg",
  "Armaan Malik": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/fe/1d/e4/fe1de42c-cc56-cd1d-fd40-339bbfa8f0f3/8902894357647_cover.jpg/400x400bb.jpg",
  "Atif Aslam": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/38/44/21/384421ca-69a0-83f2-0a34-88653d45db97/8901854001385.jpg/400x400bb.jpg",
  "Rahat Fateh Ali Khan": "https://is1-ssl.mzstatic.com/image/thumb/Music71/v4/95/ff/b0/95ffb0d1-ba72-767e-a4e4-6e7989524b03/190394811402.jpg/400x400bb.jpg",
  "Jagjit Singh": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/02/79/bf/0279bf29-5473-7874-cfc8-f5441dd6b79a5/8901854011223.jpg/400x400bb.jpg",
};

const NOW_PLAYING = {
  title:  "Last Last",
  artist: "Burna Boy",
  album:  "Love, Damini",
  time:   "3:24 / 4:15",
};

const VIBES = ["late nights", "rainy commutes", "rejection processing", "hopeful mornings", "running from feelings"];

function ArtistCard({ artist, index }: { artist: (typeof ARTISTS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [imageFailed, setImageFailed] = useState(false);

  // Generate initials for avatar
  const initials = artist.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Color palette for avatars
  const colors = [
    "from-neon to-stone",
    "from-paper to-neon",
    "from-stone to-paper",
    "from-neon to-paper",
  ];
  const bgColor = colors[index % colors.length];
  const photo = ARTIST_PHOTOS[artist.name];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="stone-border bg-ink-raised p-5 group hover:bg-ink-surface transition-colors duration-300 card-lift"
      data-cursor="pointer"
    >
      <div className="flex items-start gap-4 mb-3">
        {/* Artist Avatar */}
        {photo && !imageFailed ? (
          <img
            src={photo}
            alt={artist.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0 group-hover:shadow-lg transition-shadow duration-300"
          />
        ) : (
          <div
            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${bgColor} flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-shadow duration-300`}
          >
            <span className="font-garamond text-lg font-bold text-ink">
              {initials}
            </span>
          </div>
        )}
        
        <div className="flex-1">
          <p className="font-garamond text-xl text-paper group-hover:text-paper/90">
            {artist.name}
          </p>
          <p className="font-inter text-[10px] tracking-widest uppercase text-stone mt-0.5">
            {artist.origin} · {artist.genre}
          </p>
        </div>

        <div className="w-1.5 h-1.5 rounded-full bg-neon/40 group-hover:bg-neon transition-colors duration-300 animate-neon-breath flex-shrink-0" />
      </div>
      <p className="font-inter text-xs text-paper/40 italic leading-relaxed">
        "{artist.note}"
      </p>
    </motion.div>
  );
}

export default function MusicCorner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section
      id="music"
      ref={sectionRef}
      data-section="music"
      className="section-pad"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-stone mb-4">
            03 — Music Corner
          </p>
          <h2 className="font-garamond display-md text-paper mb-3">
            A Love Letter to Sound
          </h2>
          <p className="font-inter text-sm text-paper/40 max-w-md">
            International, intentional, and impossibly personal. These are
            the artists who live rent-free in my nervous system.
          </p>
        </motion.div>

        {/* Now Playing card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative mb-16 p-6 md:p-8 border border-neon/20 bg-ink-raised overflow-hidden animate-neon-breath"
        >
          {/* Pulsing ring background */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-neon pointer-events-none"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            {/* Vinyl spinner */}
            <div className="relative w-16 h-16 flex-shrink-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-2 border-stone/40 flex items-center justify-center"
                style={{
                  background: "conic-gradient(from 0deg, hsl(240 4% 11%), hsl(240 3% 18%), hsl(240 4% 11%))",
                }}
              >
                <div className="w-3 h-3 rounded-full bg-neon" />
              </motion.div>
            </div>

            <div className="flex-1">
              <p className="font-inter text-[9px] tracking-[0.3em] uppercase text-neon mb-1">
                ◆ Currently Playing
              </p>
              <p className="font-garamond text-2xl text-paper">{NOW_PLAYING.title}</p>
              <p className="font-inter text-xs text-stone mt-0.5">
                {NOW_PLAYING.artist} · {NOW_PLAYING.album}
              </p>
            </div>

            <div className="flex flex-col gap-1 items-end">
              <p className="font-inter text-xs text-stone/60 tabular-nums">
                {NOW_PLAYING.time}
              </p>
              {/* Progress bar */}
              <div className="w-24 h-px bg-stone/30 relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-neon"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "49%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vibe marquee */}
        <div className="relative overflow-hidden mb-14 py-3 border-y border-stone/20">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {[...VIBES, ...VIBES].map((vibe, i) => (
              <span key={i} className="font-garamond text-lg italic text-stone">
                {vibe}
                <span className="text-neon mx-4">·</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Artist grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ARTISTS.map((artist, i) => (
            <ArtistCard key={artist.name} artist={artist} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
