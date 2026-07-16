"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      ref={menuRef}
      className="sticky top-0 z-40 border-b border-gold-soft/50 bg-ivory/80 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
        <Link
          href="/"
          onClick={close}
          className="font-display text-xl font-normal tracking-tight text-ink sm:text-2xl"
        >
          Usha&apos;s 70th
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            href={site.rsvp.url}
            external
            size="md"
            className="hidden sm:inline-flex"
          >
            RSVP
          </Button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="main-menu"
            aria-haspopup="true"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-sm bg-transparent px-4 text-[0.7rem] font-normal uppercase tracking-[0.14em] text-ink ring-1 ring-ink/15 transition-colors hover:text-crimson hover:ring-crimson/40"
          >
            <span className="text-sm font-normal tracking-wide">Menu</span>
            <span aria-hidden="true" className="text-base leading-none">
              {open ? "\u2715" : "\u2630"}
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="main-menu"
          role="menu"
          className="absolute right-5 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden rounded-sm bg-cream shadow-luxe ring-1 ring-gold-soft/70 sm:right-8"
        >
          <ul className="max-h-[min(70vh,28rem)] overflow-y-auto py-2">
            {site.nav.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href} role="none">
                  <Link
                    role="menuitem"
                    href={link.href}
                    onClick={close}
                    className={`flex min-h-[48px] items-center justify-between px-5 py-2.5 text-base font-light transition-colors ${
                      active
                        ? "bg-mist/80 text-crimson"
                        : "text-ink hover:bg-mist/50 hover:text-crimson"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      aria-hidden="true"
                      className={active ? "text-crimson" : "text-gold"}
                    >
                      {active ? "\u2022" : "\u2192"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-gold-soft/50 p-3 sm:hidden">
            <Button href={site.rsvp.url} external size="md" className="w-full">
              {site.rsvp.label}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
