import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import type { NavItem, Route } from "./types.js";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");

/** The `sitecore.route` object from the mock Layout Service response. */
export function loadRoute(): Route {
  const file = join(repoRoot, "mock", "layout", "services", "cardiology.json");
  const json = JSON.parse(readFileSync(file, "utf8"));
  return json.sitecore.route as Route;
}

/** The registry of components the app supports. LegacyWidget is deliberately absent. */
export const registry = new Set([
  "Hero",
  "TwoColumn",
  "RichTextBlock",
  "DoctorList",
  "ArticleListing"
]);

/** The A2 sample input, exactly as given in the brief. */
export const navItems: NavItem[] = [
  { id: "1", parentId: null, title: "Home", path: "/", sortOrder: 0 },
  { id: "2", parentId: "1", title: "Services", path: "/services", sortOrder: 20 },
  { id: "3", parentId: "1", title: "About", path: "/about", sortOrder: 10 },
  { id: "4", parentId: "2", title: "Oncology", path: "/services/oncology", sortOrder: 10 },
  { id: "5", parentId: "2", title: "Cardiology", path: "/services/cardiology", sortOrder: 10 },
  { id: "6", parentId: "3", title: "Careers", path: "/about/careers", sortOrder: 5, hideInNav: true },
  { id: "7", parentId: "6", title: "Nursing Jobs", path: "/about/careers/nursing", sortOrder: 1 },
  { id: "8", parentId: "99", title: "Orphan Page", path: "/orphan", sortOrder: 1 }
];
