import type { CollectResult, Placeholders, Route } from "./types.js";

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

/**
 * A1 Solution comments
 * collectComponents function accepts route and registry as params 
 * and return a value of  CollectResult type  
 * 
 * we create a the new necessary variables to store the rendered list of components and
 * the components are missing from the registry
 * 
 * we create a new helper function "walkPlaceholders" which will work in Depth-first 
 * walkPlaceholhers function will receive the route as placeholder and parent path along with 
 * the depth of the current route path, the function return type is void because it'll update the 
 * outer vaiables rather than return a result.
 * walkplaceholders will add the rendered componentNames to render list and will check for missing 
 * component with the registry and add the missing compoenent to missing set
 *
 */
export function collectComponents(
  route: Route,
  registry: Set<string>
): CollectResult {
  //throw new Error("Not implemented");

  const renderList: CollectResult["renderList"] = [];
  const missing = new Set<string>();

  function walkPlaceholders(
    placeholder: Placeholders,
    parentpath: string,
    depth: number
  ):void{
    for(const [placeholdername,components] of Object.entries(placeholder)){
      const placeholderpath = parentpath ? `${parentpath}/${placeholdername}` : placeholdername ;

      for(const component of components){
        renderList.push({
          uid:component.uid,
          componentName: component.componentName,
          placeholderPath:placeholderpath,
          depth
        });
        if(!registry.has(component.componentName)){
          missing.add(component.componentName);
        }
        if(component.placeholders){
          walkPlaceholders(component.placeholders, placeholderpath,depth+1);
        }
      }
    }

  }

  if(route.placeholders){
    walkPlaceholders(
      route.placeholders,"",0
    );
  }

  return {
    renderList,
    missing: Array.from(missing),
  };
}
