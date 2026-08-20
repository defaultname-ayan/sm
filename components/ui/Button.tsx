import Link from "next/link";

import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost" | "gold";

const BASE =
  "label-sm inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 " +
  "transition-[background-color,border-color,color,transform] duration-300 ease-[var(--ease-out-soft)] " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-navy text-ivory hover:bg-navy-raised",
  gold: "bg-gold text-navy hover:bg-gold-bright",
  outline:
    "border border-current/25 text-current hover:border-current/55 hover:bg-current/5",
  ghost: "text-current hover:bg-current/8",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "solid",
  className,
  children,
  external,
  ...rest
}: CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const classes = cn(BASE, VARIANTS[variant], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
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

export function SubmitButton({
  variant = "gold",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(BASE, VARIANTS[variant], className)} {...rest}>
      {children}
    </button>
  );
}
