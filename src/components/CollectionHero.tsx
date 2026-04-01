import { siteConfig } from "@/lib/site-config";
import { ArchiveCTA } from "@/components/ArchiveCTA";

export function CollectionHero() {
  const { brand, links } = siteConfig;

  return (
    <section className="collection-hero">
      <div className="collection-hero__copy">
        <p className="collection-hero__mark">{brand.mark}</p>
        <p className="collection-hero__kicker">{brand.name}</p>
        <h1 className="collection-hero__title">{brand.volume}</h1>
        <p className="collection-hero__tagline">{brand.tagline}</p>
      </div>
      <ArchiveCTA items={links.hero} />
    </section>
  );
}
