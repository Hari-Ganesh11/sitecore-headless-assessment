import type { NavItem, NavNode, NavResult } from "./types.js";

/**
 * A2 — Navigation tree builder.
 *
 * Turn the flat item list into a nested tree, honouring sortOrder, hideInNav
 * (including descendants), orphans and maxDepth.
 *
 * See ASSESSMENT.md (Section A2) for the full requirements.
 *
 * TODO: implement. Replace this body with your solution, and add a short
 * comment above the function explaining your approach.
 */
export function buildNav(items: NavItem[], maxDepth: number): NavResult {
  //throw new Error("Not implemented");
  const itemById = new Map<string, NavItem>();
  const childbyParent = new Map<string, NavItem[]>();

  for (const item of items) {
    itemById.set(item.id, item);

    if (item.parentId !== null) {
      const siblings = childbyParent.get(item.parentId) ?? [];
      siblings.push(item);
      childbyParent.set(item.parentId, siblings);
    }
  }

  const hiddenIds = new Set<string>();
  const pending: string[] = [];

  for (const item of items) {
    if (item.hideInNav) {
      hiddenIds.add(item.id);
      pending.push(item.id);
    }
  }

  while (pending.length > 0) {
    const parentId = pending.pop()!;
    const children = childbyParent.get(parentId) ?? [];

    for (const child of children) {
      if (!hiddenIds.has(child.id)) {
        hiddenIds.add(child.id);
        pending.push(child.id);
      }
    }
  }

  const nodesById = new Map<string, NavNode>();
  for (const item of items) {
    if (hiddenIds.has(item.id)) continue;

    nodesById.set(item.id, {
      id: item.id,
      title: item.title,
      path: item.path,
      children: [],
    });
  }

  const tree: NavNode[] = [];
  const orphans: NavItem[] = [];

  for (const item of items) {
    if (hiddenIds.has(item.id)) continue;

    const node = nodesById.get(item.id)!;

    if (item.parentId === null) {
      tree.push(node);
      continue;
    }

    const parentItem = itemById.get(item.parentId);

    if (!parentItem) {
      orphans.push(item);
      continue;
    }

    const parentNode = nodesById.get(item.parentId);

    if (parentNode) {
      parentNode.children.push(node);
    }
  }

  const sortTree = (nodes: NavNode[]): void => {
    nodes.sort((a, b) => {
      const item1 = itemById.get(a.id)!;
      const item2 = itemById.get(b.id)!;

      return (
        item1.sortOrder - item2.sortOrder ||
        item1.title.localeCompare(item2.title)
      );
    });

    for(const node of nodes){
      sortTree(node.children);
    }
  };

  sortTree(tree);

  const applyMaxDepth = (nodes:NavNode[], level:number):void => {
    for(const node of nodes){
      if (level >= maxDepth){
        node.children =[];
      } else{
        applyMaxDepth(node.children,level+1);
      }
    }
  };
  if(maxDepth >0){
    applyMaxDepth(tree,1);
  } else{
    tree.length = 0
  }
  return {tree,orphans};
}

/**
 * A2 — Breadcrumb.
 *
 * Return the titles from the root down to the item at `path`, e.g.
 * "/services/cardiology" -> ["Home", "Services", "Cardiology"].
 * An unknown path returns an empty array.
 *
 * TODO: implement.
 */
export function getBreadcrumb(items: NavItem[], path: string): string[] {
  //throw new Error("Not implemented");
  const itemsByPath = new Map<string,NavItem>();
  const itemsById = new Map<string,NavItem>();

  for(const item of items){
    itemsByPath.set(item.path,item);
    itemsById.set(item.id,item);
  }

  const target = itemsByPath.get(path);
  if(!target) return [];

  const breadcrumb: string[] = [];
  const visited = new Set<string>();
  let current: NavItem|undefined = target;

  while(current){
    if(visited.has(current.id)) return [];
    visited.add(current.id);
    breadcrumb.push(current.title);

    if(current.parentId == null){
      return breadcrumb.reverse();
    }

    current = itemsById.get(current.parentId);
    
  }

  return [];
}
