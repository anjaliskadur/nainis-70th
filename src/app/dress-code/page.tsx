import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Dress Code" };

export default function DressCodePage() {
  return (
    <>
      <PageHeader
        eyebrow="Style Guide"
        title="Dress Code"
        intro={site.dressCode.intro}
      />
      <Section width="wide">
        <Reveal>
          <h2 className="text-center text-3xl sm:text-4xl">Our Colors</h2>
          <ul className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-8">
            {site.dressCode.palette.map((color) => (
              <li key={color.name} className="flex flex-col items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-20 w-20 rounded-full shadow-card ring-1 ring-gold-soft/50"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-lg font-medium text-ink">
                  {color.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mx-auto mt-20 max-w-4xl">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="eyebrow text-crimson">Attire</p>
              <h2 className="mt-3 font-display text-3xl font-normal sm:text-4xl">
                What to wear
              </h2>
            </div>
          </Reveal>

          <ul className="grid gap-14 sm:grid-cols-2 sm:gap-0">
            {site.dressCode.events.map((event, i) => (
              <li
                key={event.event}
                className={`text-center sm:px-10 ${
                  i > 0
                    ? "border-t border-gold-soft/50 pt-14 sm:border-l sm:border-t-0 sm:pt-0"
                    : ""
                }`}
              >
                <Reveal delay={i * 0.06}>
                  <p className="eyebrow text-gold">{event.event}</p>
                  <p className="mt-5 font-display text-3xl font-normal tracking-tight text-ink sm:text-[2.15rem]">
                    {event.attire}
                  </p>
                  <div
                    className="mx-auto mt-6 flex items-center justify-center gap-3"
                    aria-hidden="true"
                  >
                    <span className="h-px w-6 bg-gold-soft" />
                    <span className="ornament" />
                    <span className="h-px w-6 bg-gold-soft" />
                  </div>
                  <p className="mx-auto mt-6 max-w-xs text-sm font-light leading-relaxed tracking-wide text-ink-soft">
                    {event.note}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          <p className="mx-auto mt-20 max-w-lg text-center text-sm font-light tracking-wide text-ink-soft">
            {site.dressCode.inspirationNote}
          </p>
        </Reveal>
      </Section>
    </>
  );
}
