
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
