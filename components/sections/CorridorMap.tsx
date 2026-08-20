"use client";

import Link from "next/link";
import { useState } from "react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Parcel } from "@/lib/types";
import { cn, formatAcres } from "@/lib/utils";

/**
 * Schematic map of the Hyderabad region, paired with a linked list.
 *
 * Markers are projected from each parcel's real latitude and longitude, so a
 * parcel added in the CMS lands in the right place without anyone editing
 * this file.
 *
 * Two deliberate choices follow from that:
 *
 * 1. Labels live in HTML beside the map, not as <text> inside the SVG. SVG
 *    text scales with the viewBox, so any size that reads well on a desktop
 *    is illegible on a phone.
 * 2. Real parcels cluster - Nandigama and Shadnagar North are about 2 km
 *    apart - so per-marker labels would collide into an unreadable pile. The
 *    list carries the names; the map carries the geography.
 */

const BOUNDS = { lngMin: 77.7, lngMax: 79.1, latMin: 16.85, latMax: 17.85 };
const VIEW = { w: 100, h: 70 };

function project(lat: number, lng: number) {
  const x = ((lng - BOUNDS.lngMin) / (BOUNDS.lngMax - BOUNDS.lngMin)) * VIEW.w;
  const y = ((BOUNDS.latMax - lat) / (BOUNDS.latMax - BOUNDS.latMin)) * VIEW.h;
  return { x, y };
}

const HYDERABAD = project(17.385, 78.4867);
const AIRPORT = project(17.2403, 78.4294);

/** Degrees → viewBox units, so ring radii can be written as real distances. */
const degToX = (d: number) => (d / (BOUNDS.lngMax - BOUNDS.lngMin)) * VIEW.w;
const degToY = (d: number) => (d / (BOUNDS.latMax - BOUNDS.latMin)) * VIEW.h;

const HIGHWAYS = [
  { key: "nh44s", to: project(16.9, 78.15) },
  { key: "nh44n", to: project(17.82, 78.72) },
  { key: "nh65w", to: project(17.62, 77.75) },
  { key: "nh163e", to: project(17.28, 79.05) },
];

/**
 * Marker treatment matches the status chips: available parcels are the
 * brightest, negotiation is the accent, mandated recedes. Same reasoning,
 * same reading, and no traffic-light hues.
 */
const STATUS_COLOR: Record<string, string> = {
  Available: "#f7f5f2",
  "Under Negotiation": "#d9b64a",
  Mandated: "#7b88a6",
};

