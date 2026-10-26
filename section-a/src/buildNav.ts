import type { NavItem, NavResult } from "./types.js";

/**
 * A2 — Navigation tree builder.
 *
 * Turn the flat item list into a nested tree, honouring sortOrder, hideInNav
 * (including descendants), orphans and maxDepth.
 *
 * See ASSESSMENT.md (Section A2) for the full requirements.
 *
 * TODO: implement. Replace this body with your solution, and add a short
 * comment above the function explaining your approach.
 */
export function buildNav(items: NavItem[], maxDepth: number): NavResult {
  throw new Error("Not implemented");
}

/**
 * A2 — Breadcrumb.
 *
 * Return the titles from the root down to the item at `path`, e.g.
 * "/services/cardiology" -> ["Home", "Services", "Cardiology"].
 * An unknown path returns an empty array.
 *
 * TODO: implement.
 */
export function getBreadcrumb(items: NavItem[], path: string): string[] {
  throw new Error("Not implemented");
}
