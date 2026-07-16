import { site } from "@/content/site";

export function SurpriseBanner() {
  return (
    <div className="border-b border-gold-soft/50 bg-mist/80">
      <p className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-5 py-2.5 text-center text-xs font-light tracking-wide text-ink-soft sm:px-8 sm:text-sm">
        <span className="ornament" aria-hidden="true" />
        {site.surprise.bannerText}
      </p>
    </div>
  );
}
