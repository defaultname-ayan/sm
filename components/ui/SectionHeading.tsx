import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";

/**
 * The heading that opens each section, with an optional eyebrow.
 *
 * The eyebrow is deliberately optional and deliberately rare. An uppercase
 * micro-label above every single section produces a templated rhythm that
 * reads as generated; the page budget is roughly one eyebrow per three
 * sections, and a section's position on the page already categorises it.
 */
export function SectionHeading({
  eyebrow,
  heading,
  intro,
  surface = "light",
  className,
  align = "start",
  children,
}: {
  /** Omit unless this section genuinely needs naming. See the note above. */
  eyebrow?: string;
  heading: string;
  intro?: string;
  /** The surface it sits on - "light" means ivory paper, "dark" means navy. */
  surface?: "light" | "dark";
  className?: string;
  align?: "start" | "between";
  children?: React.ReactNode;
}) {
  return (
    <ScrollReveal className={cn("mb-12 md:mb-16", className)}>
      <div
        className={cn(
          "flex flex-col gap-6",
          align === "between" && "md:flex-row md:items-end md:justify-between",
        )}
      >
        <div className="max-w-3xl">
          {eyebrow && (
            <Label tone={surface === "dark" ? "gold" : "dark"}>{eyebrow}</Label>
          )}
          <h2
            className={cn(
              "font-display text-title font-medium text-balance",
              eyebrow && "mt-4",
              surface === "dark" ? "text-ivory" : "text-navy",
            )}
          >
            {heading}
          </h2>
          {intro && (
            <p
              className={cn(
                "mt-5 max-w-2xl text-lede",
                surface === "dark" ? "text-ivory/55" : "text-navy/60",
              )}
            >
              {intro}
            </p>
          )}
        </div>
        {children}
      </div>
    </ScrollReveal>
  );
}
