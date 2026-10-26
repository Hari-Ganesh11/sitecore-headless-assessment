import { getLayoutData } from "@/lib/getLayoutData";

/**
 * The catch-all route every Sitecore page comes through.
 *
 * Right now it fetches the layout data and renders nothing useful. Your job
 * (Section B) is to render the page from that data: placeholders, components,
 * metadata, and a real 404 for unknown paths.
 *
 * Try http://localhost:3000/services/cardiology
 */
export default async function SitecorePage({
  params
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const { path } = await params;
  const layout = await getLayoutData("/" + (path ?? []).join("/"));

  // TODO B3: an unknown path should 404, not render an empty page.
  // TODO B1: render route.placeholders through a <Placeholder /> component.
  return (
    <main>
      <p>
        Starter page. Layout data for this path was{" "}
        {layout ? "loaded — now render it." : "not found."}
      </p>
    </main>
  );
}

// TODO B3: page <title> and meta description come from route.fields.
// Next.js gives you `generateMetadata` for this.

// TODO B3: this page should be statically generated with revalidation.
// Pick a strategy, set it here, and justify the choice in your NOTES.md.
