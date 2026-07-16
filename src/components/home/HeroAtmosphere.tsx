"use client";

/**
 * Soft pearl + rose atmosphere — quiet luxury, no yellow.
 */
export function HeroAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-mist via-ivory to-cream" />

      {/* Soft pearl bloom */}
      <div
        className="orb-float-a absolute -right-[12%] top-[-8%] h-[65vmin] w-[65vmin] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(244,241,238,0.6) 40%, transparent 70%)",
        }}
      />

      {/* Soft pearl gleam */}
      <div
        className="orb-float-c absolute bottom-[-5%] right-[15%] h-[40vmin] w-[50vmin] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(213,207,199,0.28) 0%, transparent 70%)",
        }}
      />

      {/* Soft veil behind title */}
      <div
        className="absolute left-1/2 top-[42%] h-[34vmin] w-[min(90vw,40rem)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(251,250,248,0.95) 0%, rgba(251,250,248,0.4) 55%, transparent 75%)",
        }}
      />
    </div>
  );
}
