# Usha's 70th Birthday Celebration

A luxurious, mobile-first event website for Usha's 70th birthday in Houston (December 19, 2026). Built to be easy to navigate for guests of all ages, with large text, big tap targets, and a subtle 3D hero.

> Reminder: this celebration is a **surprise**. Please don't mention it to Usha.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for gentle scroll reveals
- Soft CSS atmosphere (floating light orbs) on the hero — no WebGL
- Fonts: Cormorant Garamond (headings) + Outfit (body) via `next/font`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Database (Supabase)

Guest data (Memory Wall messages and media) is stored in **Supabase**.

### 1. Create a project
1. Go to [supabase.com](https://supabase.com) and create a free project.
2. Open **Project Settings → API** and copy:
   - Project URL
   - `anon` `public` key

### 2. Add env keys
```bash
cp .env.local.example .env.local
```
Paste your URL and anon key into `.env.local`, then restart `npm run dev`.

### 3. Create tables + storage
1. In Supabase, open **SQL Editor**.
2. Paste and run the full script in [`supabase/schema.sql`](supabase/schema.sql).

That creates:
- `memories` — Memory Wall messages (+ optional photo/video URLs)
- Storage bucket `memory-media` (public read/upload)
- Edit/delete RPCs so guests can change messages they posted on the same device

If the project already had an older `memories` table, run [`supabase/migration-memory-edit.sql`](supabase/migration-memory-edit.sql) in the SQL Editor (safe to re-run). Fresh projects can use [`supabase/schema.sql`](supabase/schema.sql).

### Where data lives
| Data | Table / bucket |
|------|----------------|
| Memory messages | `memories` |
| Memory media (photos & videos) | `memory-media` storage |

Without `.env.local`, the site still builds and shows sample/mock content.

## Editing content

All copy lives in one place: [`src/content/site.ts`](src/content/site.ts).

- **Confirmed details** (event date, RSVP link, host contacts, arrival time, parking, colors, attire) are already filled in.
- **Anything marked `PLACEHOLDER`** (hotel, addresses, map links, airport/transport notes, full menus, performance lineup, deadlines) is safe to update there without touching any components.

The RSVP button points to the Partiful invite defined at the top of that file.

## Project structure

```
src/
  app/                      # routes + layout + globals.css
  components/
    layout/                 # Nav, Footer, SurpriseBanner, SurpriseModal
    ui/                     # Button, Section, Card, Accordion, PageHeader, Reveal
    home/                   # HeroAtmosphere
    memory/                 # MemoryForm, MemoryWall
  content/site.ts           # all site copy + placeholders
  lib/                      # data layer + Supabase client
  types/database.ts         # Supabase table types
supabase/schema.sql         # DB + storage setup script
```

## Accessibility & mobile notes

- Type is kept clear and readable with comfortable line-height for older guests, without feeling oversized.
- All interactive elements meet a minimum ~44px tap target.
- Navigation opens as a compact dropdown panel (not a full-screen overlay).
- The surprise modal has large, stacked buttons (no tiny close-only dismiss).
- Host phone numbers are `tel:` links for one-tap calling.
- Soft CSS atmosphere honors `prefers-reduced-motion`.

## Deploying

This is a standard Next.js app and deploys cleanly to [Vercel](https://vercel.com/). Add the same `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars in Vercel. The site is set to `noindex` so it won't show up in search results while it's a surprise.
