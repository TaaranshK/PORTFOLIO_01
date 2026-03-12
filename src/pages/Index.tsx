import { useState } from "react";
import { PageLoader } from "@/components/layout/PageLoader";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { LenisProvider } from "@/lib/LenisProvider";

export default function Index() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <PageLoader onComplete={() => setLoaded(true)} />
      <CustomCursor />
      <ScrollProgress />

      {loaded && (
        <LenisProvider>
          <Navbar />
          <main className="relative bg-background overflow-hidden">
            <Hero />

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <About />

            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <Skills />

            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <Experience />

            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <Projects />

            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <Certifications />

            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <Contact />
          </main>
        </LenisProvider>
      )}
    </>
  );
}
