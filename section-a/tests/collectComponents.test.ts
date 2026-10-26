import { describe, expect, it } from "vitest";

import { collectComponents } from "../src/collectComponents.js";
import { loadRoute, registry } from "../src/fixtures.js";

/**
 * One starter test so you can see the harness working. It currently fails,
 * because collectComponents throws until you implement it.
 *
 * Add your own tests here: the normal case plus at least two edge cases.
 * Think about what the mock data does NOT cover.
 */
describe("collectComponents", () => {
  it("returns every component on the page, and flags the unregistered one", () => {
    const result = collectComponents(loadRoute(), registry);

    expect(result.renderList).toHaveLength(6);
    expect(result.missing).toEqual(["LegacyWidget"]);
  });
});
