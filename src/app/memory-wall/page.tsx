import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MemoryForm } from "@/components/memory/MemoryForm";
import { MemoryWall } from "@/components/memory/MemoryWall";
import { getMemories } from "@/lib/memory";

export const metadata: Metadata = { title: "Memory Wall" };
export const dynamic = "force-dynamic";

export default async function MemoryWallPage() {
  const { memoryWall } = site;
  const memories = await getMemories();

  return (
    <>
      <PageHeader
        eyebrow="From the Heart"
        title="Memory Wall"
        intro={memoryWall.intro}
      />

      <Section width="prose">
        <Reveal>
          <div className="rounded-sm bg-cream p-6 shadow-card ring-1 ring-gold-soft/50 sm:p-8">
            <p className="eyebrow text-crimson">Leave a note</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              {memoryWall.prompt}
            </h2>
            <div className="mt-6">
              <MemoryForm videoNote={memoryWall.videoNote} />
            </div>
          </div>
        </Reveal>
      </Section>

      <div className="border-t border-gold-soft/40 bg-mist/30">
        <Section width="wide">
          <Reveal>
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="eyebrow text-crimson">The Wall</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">Messages for Usha</h2>
              <p className="mt-3 text-sm font-light text-ink-soft">
                {memories.length === 0
                  ? "Waiting for the first message."
                  : `${memories.length} message${memories.length === 1 ? "" : "s"} shared`}
              </p>
              <p className="mt-2 text-xs font-light text-ink-soft/80">
                You can edit or delete a message from the same device that
                posted it.
              </p>
            </div>
          </Reveal>
          <MemoryWall memories={memories} />
        </Section>
      </div>
    </>
  );
}
