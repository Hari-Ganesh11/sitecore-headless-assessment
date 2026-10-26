/**
 * B1 — maps a Sitecore componentName to the React component that renders it.
 *
 * `LegacyWidget` is deliberately absent: the page must not break, and in
 * development the gap should be visible rather than silent.
 *
 * TODO: implement, and register your components here as you build them.
 */
import type { ComponentType } from "react";
import type { ComponentRendering } from "@/lib/types";
import Hero from "./Hero";
import TwoColumn from "./TwoColumn";
import RichTextBlock from "./RichTextBlock";
import DoctorList from "./DoctorList";
import ArticleListing from "./ArticleListing";

type SitecoreComponentProps={
  rendering: ComponentRendering;
};

const componentMap : Record<
string,
ComponentType<SitecoreComponentProps>
> ={
  Hero,
  TwoColumn,
  RichTextBlock,
  DoctorList,
  ArticleListing,
};

export function getComponent(componentName: string):ComponentType<SitecoreComponentProps>|undefined {
  if (Object.hasOwn(componentMap, componentName)) {
    return componentMap[componentName];
  }

  return undefined;
}
