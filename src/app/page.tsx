import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { HeroAtmosphere } from "@/components/home/HeroAtmosphere";
import { PhotoMarquee } from "@/components/home/PhotoMarquee";

function OrnamentRule() {
  return (
    <div className="mx-auto flex items-center justify-center gap-3" aria-hidden="true">
      <span className="h-px w-10 bg-gold-soft" />
      <span className="ornament" />
      <span className="h-px w-10 bg-gold-soft" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[calc(100svh-5.5rem)] items-center justify-center overflow-hidden px-5 py-24 text-center sm:px-8">
        <HeroAtmosphere />
        <div className="relative z-10 mx-auto max-w-2xl">
          <p className="eyebrow text-crimson">You&apos;re Invited</p>
          <h1 className="mt-7 text-balance text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl">
            {site.event.title}
          </h1>
          <div className="mt-8">
            <OrnamentRule />
          </div>
          <p className="mt-7 text-sm font-normal tracking-[0.22em] text-ink-soft uppercase">
            {site.event.date}
            <span className="mx-3 text-gold" aria-hidden="true">
              ·
            </span>
            {site.event.city}
          </p>
          <p className="mx-auto mt-6 max-w-md text-[0.95rem] font-light leading-relaxed text-ink-soft sm:text-base">
            {site.event.tagline}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={site.rsvp.url} external size="lg" className="w-full sm:w-auto">
              {site.rsvp.label}
            </Button>
            <Button
              href="/memory-wall"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Memory Wall
            </Button>
          </div>
        </div>
      </section>

      <div className="border-y border-gold-soft/50 bg-mist/70">
        <Section width="prose" className="py-7 text-center">
          <Reveal>
            <p className="text-[0.95rem] font-normal text-ink sm:text-base">
              {site.surprise.bannerText}
            </p>
            <p className="mt-1.5 text-sm font-light text-ink-soft">
              {site.surprise.arrivalWarning}
            </p>
          </Reveal>
        </Section>
      </div>

      <Section width="prose" className="text-center">
        <Reveal>
          <p className="eyebrow text-crimson">Welcome</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">A weekend of celebration</h2>
          <div className="mt-6">
            <OrnamentRule />
          </div>
          <p className="mt-6 text-base font-light leading-relaxed text-ink-soft">
            {site.event.welcome}
          </p>
        </Reveal>
      </Section>

      <div className="overflow-hidden border-t border-gold-soft/40 bg-mist/60 pb-16 pt-12 sm:pb-20 sm:pt-14">
        <Reveal>
          <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
            <p className="eyebrow text-crimson">Explore</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Through the years</h2>
            <p className="mt-3 text-sm font-light text-ink-soft">
              A glimpse of Usha&apos;s life — more photos coming soon.
            </p>
          </div>
        </Reveal>
        <div className="mt-10">
          <PhotoMarquee photos={site.homeMarquee} />
        </div>
      </div>
    </>
  );
}
