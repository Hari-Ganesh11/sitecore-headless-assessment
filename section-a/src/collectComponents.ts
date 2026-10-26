import type { CollectResult, Route } from "./types.js";

/**
 * A1 — Component tree walker.
 *
 * Walk `route.placeholders` and return every component in the order it appears
 * on the page (depth-first), plus the names that aren't in the registry.
 *
 * See ASSESSMENT.md (Section A1) for the full requirements.
 *
 * TODO: implement. Replace this body with your solution, and add a short
 * comment above the function explaining your approach.
 */
export function collectComponents(route: Route, registry: Set<string>): CollectResult {
  throw new Error("Not implemented");
}
