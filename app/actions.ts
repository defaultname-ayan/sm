"use server";

import { Resend } from "resend";

const TO_ADDRESS = process.env.ENQUIRY_TO_EMAIL ?? "";
const FROM_ADDRESS =
  process.env.ENQUIRY_FROM_EMAIL ?? "Sudha Square <onboarding@resend.dev>";
const RESEND_KEY = process.env.RESEND_API_KEY ?? "";

export type FormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

function requireText(
  data: FormData,
  key: string,
  label: string,
  errors: Record<string, string>,
  { max = 2000, min = 1 }: { max?: number; min?: number } = {},
): string {
  const value = String(data.get(key) ?? "").trim();
  if (value.length < min) errors[key] = `${label} is required.`;
  else if (value.length > max) errors[key] = `${label} is too long.`;
  return value;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Delivers a submission by email.
 *
 * When Resend is not configured we log the submission and succeed in
 * development - so the form is demonstrable - but fail loudly in production,
 * because silently swallowing a real enquiry is the worst possible outcome
 * for this business.
 */
async function deliver(subject: string, rows: [string, string][]): Promise<FormState> {
  const html = `
    <h2 style="font-family:Georgia,serif;color:#0b132b">${escapeHtml(subject)}</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .filter(([, value]) => value)
        .map(
          ([label, value]) => `
            <tr>
              <td style="padding:6px 16px 6px 0;color:#6b7280;vertical-align:top">${escapeHtml(label)}</td>
              <td style="padding:6px 0;color:#0b132b">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
            </tr>`,
        )
        .join("")}
    </table>
  `;

  if (!RESEND_KEY || !TO_ADDRESS) {
    console.warn(
      `[enquiry] Resend is not configured (RESEND_API_KEY / ENQUIRY_TO_EMAIL). Submission was NOT emailed:\n${rows
        .map(([label, value]) => `  ${label}: ${value}`)
        .join("\n")}`,
    );

    if (process.env.NODE_ENV === "production") {
      return {
        ok: false,
        message:
          "We could not send your message just now. Please call or message us on WhatsApp and we'll pick it up straight away.",
      };
    }

    return {
      ok: true,
      message: "Received. (Development mode: logged to the server console.)",
    };
  }

  try {
    const resend = new Resend(RESEND_KEY);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      subject,
      html,
    });

    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("[enquiry] delivery failed:", error);
    return {
      ok: false,
      message:
        "We could not send your message just now. Please call or message us on WhatsApp and we'll pick it up straight away.",
    };
  }

  return { ok: true, message: "Received." };
}

export async function submitEnquiry(
  _prev: FormState,
  data: FormData,
): Promise<FormState> {
  // Honeypot: bots fill hidden fields, humans never see them.
  if (String(data.get("company") ?? "")) {
    return { ok: true, message: "Received." };
  }

  const errors: Record<string, string> = {};
  const name = requireText(data, "name", "Name", errors, { max: 120 });
  const contact = requireText(data, "contact", "Phone or email", errors, {
    max: 160,
  });
  const corridor = String(data.get("corridor") ?? "").trim();
  const extent = String(data.get("extent") ?? "").trim();
  const use = String(data.get("use") ?? "").trim();
  const notes = String(data.get("notes") ?? "").trim().slice(0, 2000);
  const parcel = String(data.get("parcel") ?? "").trim();

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      fieldErrors: errors,
    };
  }

  return deliver(
    parcel ? `Parcel enquiry: ${parcel}` : `Land requirement: ${name}`,
    [
      ["Name", name],
      ["Contact", contact],
      ["Parcel", parcel],
      ["Preferred corridor", corridor],
      ["Extent required", extent],
      ["Intended use", use],
      ["Notes", notes],
    ],
  );
}

export async function requestBrochure(
  _prev: FormState,
  data: FormData,
): Promise<FormState> {
  if (String(data.get("company") ?? "")) {
    return { ok: true, message: "Received." };
  }

  const email = String(data.get("email") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return {
      ok: false,
      message: "Please enter a valid email address.",
      fieldErrors: { email: "That doesn't look like a valid email address." },
    };
  }

  const result = await deliver("Land Opportunities brief requested", [
    ["Email", email],
  ]);

  return result.ok
    ? { ok: true, message: "Request received. The current issue is on its way." }
    : result;
}
