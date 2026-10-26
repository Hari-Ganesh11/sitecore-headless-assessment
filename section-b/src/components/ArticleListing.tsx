import type { ComponentRendering } from "@/lib/types";

/**
 * B4 — ArticleListing.
 *
 * Server-render the first page, then "Load more" fetches the next page from
 * /api/articles on the client and appends to the list. Handle loading and
 * error states, and hide the button once hasNext is false.
 *
 * TODO: implement.
 */
export default function ArticleListing({ rendering }: { rendering: ComponentRendering }) {
  return null;
}
