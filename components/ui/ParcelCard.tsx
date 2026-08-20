import Link from "next/link";

import { SmartImage } from "@/components/ui/SmartImage";
import { StatusPill } from "@/components/ui/StatusPill";
import type { Parcel } from "@/lib/types";
import { formatAcres } from "@/lib/utils";

export function ParcelCard({ parcel }: { parcel: Parcel }) {
  return (
    <Link
      href={`/land-bank/${parcel.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-panel border border-navy/10 bg-white transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_18px_40px_-24px_rgba(11,19,43,0.4)]"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-ivory-shade">
        <SmartImage
          source={parcel.coverImage}
          alt={`Aerial view of the ${parcel.location} parcel, ${parcel.district}`}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/5 to-transparent" />

        <div className="absolute top-4 right-4">
          <StatusPill status={parcel.status} />
        </div>

        <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3">
          <span className="font-display text-2xl leading-none font-medium text-ivory">
            {formatAcres(parcel.acres)}
          </span>
          <span className="label-sm text-ivory/70">{parcel.dealType}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="label text-navy">{parcel.location}</h3>
        <p className="label-sm mt-1 text-navy/40">{parcel.district}</p>

        <dl className="mt-5 space-y-2.5 border-t border-navy/8 pt-5 text-sm">
          <div className="flex items-start justify-between gap-4">
            <dt className="label-sm shrink-0 text-navy/40">Zoning</dt>
            <dd className="text-right text-[13px] text-navy/70">{parcel.zoning}</dd>
          </div>
          {parcel.titleStatus && (
            <div className="flex items-start justify-between gap-4">
              <dt className="label-sm shrink-0 text-navy/40">Title</dt>
              <dd className="text-right text-[13px] font-medium text-navy">
                {parcel.titleStatus}
              </dd>
            </div>
          )}
        </dl>

        {parcel.proximity && (
          <p className="label-sm mt-5 text-navy/35">{parcel.proximity}</p>
        )}

        <span className="label-sm mt-auto flex items-center gap-2 pt-6 text-navy transition-colors duration-300 group-hover:text-gold">
          View parcel
          <span
            aria-hidden
            className="transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
