import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getGalleryPhotos } from "@/lib/gallery";

export const metadata: Metadata = { title: "Photos" };
export const dynamic = "force-dynamic";

export default function GalleryPage() {
  const photos = getGalleryPhotos();

  return (
    <>
      <PageHeader
        eyebrow="Through the Years"
        title="Photos"
        intro="Moments with Usha — browse every photo from the home page gallery."
      />
      <Section width="wide">
        <p className="mb-8 text-center text-sm font-light text-ink-soft">
          {photos.length === 0
            ? "Waiting for the first photo."
            : `${photos.length} photo${photos.length === 1 ? "" : "s"}`}
        </p>
        <GalleryGrid photos={photos} />
      </Section>
    </>
  );
}
