import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gold-soft/60 bg-mist/40 text-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8">
        <div>
          <p className="font-display text-2xl font-normal tracking-tight">
            {site.event.title}
          </p>
          <p className="mt-3 text-sm font-light tracking-wide text-ink-soft">
            {site.event.dateShort} · {site.event.city}
          </p>
          <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-ink-soft">
            {site.surprise.bannerText}
          </p>
        </div>

        <div className="sm:justify-self-end">
          <p className="eyebrow text-crimson">Questions?</p>
          <ul className="mt-4 space-y-2.5">
            {site.contacts.map((c) => (
              <li key={c.name}>
                <a
                  href={c.phoneHref}
                  className="text-base font-light text-ink transition-colors hover:text-crimson"
                >
                  {c.name}: {c.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gold-soft/40">
        <p className="mx-auto max-w-7xl px-5 py-4 text-center text-xs font-light text-ink-soft/80 sm:px-8">
          Made with love for Usha&apos;s 70th · Please keep it a secret from{" "}
          {site.surprise.honoreeNotToTell}.
        </p>
      </div>
    </footer>
  );
}
