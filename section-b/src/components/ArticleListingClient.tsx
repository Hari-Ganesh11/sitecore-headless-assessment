"use client";

import { useState } from "react";
import Link from "next/link";
import type { ArticleResult } from "@/lib/types";

interface ArticleListingClientProps {
  initialArticles: ArticleResult[];
  initialCursor: string | null;
  initialHasNext: boolean;
  tag: string;
}

export default function ArticleListingClient({
  initialArticles,
  initialCursor,
  initialHasNext,
  tag,
}: ArticleListingClientProps) {
  const [articles, setArticles] = useState(initialArticles);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasNext, setHasNext] = useState(initialHasNext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadMore() {
    if (loading || !hasNext) return;

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({ tag });

      if (cursor) {
        params.set("cursor", cursor);
      }

      const response = await fetch(`/api/articles?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to load articles.");
      }

      const data = await response.json();
      const search = data?.data?.search;

      if (!search || !Array.isArray(search.results) || !search.pageInfo) {
        throw new Error("Invalid response from articles API.");
      }

      setArticles((previous) => {
        const existingIds = new Set(previous.map((article) => article.id));

        const newArticles = search.results.filter(
          (article: ArticleResult) => !existingIds.has(article.id)
        );

        return [...previous, ...newArticles];
      });

      setCursor(search.pageInfo.endCursor ?? null);
      setHasNext(search.pageInfo.hasNext === true);
    } catch {
      setError("Unable to load more articles. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="article-listing">
      <div className="article-listing__items">
        {articles.map((article) => (
          <article key={article.id} className="article-listing__item">
            <Link href={article.url.path}>
              <h3>{article.title.value}</h3>
            </Link>
            <p>{article.publishDate.value}</p>
          </article>
        ))}
      </div>

      {error && <p role="alert">{error}</p>}

      {hasNext && (
        <button type="button" onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
