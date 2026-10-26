import { describe, expect, it } from "vitest";

import { buildNav, getBreadcrumb } from "../src/buildNav.js";
import { navItems } from "../src/fixtures.js";

/**
 * Starter tests. Both fail until you implement buildNav and getBreadcrumb.
 *
 * Add your own: the normal case plus at least two edge cases each. The sample
 * data has a few deliberate traps — make sure your tests pin down what you
 * decided to do about them.
 */
describe("buildNav", () => {
  it("nests children under their parent", () => {
    const { tree } = buildNav(navItems, 10);

    expect(tree).toHaveLength(1);
    expect(tree[0]?.title).toBe("Home");
  });

  it("reports items whose parent does not exist", () => {
    const { orphans } = buildNav(navItems, 10);

    expect(orphans.map((item) => item.id)).toEqual(["8"]);
  });
});

describe("getBreadcrumb", () => {
  it("walks from the root down to the given path", () => {
    expect(getBreadcrumb(navItems, "/services/cardiology")).toEqual([
      "Home",
      "Services",
      "Cardiology"
    ]);
  });
});
