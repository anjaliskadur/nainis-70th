import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Hotel / Venue" };

export default function HotelVenuePage() {
  return (
    <PageHeader
      eyebrow="Where We're Gathering"
      title="Hotel / Venue"
      intro="Hotel and venue details are being finalized. Check back soon for addresses, booking info, and arrival notes."
    />
  );
}
