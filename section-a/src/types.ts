/**
 * Shared types for Section A.
 *
 * These describe the shape of the mock Layout Service response
 * (mock/layout/services/cardiology.json) and the navigation input for A2.
 *
 * You may extend or adjust these if your solution needs it — just keep them
 * honest about what the data actually contains.
 */

/** A single rendering inside a placeholder. */
export interface SitecoreComponent {
  uid: string;
  componentName: string;
  dataSource?: string;
  params?: Record<string, string>;
  fields?: Record<string, unknown>;
  /** Components can contain placeholders of their own, to any depth. */
  placeholders?: Placeholders;
}

/** Placeholder key -> the components placed in it. */
export type Placeholders = Record<string, SitecoreComponent[]>;

/** `sitecore.route` from the Layout Service response. */
export interface Route {
  name: string;
  itemId: string;
  templateName: string;
  fields?: Record<string, unknown>;
  placeholders?: Placeholders;
}

/** One row of the flat A1 output. */
export interface RenderEntry {
  uid: string;
  componentName: string;
  /** e.g. "headless-main/column-right-1" */
  placeholderPath: string;
  depth: number;
}

export interface CollectResult {
  renderList: RenderEntry[];
  /** componentNames not present in the registry, no duplicates */
  missing: string[];
}

/** A2: a content item as Sitecore hands it over — a flat list, not a tree. */
export interface NavItem {
  id: string;
  parentId: string | null;
  title: string;
  path: string;
  sortOrder: number;
  hideInNav?: boolean;
}

/** A2: the nested shape you build. Adjust if your design differs. */
export interface NavNode {
  id: string;
  title: string;
  path: string;
  children: NavNode[];
}

export interface NavResult {
  tree: NavNode[];
  /** items whose parentId points at something that doesn't exist */
  orphans: NavItem[];
}
