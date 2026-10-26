import type { ComponentRendering } from "@/lib/types";
import Placeholder from "./Placeholder";

/**
 * B1 — a layout component that hosts two placeholders of its own:
 * `column-left-1` and `column-right-1`.
 *
 * TODO: implement, rendering both through <Placeholder />.
 */
export default function TwoColumn({
  rendering,
}: {
  rendering: ComponentRendering;
}) {
  const placeholders = rendering.placeholders;

  return (
    <div className="two-column">
      <div className="left-column">
        <Placeholder name="column-left-1" placeholders={placeholders} />
      </div>
      <div className="right-column">
        <Placeholder name="column-right-1" placeholders={placeholders} />
      </div>
    </div>
  );
}
