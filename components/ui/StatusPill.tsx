import type { ParcelStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Parcel status, as a small squared-off chip.
 *
 * Availability is encoded by **contrast**, not by hue: the parcel you can
 * actually buy is the brightest, solid chip; a parcel under negotiation is
 * marked in the accent; a mandated parcel recedes to an outline. That reads
 * at a glance, survives being placed over any photograph, and stays legible
 * to a colour-blind reader, which a green/amber/grey traffic-light does not.
 *
 * Solid fills rather than translucent tints, because a tinted chip over
 * bright aerial photography washes out to nothing.
 */

const ON_IMAGE: Record<ParcelStatus, string> = {
  Available: "bg-ivory text-navy",
  "Under Negotiation": "bg-gold text-navy",
  Mandated: "bg-navy/75 text-ivory/75 ring-1 ring-ivory/25 backdrop-blur-sm",
};

const ON_PAPER: Record<ParcelStatus, string> = {
  Available: "bg-navy text-ivory",
  "Under Negotiation": "bg-gold text-navy",
  Mandated: "bg-transparent text-navy/55 ring-1 ring-navy/20",
};

export function StatusPill({
  status,
  surface = "dark",
  className,
}: {
  status?: ParcelStatus;
  /** "dark" sits over photography, "light" over ivory paper. */
  surface?: "dark" | "light";
  className?: string;
}) {
  // A parcel can be published before its status is set. Show nothing rather
  // than an empty chip, and treat an unrecognised value as the quiet variant.
  if (!status) return null;
  const table = surface === "dark" ? ON_IMAGE : ON_PAPER;
  const tone = table[status] ?? table.Mandated;

  return (
    <span
      className={cn(
        "label-sm inline-flex items-center rounded-chip px-2.5 py-1.5",
        tone,
        className,
      )}
    >
      {status}
    </span>
  );
}

/**
 * The neutral sibling of the status chip, for facts that carry no state:
 * deal type, zoning, title notes.
 */
export function MetaChip({
  children,
  surface = "dark",
  className,
}: {
  children: React.ReactNode;
  surface?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label-sm inline-flex items-center rounded-chip px-2.5 py-1.5 ring-1",
        surface === "dark"
          ? "bg-navy/60 text-ivory/70 ring-ivory/15 backdrop-blur-sm"
          : "bg-transparent text-navy/55 ring-navy/15",
        className,
      )}
    >
      {children}
    </span>
  );
}
