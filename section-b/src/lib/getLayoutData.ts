import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { LayoutServiceData } from "./types";

/**
 * The one place that knows where layout data comes from.
 *
 * Today it reads the mock files in /mock/layout. In a real project this would
 * call the Layout Service or Experience Edge — swapping that in should mean
 * changing only this file, so keep the rest of the app talking to this
 * function rather than reaching for the JSON directly.
 *
 * Returns null when the path has no content, so the caller can 404.
 */
export async function getLayoutData(path: string): Promise<LayoutServiceData | null> {
  const slug = normalise(path);
  if (!slug) return null;

  const file = join(process.cwd(), "..", "mock", "layout", `${slug}.json`);

  try {
    const raw = await readFile(file, "utf8");
    return JSON.parse(raw) as LayoutServiceData;
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
}

/**
 * "/services/cardiology" -> "services/cardiology"
 *
 * Rejects anything that tries to climb out of the mock folder.
 */
function normalise(path: string): string | null {
  const slug = path.replace(/^\/+|\/+$/g, "");
  if (!slug) return null;
  if (slug.split("/").some((segment) => segment === "." || segment === "..")) return null;
  return slug;
}

function isNotFound(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as NodeJS.ErrnoException).code === "ENOENT"
  );
}
