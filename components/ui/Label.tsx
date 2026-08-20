import { cn } from "@/lib/utils";

/**
 * The small uppercase eyebrow that titles a section. `tone` picks the
 * variant for the surface it sits on, rather than callers hand-picking colours.
 */
export function Label({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light" | "gold";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label block",
        tone === "dark" && "text-navy/45",
        tone === "light" && "text-ivory/45",
        tone === "gold" && "text-gold",
        className,
      )}
    >
      {children}
    </span>
  );
}
