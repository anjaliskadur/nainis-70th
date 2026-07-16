import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
};

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="relative w-full overflow-hidden px-5 pb-14 pt-16 text-center sm:px-8 sm:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-mist via-ivory to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-56 w-[32rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(248,240,241,0.85) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl">
        {eyebrow && <p className="eyebrow mb-4 text-crimson">{eyebrow}</p>}
        <h1 className="text-4xl text-balance sm:text-5xl">{title}</h1>
        {intro && (
          <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-ink-soft">
            {intro}
          </p>
        )}
        <div
          className="mx-auto mt-8 flex items-center justify-center gap-3"
          aria-hidden="true"
        >
          <span className="h-px w-10 bg-gold-soft" />
          <span className="ornament" />
          <span className="h-px w-10 bg-gold-soft" />
        </div>
      </div>
    </header>
  );
}
