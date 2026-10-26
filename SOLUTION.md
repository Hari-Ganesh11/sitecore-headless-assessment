
## A1 Solution comments
 * 1 collectComponents function accepts route and registry as params 
    and return a value of  CollectResult type  
 *  we create a the new necessary variables to store the rendered list of components and
    the components are missing from the registry
 *  we create a new helper function "walkPlaceholders" which will work in Depth-first 
 *  walkPlaceholhers function will receive the route as placeholder and parent path along with 
    the depth of the current route path, the function return type is void because it'll update the 
    outer vaiables rather than return a result.
 *  walkplaceholders will add the rendered componentNames to render list and will check for missing 
    component with the registry and add the missing compoenent to missing set

## A2 solution comments
*  The buildNav function accepts navigation items and the maximum depth.
*  We create a tree by connecting each item to its parent.
*  We sort the items using sortOrder and then title.
*  Hidden items and their children are excluded from navigation.
*  The getBreadcrumb function follows parent links to build the breadcrumb path.

## B1 solution comments
*  The component factory maps Sitecore component names to React         components.
*  The Placeholder component loops through the components and renders them in order.
*  Each component uses its unique ID as the React key.
*  Unknown components show a message in development and are hidden in production.

## B2 solution comments

*  Hero: Reads the heading, subheading, image and CTA from its fields, and the theme from rendering parameters.
*  Empty subheadings are not rendered, and the CTA uses Next.js Link.
*  RichTextBlock: Reads the rich-text field and sanitizes the HTML before rendering it.
*  DoctorList: Reads doctor details from nested data and displays fallback values when information is missing.


## B3 solution comments

*  The page reads the route from the URL and fetches the corresponding Sitecore layout data.
*  If the route does not exist, notFound() displays the 404 page.
*  generateMetadata() sets the page title and description from Sitecore fields.
*  NOTES.md explains SSR, SSG, ISR and revalidation.

## B4 solution comments

*  The server component loads the first three articles and passes them to the client component.
*  The API returns more articles using cursor-based pagination.
*  The client appends new articles and displays loading and error messages.
*  The Load More button disappears when hasNext becomes false.