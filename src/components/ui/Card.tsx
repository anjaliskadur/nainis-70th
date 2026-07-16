import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-sm bg-cream p-6 shadow-card ring-1 ring-gold-soft/50 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
