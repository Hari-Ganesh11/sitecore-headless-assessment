import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { NextResponse } from "next/server";

import type { ArticleSearchResponse } from "@/lib/types";

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
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor") ?? "";

  // TODO B4: honour `tag` and paginate past page 1.
  if (cursor) {
    return NextResponse.json(
      { errors: [{ message: "Pagination is not implemented yet." }] },
      { status: 501 }
    );
  }

  const file = join(process.cwd(), "..", "mock", "edge", "articles.json");
  const raw = await readFile(file, "utf8");
  const page = JSON.parse(raw) as ArticleSearchResponse;

  return NextResponse.json(page);
}
