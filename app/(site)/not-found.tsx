import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-navy pt-32 pb-20">
      <div className="shell">
        <p className="label text-gold">404</p>
        <h1 className="font-display mt-4 max-w-2xl text-title font-medium text-balance text-ivory">
          That page isn&rsquo;t here.
        </h1>
        <p className="mt-6 max-w-md text-lede text-ivory/55">
          It may have been a parcel that has since transacted. The land bank has
          what is currently mandated.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/land-bank"
            className="label-sm rounded-full bg-ivory px-6 py-3.5 text-navy transition-colors hover:bg-gold-bright"
          >
            View the land bank
          </Link>
          <Link
            href="/"
            className="label-sm rounded-full border border-ivory/25 px-6 py-3.5 text-ivory transition-colors hover:border-ivory/55"
          >
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
