import type { ComponentRendering } from "@/lib/types";

/**
 * B2 — DoctorList.
 *
 * Note this component's data arrives under fields.data.datasource, in the
 * `jsonValue` shape Integrated GraphQL produces — not as flat fields.
 * One doctor has no photo and no specialty.
 *
 * TODO: implement.
 */
export default function DoctorList({ rendering }: { rendering: ComponentRendering }) {
  return null;
}
