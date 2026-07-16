import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Good to Know"
        title="Frequently Asked Questions"
        intro="Everything you might be wondering about the weekend."
      />
      <Section width="prose">
        <Accordion items={site.faq} />
      </Section>
    </>
  );
}
