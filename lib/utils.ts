/** Joins class names, dropping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** "12.18 Acres" - trims a trailing ".00" so whole numbers read cleanly. */
export function formatAcres(acres: number): string {
  const fixed = acres.toFixed(2).replace(/\.00$/, "");
  return `${fixed} ${acres === 1 ? "Acre" : "Acres"}`;
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatMonth(value: string): string {
  return new Date(value).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

/**
 * Estimates read time from Portable Text at 200 words per minute.
 *
 * Derived rather than hand-entered, so it can never drift out of sync with an
 * edited article.
 */
export function readingTime(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "3 min read";

  let words = 0;
  for (const block of blocks) {
    const children = (block as { children?: { text?: string }[] })?.children;
    if (!Array.isArray(children)) continue;
    for (const child of children) {
      if (typeof child?.text === "string") {
        words += child.text.trim().split(/\s+/).filter(Boolean).length;
      }
    }
  }

  return `${Math.max(1, Math.round(words / 200))} min read`;
}

/** Builds a wa.me link with an optional prefilled message. */
export function whatsappLink(number: string | undefined, message?: string): string {
  const digits = (number ?? "").replace(/\D/g, "");
  if (!digits) return "";
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
