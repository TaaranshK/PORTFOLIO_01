"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import shimlaFootsteps from "@/assets/shimla/shimla-footsteps.jpeg";
import shimlaQuietEstate from "@/assets/shimla/shimla-quiet-estate.jpeg";
import shimlaBetweenCedars from "@/assets/shimla/shimla-between-cedars.jpeg";
import shimlaEveningHush from "@/assets/shimla/shimla-evening-hush.jpeg";
import udaipurFolkStage from "@/assets/Udaipur/udaipur-folk-stage.jpeg";
import udaipurLakeNight from "@/assets/Udaipur/udaipur-lake-night.jpeg";
import udaipurCityPalaceA from "@/assets/Udaipur/udaipur-city-palace-a.jpeg";
import udaipurAtrium from "@/assets/Udaipur/udaipur-atrium.jpeg";
import udaipurCityPalaceB from "@/assets/Udaipur/udaipur-city-palace-b.jpeg";

interface CollageShot {
  src: string;
  label: string;
  position: string;
  layout: string;
  hideLabel?: boolean;
}

const SHIMLA_SHOTS: CollageShot[] = [
  {
    src: shimlaFootsteps,
    label: "Footsteps In Snow",
    position: "50% 60%",
    layout: "col-span-2 row-span-1",
    hideLabel: true,
  },
  {
    src: shimlaBetweenCedars,
    label: "Between Cedars",
    position: "52% 58%",
    layout: "col-span-1 row-span-2",
  },
  {
    src: shimlaQuietEstate,
    label: "The Quiet Estate",
    position: "50% 70%",
    layout: "col-span-1 row-span-1",
  },
  {
    src: shimlaEveningHush,
    label: "Evening Hush",
    position: "50% 72%",
    layout: "col-span-1 row-span-1",
  },
];

const UDAIPUR_SHOTS: CollageShot[] = [
  {
    src: udaipurLakeNight,
    label: "Lake After Dark",
    position: "50% 56%",
    layout: "col-span-2 row-span-1",
  },
  {
    src: udaipurCityPalaceA,
    label: "Palace Facade",
    position: "52% 54%",
    layout: "col-span-1 row-span-2",
  },
  {
    src: udaipurFolkStage,
    label: "Courtyard Rhythm",
    position: "50% 54%",
    layout: "col-span-1 row-span-1",
  },
  {
    src: udaipurAtrium,
    label: "City Galleria",
    position: "50% 50%",
    layout: "col-span-1 row-span-1",
  },
  {
    src: udaipurCityPalaceB,
    label: "Waterside Palace",
    position: "50% 62%",
    layout: "col-span-2 row-span-1",
  },
];

function CollageBlock({
  title,
  sideLabel,
  shots,
  gridClass,
}: {
  title: string;
  sideLabel: string;
  shots: CollageShot[];
  gridClass: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="mb-10 overflow-hidden rounded-2xl border border-stone/20 bg-ink/80 p-3 md:p-4"
    >
      <div className="mb-4 flex items-end justify-between gap-4 px-1">
        <div>
          <p className="font-inter text-[10px] uppercase tracking-[0.28em] text-stone/80">
            Featured Collage
          </p>
          <h3 className="font-garamond text-3xl text-paper">{title}</h3>
        </div>
        <p className="font-inter hidden text-[10px] uppercase tracking-[0.24em] text-stone md:block">
          {sideLabel}
        </p>
      </div>

      <div className={`grid grid-cols-2 gap-3 ${gridClass}`}>
        {shots.map((shot) => (
          <div key={shot.label} className={`group relative overflow-hidden rounded-xl ${shot.layout}`}>
            <img
              src={shot.src}
              alt={shot.label}
              loading="lazy"
              style={{ objectPosition: shot.position }}
              className="h-full w-full object-cover saturate-[0.9] contrast-110 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            {!shot.hideLabel && (
              <p className="absolute bottom-3 left-3 font-inter text-[10px] uppercase tracking-[0.2em] text-paper/80">
                {shot.label}
              </p>
            )}
          </div>
        ))}
      </div>
    </motion.article>
  );
}

export default function InterviewChronicle() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section id="chronicle" className="section-pad bg-ink-raised">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-stone mb-4">
            02 - Wander Notes
          </p>
          <h2 className="font-garamond display-md text-paper mb-3">Wander Diary</h2>
          <p className="font-inter text-sm text-paper/40 max-w-md">
            Two aesthetic stories: snow tones of Shimla and royal hues of Udaipur.
          </p>
        </motion.div>

        <CollageBlock
          title="Snowveil Shimla"
          sideLabel="Winter Frames"
          shots={SHIMLA_SHOTS}
          gridClass="h-[560px] grid-rows-3 md:h-[680px]"
        />

        <CollageBlock
          title="Moonlight Udaipur"
          sideLabel="Five Frames"
          shots={UDAIPUR_SHOTS}
          gridClass="h-[860px] grid-rows-5 md:h-[980px]"
        />
      </div>
    </section>
  );
}
