import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Menu" };

export default function MenuPage() {
  return (
    <PageHeader
      eyebrow="Food & Drink"
      title="Menu"
      intro="Menus for the weekend are being finalized. Check back soon for the full spread."
    />
  );
}
