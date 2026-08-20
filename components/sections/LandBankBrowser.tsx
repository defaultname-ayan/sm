"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

import { ParcelCard } from "@/components/ui/ParcelCard";
import type { DealType, Parcel, ParcelStatus, Zone } from "@/lib/types";
import { cn } from "@/lib/utils";

const ZONES: (Zone | "All")[] = [
  "All",
  "South Hyderabad",
  "West Hyderabad",
  "North Hyderabad",
  "East Hyderabad",
];
const STATUSES: (ParcelStatus | "All")[] = [
  "All",
  "Available",
  "Under Negotiation",
  "Mandated",
];
const DEALS: (DealType | "All")[] = ["All", "Outright Sale", "JDA"];

export function LandBankBrowser({ parcels }: { parcels: Parcel[] }) {
  const [zone, setZone] = useState<Zone | "All">("All");
  const [status, setStatus] = useState<ParcelStatus | "All">("All");
  const [deal, setDeal] = useState<DealType | "All">("All");
  const prefersReduced = useReducedMotion();

  const filtered = useMemo(
    () =>
      parcels.filter(
        (parcel) =>
          (zone === "All" || parcel.zone === zone) &&
          (status === "All" || parcel.status === status) &&
          (deal === "All" || parcel.dealType === deal),
      ),
    [parcels, zone, status, deal],
  );

  // Only offer a filter value that some parcel actually has, so the client
  // never sees a filter that can only ever return nothing.
  const available = useMemo(
    () => ({
      zones: new Set(parcels.map((p) => p.zone)),
      statuses: new Set(parcels.map((p) => p.status)),
      deals: new Set(parcels.map((p) => p.dealType)),
    }),
    [parcels],
  );

  const totalAcres = filtered.reduce((sum, p) => sum + p.acres, 0);
  const anyFilterActive = zone !== "All" || status !== "All" || deal !== "All";

  return (
    <section className="bg-ivory py-16 md:py-20">
      <div className="shell">
        <div className="flex flex-wrap gap-x-10 gap-y-6 border-b border-navy/10 pb-8">
          <FilterGroup
            legend="Zone"
            options={ZONES.filter((z) => z === "All" || available.zones.has(z as Zone))}
            value={zone}
            onChange={setZone}
          />
          <FilterGroup
            legend="Status"
            options={STATUSES.filter(
              (s) => s === "All" || available.statuses.has(s as ParcelStatus),
            )}
            value={status}
            onChange={setStatus}
          />
          <FilterGroup
            legend="Deal type"
            options={DEALS.filter(
              (d) => d === "All" || available.deals.has(d as DealType),
            )}
            value={deal}
            onChange={setDeal}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-6">
          <p className="label-sm text-navy/45" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "parcel" : "parcels"}
            {filtered.length > 0 && (
              <> · {totalAcres.toFixed(2).replace(/\.00$/, "")} acres</>
            )}
          </p>
          {anyFilterActive && (
            <button
              type="button"
              onClick={() => {
                setZone("All");
                setStatus("All");
                setDeal("All");
              }}
              className="label-sm text-navy/45 underline underline-offset-4 transition-colors hover:text-navy"
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-panel border border-dashed border-navy/15 px-8 py-20 text-center">
            <p className="font-display text-xl font-medium text-navy">
              No parcels match those filters.
            </p>
            <p className="mt-3 text-sm text-navy/55">
              Much of what we hold is off-market. Tell us the requirement and
              we will tell you honestly whether it exists.
            </p>
          </div>
        ) : (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((parcel) => (
                <motion.div
                  key={parcel._id}
                  layout={!prefersReduced}
                  initial={prefersReduced ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReduced ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ParcelCard parcel={parcel} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function FilterGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
}) {
  if (options.length <= 1) return null;

  return (
    <fieldset>
      <legend className="label-sm mb-2.5 text-navy/40">{legend}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option)}
              className={cn(
                "label-sm rounded-full border px-3.5 py-2 transition-all duration-200",
                active
                  ? "border-navy bg-navy text-ivory"
                  : "border-navy/15 text-navy/50 hover:border-navy/35 hover:text-navy",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
