import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { NextResponse } from "next/server";

import type { ArticleSearchResponse, ArticleResult } from "@/lib/types";

/**
 * Stands in for Experience Edge's article search.
 *
 * GET /api/articles?tag=cardiology&cursor=
 *
 * Page 1 comes from /mock/edge/articles.json and is wired up already.
 * Pages 2 and 3 are yours to add (Section B4) — 7 articles in total, same
 * response shape, with endCursor/hasNext paginating correctly to the end.
 *
 * Tip: to exercise your error state, add something like
 * `?fail=1` here and have it return a 500.
 */
const PAGE_SIZE = 3;

const additionalArticles: ArticleResult[] = [
  {
    id: "a4",
    url: { path: "/news/heart-failure-care" },
    title: { value: "Advances in heart failure care" },
    publishDate: { value: "2026-06-12T00:00:00Z" },
  },
  {
    id: "a5",
    url: { path: "/news/cardiac-rehabilitation" },
    title: { value: "The benefits of cardiac rehabilitation" },
    publishDate: { value: "2026-05-20T00:00:00Z" },
  },
  {
    id: "a6",
    url: { path: "/news/heart-health-tips" },
    title: { value: "Five ways to support heart health" },
    publishDate: { value: "2026-04-18T00:00:00Z" },
  },
  {
    id: "a7",
    url: { path: "/news/meet-our-cardiologists" },
    title: { value: "Meet our cardiology team" },
    publishDate: { value: "2026-03-25T00:00:00Z" },
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor") ?? "";
  const tag = searchParams.get("tag") ?? "";

  // Optional error simulation for testing the client error state.
  if (searchParams.get("fail") === "1") {
    return NextResponse.json(
      { errors: [{ message: "Simulated article API failure." }] },
      { status: 500 }
    );
  }

  // This mock endpoint supports the cardiology tag.
  if (tag && tag !== "cardiology") {
    return NextResponse.json({
      data: {
        search: {
          total: 0,
          pageInfo: { endCursor: null, hasNext: false },
          results: [],
        },
      },
    } satisfies ArticleSearchResponse);
  }

  try {
    const file = join(process.cwd(), "..", "mock", "edge", "articles.json");

    const raw = await readFile(file, "utf8");
    const firstPage = JSON.parse(raw) as ArticleSearchResponse;

    const allArticles = [
      ...firstPage.data.search.results,
      ...additionalArticles,
    ];

    // Cursors represent the number of articles already returned.
    const offset = cursor ? Number(atob(cursor)) : 0;

    if (
      !Number.isInteger(offset) ||
      offset < 0 ||
      offset > allArticles.length ||
      (cursor !== "" && btoa(String(offset)) !== cursor)
    ) {
      return NextResponse.json(
        { errors: [{ message: "Invalid pagination cursor." }] },
        { status: 400 }
      );
    }

    const results = allArticles.slice(offset, offset + PAGE_SIZE);
    const nextOffset = offset + results.length;
    const hasNext = nextOffset < allArticles.length;

    const response: ArticleSearchResponse = {
      data: {
        search: {
          total: allArticles.length,
          pageInfo: {
            endCursor: results.length ? btoa(String(nextOffset)) : null,
            hasNext,
          },
          results,
        },
      },
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { errors: [{ message: "Unable to read article data." }] },
      { status: 500 }
    );
  }
}
