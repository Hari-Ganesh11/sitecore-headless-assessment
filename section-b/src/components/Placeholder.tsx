import type { PlaceholdersMap } from "@/lib/types";

/**
 * B1 — renders every component placed in a named placeholder.
 *
 * This is the recursive heart of the page: a component can host placeholders
 * of its own (see TwoColumn), and the same Placeholder should handle those too.
 *
 * TODO: implement.
 */
export default function Placeholder({
  name,
  placeholders
}: {
  name: string;
  placeholders?: PlaceholdersMap;
}) {
  return null;
}