export function CorridorMap({
  parcels,
  heading,
}: {
  parcels: Parcel[];
  heading?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  const plotted = parcels.filter((p) => p.coordinates);
  if (plotted.length === 0) return null;

  return (
    <section id="corridors" className="bg-navy py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          heading={heading ?? "Hyderabad's emerging land belts."}
          surface="dark"
        />

        <div className="grid gap-px overflow-hidden rounded-panel bg-ivory/8 lg:grid-cols-[1.35fr_1fr]">
          {/* Map */}
          <div className="bg-[#0a1426] p-4 sm:p-6">
            {/* The labels below are positioned as a percentage of THIS box, so
                it must wrap the svg exactly - no padding of its own. */}
            <div className="relative">
              <svg
                viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
                className="block w-full"
                role="img"
                aria-label={`Schematic map showing ${plotted.length} land parcels across the Hyderabad region`}
              >
                <defs>
                  <pattern
                    id="corridor-grid"
                    width="5"
                    height="5"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 5 0 L 0 0 0 5"
                      fill="none"
                      stroke="rgba(247,245,242,0.04)"
                      strokeWidth="0.15"
                    />
                  </pattern>
                </defs>
                <rect
                  width={VIEW.w}
                  height={VIEW.h}
                  fill="url(#corridor-grid)"
                />

                {/* Regional Ring Road */}
                <ellipse
                  cx={HYDERABAD.x}
                  cy={HYDERABAD.y}
                  rx={degToX(0.52)}
                  ry={degToY(0.52)}
                  fill="none"
                  stroke="rgba(196,178,150,0.28)"
                  strokeWidth="0.3"
                  strokeDasharray="2 2"
                />
                {/* Outer Ring Road */}
                <ellipse
                  cx={HYDERABAD.x}
                  cy={HYDERABAD.y}
                  rx={degToX(0.16)}
                  ry={degToY(0.16)}
                  fill="none"
                  stroke="rgba(201,162,39,0.38)"
                  strokeWidth="0.35"
                  strokeDasharray="1.4 1"
                />

                {HIGHWAYS.map((road) => (
                  <line
                    key={road.key}
                    x1={HYDERABAD.x}
                    y1={HYDERABAD.y}
                    x2={road.to.x}
                    y2={road.to.y}
                    stroke="rgba(247,245,242,0.11)"
                    strokeWidth="0.35"
                  />
                ))}

                {/* Metro core and airport - reference points, not inventory */}
                <circle
                  cx={HYDERABAD.x}
                  cy={HYDERABAD.y}
                  r="1.1"
                  fill="rgba(247,245,242,0.15)"
                  stroke="rgba(247,245,242,0.45)"
                  strokeWidth="0.25"
                />
                <circle
                  cx={AIRPORT.x}
                  cy={AIRPORT.y}
                  r="0.6"
                  fill="rgba(196,178,150,0.3)"
                  stroke="rgba(196,178,150,0.6)"
                  strokeWidth="0.2"
                />

                {plotted.map((parcel) => {
                  const { x, y } = project(
                    parcel.coordinates!.lat,
                    parcel.coordinates!.lng,
                  );
                  const isActive = active === parcel._id;
                  const color = STATUS_COLOR[parcel.status] ?? "#c9a227";

                  return (
                    <g key={parcel._id} style={{ transition: "opacity 300ms" }}>
                      {isActive && (
                        <circle
                          cx={x}
                          cy={y}
                          r="2.8"
                          fill={color}
                          opacity="0.18"
                        />
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={isActive ? 1.3 : 0.95}
                        fill={isActive ? color : "transparent"}
                        stroke={color}
                        strokeWidth="0.3"
                        style={{ transition: "all 300ms" }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* HTML labels for the two fixed reference points only - they never
                collide, and they orient the reader. */}
              <span
                className="label-sm pointer-events-none absolute hidden text-ivory/50 sm:block"
                style={{
                  left: `${HYDERABAD.x}%`,
                  top: `${(HYDERABAD.y / VIEW.h) * 100}%`,
                  transform: "translate(1.05rem, -50%)",
                }}
              >
                Hyderabad
              </span>
              <span
                className="label-sm pointer-events-none absolute hidden text-ivory/30 sm:block"
                style={{
                  left: `${AIRPORT.x}%`,
                  top: `${(AIRPORT.y / VIEW.h) * 100}%`,
                  transform: "translate(0.85rem, -50%)",
                }}
              >
                RGIA
              </span>
            </div>
          </div>

          {/* Linked list */}
          <div className="bg-[#0a1426]">
            <ul>
              {plotted.map((parcel) => {
                const color = STATUS_COLOR[parcel.status] ?? "#c9a227";
                const isActive = active === parcel._id;

                return (
                  <li key={parcel._id}>
                    <Link
                      href={`/land-bank/${parcel.slug}`}
                      onMouseEnter={() => setActive(parcel._id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(parcel._id)}
                      onBlur={() => setActive(null)}
                      className={cn(
                        "flex items-center gap-4 border-b border-ivory/6 px-5 py-4 transition-colors duration-300 last:border-b-0",
                        isActive ? "bg-ivory/6" : "hover:bg-ivory/4",
                      )}
                    >
                      <span
                        aria-hidden
                        className="size-2 shrink-0 rounded-full border transition-all duration-300"
                        style={{
                          borderColor: color,
                          backgroundColor: isActive ? color : "transparent",
                        }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="label-sm block text-ivory/80">
                          {parcel.location}
                        </span>
                        <span className="label-sm mt-0.5 block text-ivory/30">
                          {parcel.district} · {parcel.zoning}
                        </span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="font-display block text-base font-medium text-ivory">
                          {formatAcres(parcel.acres)}
                        </span>
                        <span
                          className="label-sm mt-0.5 block"
                          style={{ color }}
                        >
                          {parcel.status}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
          <Legend
            swatch={
              <span className="h-px w-4 border-t border-dashed border-gold/50" />
            }
          >
            Outer Ring Road
          </Legend>
          <Legend
            swatch={
              <span className="h-px w-4 border-t border-dashed border-[rgba(196,178,150,0.5)]" />
            }
          >
            Regional Ring Road
          </Legend>
          <Legend swatch={<span className="h-px w-4 bg-ivory/20" />}>
            National Highways
          </Legend>
          {(["Available", "Under Negotiation", "Mandated"] as const).map(
            (status) => (
              <Legend
                key={status}
                swatch={
                  <span
                    className="size-2 rounded-full border"
                    style={{ borderColor: STATUS_COLOR[status] }}
                  />
                }
              >
                {status}
              </Legend>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function Legend({
  swatch,
  children,
}: {
  swatch: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-2">
      {swatch}
      <span className="label-sm text-ivory/30">{children}</span>
    </span>
  );
}
