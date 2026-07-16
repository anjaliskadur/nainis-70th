"use client";

import { useState } from "react";

export type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gold-soft/60 overflow-hidden rounded-sm bg-cream shadow-card ring-1 ring-gold-soft/50">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <div key={item.question}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-normal text-ink transition-colors hover:bg-mist/60"
              >
                <span className="font-sans">{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-xl leading-none text-crimson-soft transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-6 pb-6 text-base font-light leading-relaxed text-ink-soft"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
