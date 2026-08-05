import { CATALOG_PROGRAMS } from "@/lib/site-data";
import { CatalogCard } from "@/components/home/CatalogCard";

export function ProgramCatalog() {
  return (
    <section id="catalog" className="bg-white scroll-mt-24 pt-[70px] pb-[70px]">
      <div className="container-site section-heading-band">
        <h2 className="section-title">
          Программы и&nbsp;форматы
          <br />
          работы
        </h2>
      </div>
      <div className="container-site">
        <div className="catalog-grid">
          {CATALOG_PROGRAMS.map((p) => {
            const featured = "featured" in p && p.featured;
            const wide = featured || ("wide" in p && p.wide);
            const tone = "tone" in p ? p.tone : "cream";

            return (
              <CatalogCard
                key={p.href}
                href={p.href}
                featured={featured}
                wide={wide}
                tone={tone}
                decor={"decor" in p ? p.decor : undefined}
                tag={p.tag}
                badge={"badge" in p ? p.badge : undefined}
                title={p.title}
                meta={p.meta}
                callbackVariant={"callbackVariant" in p ? p.callbackVariant : undefined}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
