import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** Constrains inner width. Defaults to a comfortable reading width. */
  width?: "prose" | "wide" | "full";
  as?: "section" | "div" | "article";
};

const widths = {
  prose: "max-w-2xl",
  wide: "max-w-5xl",
  full: "max-w-7xl",
};

export function Section({
  children,
  className = "",
  width = "wide",
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag className={`w-full px-5 py-12 sm:px-8 sm:py-16 ${className}`}>
      <div className={`mx-auto ${widths[width]}`}>{children}</div>
    </Tag>
  );
}
