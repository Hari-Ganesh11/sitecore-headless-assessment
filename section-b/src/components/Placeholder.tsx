import { getComponent } from "./componentFactory";
import type { ComponentRendering, PlaceholdersMap } from "@/lib/types";

/**
 * B1 — renders every component placed in a named placeholder.
 *
 * This is the recursive heart of the page: a component can host placeholders
 * of its own (see TwoColumn), and the same Placeholder should handle those too.
 *
 * TODO: implement.
 */

interface PlaceholderProps {
  name: string;
  placeholders?: PlaceholdersMap;
}
export default function Placeholder({ name, placeholders }: PlaceholderProps) {
  const Components = placeholders?.[name] ?? [];

  return (
    <>
      {Components.map((rendering: ComponentRendering) => {
        const Component = getComponent(rendering.componentName);

        if(!Component){
          if(process.env.NODE_ENV !== "production"){
            return(
              <div key={rendering.uid}
              className="missing-component"
              data-component-name={rendering.componentName}>
                Missing component : {rendering.componentName}
              </div>
            );
          }
          return null;
        }

        return <Component key={rendering.uid} rendering={rendering} />;
      })}
    </>
  );

  return null;
}
