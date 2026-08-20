"use client";

import { useActionState } from "react";

import { submitEnquiry, type FormState } from "@/app/actions";
import { cn } from "@/lib/utils";

const INITIAL: FormState = { ok: false, message: "" };

const FIELDS = [
  {
    name: "name",
    label: "Name",
    placeholder: "Your full name",
    required: true,
    autoComplete: "name",
  },
  {
    name: "contact",
    label: "Phone or email",
    placeholder: "How we should reach you",
    required: true,
    autoComplete: "email",
  },
  {
    name: "corridor",
    label: "Preferred corridor",
    placeholder: "e.g. Shadnagar, Sangareddy, Maheshwaram",
    required: false,
  },
  {
    name: "extent",
    label: "Extent required",
    placeholder: "e.g. 20-50 acres",
    required: false,
  },
  {
    name: "use",
    label: "Intended use",
    placeholder: "e.g. Villa development, JDA, industrial",
    required: false,
  },
] as const;

/**
 * Used both on the contact page and on individual parcel pages. Passing
 * `parcel` prefills the subject line so the agency knows which listing
 * prompted the enquiry.
 */
export function EnquiryForm({
  parcel,
  surface = "dark",
}: {
  parcel?: string;
  surface?: "dark" | "light";
}) {
  const [state, action, pending] = useActionState(submitEnquiry, INITIAL);
  const dark = surface === "dark";

  if (state.ok) {
    return (
      <div
        role="status"
        className={cn(
          "rounded-panel border p-10 text-center",
          dark ? "border-ivory/15" : "border-navy/15 bg-white",
        )}
      >
        <p
          className={cn(
            "font-display text-2xl font-medium",
            dark ? "text-ivory" : "text-navy",
          )}
        >
          Received.
        </p>
        <p className={cn("mt-3 text-sm", dark ? "text-ivory/50" : "text-navy/55")}>
          We review every requirement within one working day. We will be in touch.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      {parcel && <input type="hidden" name="parcel" value={parcel} />}
      {/* Honeypot - hidden from people, irresistible to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      {FIELDS.map((field) => {
        const error = state.fieldErrors?.[field.name];
        return (
          <div key={field.name}>
            <label
              htmlFor={`enquiry-${field.name}`}
              className={cn("label-sm block", dark ? "text-ivory/40" : "text-navy/45")}
            >
              {field.label}
              {field.required && <span className="text-gold"> *</span>}
            </label>
            <input
              id={`enquiry-${field.name}`}
              name={field.name}
              type="text"
              required={field.required}
              autoComplete={"autoComplete" in field ? field.autoComplete : undefined}
              placeholder={field.placeholder}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `enquiry-${field.name}-error` : undefined}
              className={cn(
                "mt-2 w-full rounded-card border bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-200",
                dark
                  ? "border-ivory/12 text-ivory placeholder:text-ivory/25 focus:border-ivory/35"
                  : "border-navy/15 bg-white text-navy placeholder:text-navy/30 focus:border-navy/40",
                error && "border-red-500/70",
              )}
            />
            {error && (
              <p
                id={`enquiry-${field.name}-error`}
                className="mt-1.5 text-[13px] text-red-500"
              >
                {error}
              </p>
            )}
          </div>
        );
      })}

      <div>
        <label
          htmlFor="enquiry-notes"
          className={cn("label-sm block", dark ? "text-ivory/40" : "text-navy/45")}
        >
          Anything else
        </label>
        <textarea
          id="enquiry-notes"
          name="notes"
          rows={4}
          placeholder="Budget range, timeline, or anything specific we should know"
          className={cn(
            "mt-2 w-full resize-y rounded-card border bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-200",
            dark
              ? "border-ivory/12 text-ivory placeholder:text-ivory/25 focus:border-ivory/35"
              : "border-navy/15 bg-white text-navy placeholder:text-navy/30 focus:border-navy/40",
          )}
        />
      </div>

      {state.message && !state.ok && (
        <p role="alert" className={cn("text-[13px]", dark ? "text-red-400" : "text-red-700")}>
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="label-sm w-full rounded-full bg-gold px-6 py-4 text-navy transition-colors duration-200 hover:bg-gold-bright disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send requirement"}
      </button>
    </form>
  );
}
