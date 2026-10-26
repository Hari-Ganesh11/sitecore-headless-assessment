/**
 * Types for the mocked Sitecore payloads.
 *
 * These mirror what the Layout Service and Experience Edge actually return.
 * Extend them as you build — but keep `any` out of your field shapes.
 */

/* ---------- Field value shapes ---------- */

export interface TextField {
  value: string;
}

export interface ImageValue {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
}

export interface ImageField {
  value: ImageValue;
}

export interface LinkValue {
  href?: string;
  text?: string;
  linkType?: "internal" | "external" | "media" | "anchor";
  target?: string;
}

export interface LinkField {
  value: LinkValue;
}

/* ---------- Layout Service ---------- */

export interface ComponentRendering {
  uid: string;
  componentName: string;
  dataSource?: string;
  params?: Record<string, string>;
  fields?: Record<string, unknown>;
  /** A component can host placeholders of its own, to any depth. */
  placeholders?: PlaceholdersMap;
}

export type PlaceholdersMap = Record<string, ComponentRendering[]>;

export interface RouteData {
  name: string;
  itemId: string;
  templateName: string;
  fields?: {
    pageTitle?: TextField;
    metaDescription?: TextField;
    [key: string]: unknown;
  };
  placeholders?: PlaceholdersMap;
}

export interface SitecoreContext {
  pageEditing: boolean;
  site: { name: string };
  language: string;
  itemPath: string;
}

export interface LayoutServiceData {
  sitecore: {
    context: SitecoreContext;
    route: RouteData;
  };
}

/* ---------- Experience Edge (article search) ---------- */

export interface ArticleResult {
  id: string;
  url: { path: string };
  title: TextField;
  publishDate: TextField;
}

export interface ArticleSearchResponse {
  data: {
    search: {
      total: number;
      pageInfo: { endCursor: string | null; hasNext: boolean };
      results: ArticleResult[];
    };
  };
}
