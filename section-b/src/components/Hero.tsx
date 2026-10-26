import type {
  ComponentRendering,
  ImageField,
  LinkField,
  TextField,
} from "@/lib/types";
import Link from "next/link";

interface HeroFields {
  heading?: TextField;
  subheading?: TextField;
  image?: ImageField;
  ctaLink?: LinkField;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getText(value: unknown): string | undefined {
  if (!isRecord(value) || !isRecord(value.value)) return undefined;

  return typeof value.value.value === "string" ? value.value.value : undefined;
}
/**
 * B2 — Hero.
 *
 * Watch for: an empty subheading, the `theme` rendering parameter, an internal
 * CTA link, and an image whose alt is deliberately empty.
 *
 * TODO: implement.
 */
export default function Hero({ rendering }: { rendering: ComponentRendering }) {
  const fields = rendering.fields ?? {};
  const heading = getText(fields.heading);
  const subheading = getText(fields.subheading);

  const imageField = fields.image;
  const imageValue =
    isRecord(imageField) && isRecord(imageField.value)
      ? imageField.value
      : undefined;
  const imageSrc =
    imageValue && typeof imageValue.src === "string"
      ? imageValue.src
      : undefined;
  const imageAlt =
    imageValue && typeof imageValue.alt === "string" ? imageValue.alt : "";
  const ctaField = fields.cta;
  const ctaValue =
    isRecord(ctaField) && isRecord(ctaField.value) ? ctaField.value : undefined;
  const ctaHref =
    ctaValue && typeof ctaValue.href === "string" ? ctaValue.href : undefined;
  const ctaText =
    ctaValue && typeof ctaValue.text === "string" ? ctaValue.text : undefined;
  const theme = rendering.params?.theme ?? "light";

  return (
    <section className={`hero hero--${theme}`}>
      <div className="hero-content">
        {heading && <h1 className="hero-heading">{heading}</h1>}
        {subheading && (
          <p className="hero-sub-heading">{subheading}</p>
        )}
        {ctaHref && ctaText && (
          <Link className="hero-cta" href={ctaHref}>
          {ctaText}
        </Link>
        )}
      </div>
      {imageSrc && (
        <img className="hero-image" src={imageSrc} alt={imageAlt}/>
      )}
    </section>
  );
  //return null;
}
