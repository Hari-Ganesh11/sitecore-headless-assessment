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

type unkonowRecord = Record<string, unknown>;

function isRecord(value: unknown): value is unkonowRecord {
  return typeof value === "object" && value !== null;
}

function getAtPath(value: unknown, ...keys: string[]): unknown {
  let current: unknown = value;
  for (const key of keys) {
    if (!isRecord(current)) return undefined;
    current = current[key];
  }
  return current;
}

function getString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageSrc: string;
  imageAlt: string;
}

function parseDoctor(value: unknown, index: number): Doctor {
  const name = getString(getAtPath(value, "name", "jsonValue", "value"));

  const specialty = getString(
    getAtPath(value, "specialty", "jsonValue", "value")
  );

  const imageSrc = getString(
    getAtPath(value, "photo", "jsonValue", "value", "src")
  );

  const imageAlt = getString(
    getAtPath(value, "photo", "jsonValue", "value", "alt")
  );

  const id = getString(getAtPath(value, "id"));

  return {
    id: id || `doctor-${index}`,
    name: name || "Doctor Profile",
    specialty,
    imageSrc,
    imageAlt: imageAlt || name,
  };
}

export default function DoctorList({
  rendering,
}: {
  rendering: ComponentRendering;
}) {
  const datasource = getAtPath(rendering.fields, "data", "datasource");
  const title = getString(getAtPath(datasource, "title", "jsonValue", "value"));
  const results = getAtPath(datasource, "children", "results");
  const doctors = Array.isArray(results) ? results.map(parseDoctor) : [];

  return (
    <section className="doctors-list">
      {title && <h2 className="doctor-list-heading">{title}</h2>}
      <div className="doctoor-list__grid">
        {doctors.map((doctor) => (
          <article className="doctor-card" key={doctor.id}>
            {doctor.imageSrc ? (
              <img
                className="doctor-card-image"
                src={doctor.imageSrc}
                alt={doctor.imageAlt}
              />
            ) : (
              <div
                className="doctor-card-image-fallback"
                role="img"
                aria-label={`photo unavailable for ${doctor.name}`}
              >
                photo unavailable
              </div>
            )}
            <h3 className="doctor-card-name">{doctor.name}</h3>
            <p className="doctor-carc-speciality">
              {doctor.specialty || "Speciality is not available"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
