import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-normal tracking-[0.14em] uppercase transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-center";

const sizes: Record<Size, string> = {
  md: "min-h-[42px] px-7 py-2.5 text-[0.7rem]",
  lg: "min-h-[48px] px-9 py-3 text-[0.75rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "rounded-sm bg-ink text-cream hover:bg-crimson",
  secondary:
    "rounded-sm bg-transparent text-ink ring-1 ring-ink/20 hover:ring-crimson hover:text-crimson",
  ghost: "rounded-sm text-crimson hover:bg-blush",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
  } = props;
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props;
    const isExternal = external ?? /^https?:\/\//.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
