import Image from "next/image";

import type { ImageSource } from "@/lib/types";
import { urlForImage } from "@/sanity/image";
import { cn } from "@/lib/utils";

/**
 * Wraps next/image so components can pass either a Sanity asset or a plain
 * URL. Renders a neutral placeholder rather than a broken image when a source
 * is missing - which happens routinely while the client is still filling in
 * content.
 */
export function SmartImage({
  source,
  alt,
  width,
  height,
  className,
  sizes,
  priority,
  fill,
}: {
  source: ImageSource | undefined | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  const src = urlForImage(source, fill ? { width: 1600 } : { width, height });

  if (!src) {
    return (
      <div
        className={cn("bg-ivory-shade", fill && "absolute inset-0", className)}
        aria-hidden
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 900}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
