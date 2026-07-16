import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Itinerary" };

export default function ItineraryPage() {
  return (
    <PageHeader
      eyebrow="The Weekend"
      title="Itinerary"
      intro="The full weekend schedule is being finalized. Check back soon for the complete plan."
    />
  );
}
