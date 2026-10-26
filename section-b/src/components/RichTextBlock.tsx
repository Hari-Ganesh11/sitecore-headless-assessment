import type { ComponentRendering } from "@/lib/types";
import  DOMPurify  from "isomorphic-dompurify";

/**
 * B2 — RichTextBlock.
 *
 * The field holds author HTML, including a <script> tag. Render the markup,
 * keep it safe, and say in your NOTES.md how you handled it.
 *
 * TODO: implement.
 */

function getRichText(value:unknown):string{
  if(typeof value === "object" && value !== null && "value" in value && typeof value.value === "string"){
    return value.value;
  }
  return "";
}
export default function RichTextBlock({ rendering }: { rendering: ComponentRendering }) {
  const rawHTML = getRichText(rendering.fields?.text);
  const sanitizedHTML = DOMPurify.sanitize(rawHTML);
  return (
    <div className="rich-text-block" dangerouslySetInnerHTML={{__html: sanitizedHTML}}/>
  );
}
