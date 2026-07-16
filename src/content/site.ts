/**
 * Single source of truth for all site copy.
 *
 * Anything marked PLACEHOLDER is safe to edit later without touching components.
 * Real, confirmed details (event, RSVP link, contacts, fixed logistics) are filled in.
 */

export type NavLink = {
  href: string;
  label: string;
  /** Short label used in tight spaces (e.g. mobile). */
  shortLabel?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

const PARTIFUL_URL = "https://partiful.com/e/eyhdp7Xm4acMQhVWv7m1";

export const site = {
  event: {
    title: "Usha's 70th Birthday Celebration",
    honoree: "Usha",
    age: 70,
    date: "December 19, 2026",
    dateShort: "Dec 19, 2026",
    city: "Houston, Texas",
    tagline:
      "Join us for a weekend celebrating Usha's 70th birthday with family, food, performances, and memories.",
    welcome:
      "We are so glad you're here. This is a weekend to gather the people Usha loves most \u2014 to share meals, watch performances, dance, and celebrate seventy wonderful years. Explore the site for everything you'll need to join us.",
  },

  rsvp: {
    url: PARTIFUL_URL,
    label: "RSVP on Partiful",
    note: "RSVPs are handled through our Partiful invite.",
  },

  surprise: {
    honoreeNotToTell: "Usha",
    modalTitle: "Shhh \u2014 it's a surprise!",
    modalBody:
      "This celebration is a surprise. Please do not mention it, the website, or any details to Usha.",
    bannerText:
      "Reminder: this is a surprise \u2014 please don't mention it to Usha.",
    confirmLabel: "Got it",
    remindLabel: "Tell me again",
    arrivalWarning:
      "Please arrive by 11:45 AM so everyone is seated before the surprise.",
  },

  // Fixed logistics confirmed in the brief.
  logistics: {
    arrivalTime: "11:45 AM",
    parking: "Street parking",
    venueType: "Indoor",
    colorScheme: ["Red", "White"],
    lunchAttire: "Indo-western",
    dinnerAttire: "Cocktail attire",
  },

  contacts: [
    {
      name: "Anu",
      phone: "(956) 639-4016",
      phoneHref: "tel:+19566394016",
      role: "Host & main contact",
    },
    {
      name: "Anjali",
      phone: "(832) 707-1231",
      phoneHref: "tel:+18327071231",
      role: "Host & main contact",
    },
  ],

  nav: [
    { href: "/", label: "Home" },
    { href: "/itinerary", label: "Itinerary" },
    { href: "/menu", label: "Menu" },
    { href: "/dress-code", label: "Dress Code", shortLabel: "Dress" },
    { href: "/hotel-venue", label: "Hotel / Venue", shortLabel: "Hotel" },
    { href: "/gallery", label: "Photos" },
    { href: "/memory-wall", label: "Memory Wall", shortLabel: "Memories" },
  ] satisfies NavLink[],

  dressCode: {
    intro:
      "Our celebration colors are red and white. We'd love for you to weave these tones into your outfits throughout the weekend.",
    palette: [
      { name: "Red", hex: "#d17a82" },
      { name: "White", hex: "#ffffff" },
    ],
    events: [
      {
        event: "Saturday Lunch",
        attire: "Indo-western",
        note: "Bright, festive, and comfortable for daytime.",
      },
      {
        event: "Saturday Dinner",
        attire: "Cocktail attire",
        note: "Elevated evening looks for dinner and dancing.",
      },
    ],
    inspirationNote:
      "Outfit inspiration photos will be added here soon.",
  },

  memoryWall: {
    intro:
      "Leave a note for Usha, share a favorite memory, or upload a photo. If you can't join us for the weekend, record a short video message here — we'll share it during the celebration.",
    prompt: "Share a message, memory, or photo for Usha.",
    videoNote:
      "Can't make it? Upload a short video message (MP4, MOV, or WebM).",
  },

  faq: [
    {
      question: "Is this a surprise?",
      answer:
        "Yes! This celebration is a surprise. Please do not mention it, or this website, to Usha.",
    },
    {
      question: "What time should I arrive?",
      answer:
        "Please arrive and be seated by 11:45 AM on Saturday so everyone is ready before the surprise.",
    },
    {
      question: "What should I wear?",
      answer:
        "Our colors are red and white. Lunch is Indo-western; dinner is cocktail attire. See the Dress Code page for details.",
    },
    {
      question: "Where should I stay?",
      answer:
        "We have a room block for out-of-town guests. See the Hotel / Venue page for hotel and venue details.",
    },
    {
      question: "Who do I contact with questions?",
      answer:
        "Reach out to Anu at (956) 639-4016 or Anjali at (832) 707-1231. Please do not contact Usha about the event.",
    },
    {
      question: "Where can I leave a message or video?",
      answer:
        "Visit the Memory Wall to share a note, photo, or memory. If you can't attend the weekend, you can upload a video message there too.",
    },
    {
      question: "Will food be provided?",
      answer:
        "Yes \u2014 lunch, dinner, a chaat counter, cocktails, and dessert. See the Menu page.",
    },
    {
      question: "Are there dietary accommodations?",
      answer:
        "Yes. Please note any dietary needs in your RSVP or let a host know, and we'll accommodate them.",
    },
    {
      question: "Is parking available?",
      answer: "Street parking is available near the venue.",
    },
  ] satisfies FaqItem[],

  meta: {
    siteName: "Usha's 70th",
    description:
      "A weekend celebrating Usha's 70th birthday in Houston \u2014 December 19, 2026.",
  },
};

export type Site = typeof site;
