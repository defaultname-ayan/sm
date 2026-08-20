import type { PortableTextBlock } from "next-sanity";

let keyCounter = 0;
const nextKey = () => `seed-${(keyCounter += 1).toString(36)}`;

/** Builds a Portable Text paragraph. Used only for seed content. */
export function para(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: nextKey(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: nextKey(), text, marks: [] }],
  } as PortableTextBlock;
}

/** Builds a Portable Text heading. Used only for seed content. */
export function heading(text: string, level: "h2" | "h3" = "h2"): PortableTextBlock {
  return {
    _type: "block",
    _key: nextKey(),
    style: level,
    markDefs: [],
    children: [{ _type: "span", _key: nextKey(), text, marks: [] }],
  } as PortableTextBlock;
}

/** Builds a Portable Text bullet item. Used only for seed content. */
export function bullet(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: nextKey(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [{ _type: "span", _key: nextKey(), text, marks: [] }],
  } as PortableTextBlock;
}
