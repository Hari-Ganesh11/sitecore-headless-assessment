import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type {
  ComponentRendering,
  ArticleResult,
  ArticleSearchResponse,
} from "@/lib/types";
import ArticleListingClient from "./ArticleListingClient";
/**
 * B4 — ArticleListing.
 *
 * Server-render the first page, then "Load more" fetches the next page from
 * /api/articles on the client and appends to the list. Handle loading and
 * error states, and hide the button once hasNext is false.
 *
 * TODO: implement.
 */
function getString(value: unknown): string {
  if (
    typeof value === "object" &&
    value !== null &&
    "value" in value &&
    typeof value.value === "string"
  ) {
    return value.value;
  }

  return "";
}

export default async function ArticleListing({
  rendering,
}: {
  rendering: ComponentRendering;
}) {
  const heading = getString(rendering.fields?.heading);
  const tag = rendering.params?.tag ?? "cardiology";
  const pageSize = Number(rendering.params?.pageSize ?? 3);

  let articles: ArticleResult[] = [];
  let cursor: string | null = null;
  let hasNext = false;

  try {
    const file = join(process.cwd(), "..", "mock", "edge", "articles.json");

    const raw = await readFile(file, "utf8");
    const response = JSON.parse(raw) as ArticleSearchResponse;

    articles = response.data.search.results.slice(0, pageSize);
    cursor = response.data.search.pageInfo.endCursor;
    hasNext = response.data.search.pageInfo.hasNext;
  } catch (error) {
    console.error("Failed to load initial articles:", error);
  }

  return (
    <section className="article-listing">
      {heading && <h2>{heading}</h2>}

      <ArticleListingClient
        initialArticles={articles}
        initialCursor={cursor}
        initialHasNext={hasNext}
        tag={tag}
      />
    </section>
  );
}
