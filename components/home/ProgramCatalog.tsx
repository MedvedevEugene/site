import Link from "next/link";
import { CATALOG_PROGRAMS, IMAGES } from "@/lib/site-data";

const TONE_CLASS = {
  featured: "catalog-card--featured",
  cream: "catalog-card--cream",
  white: "catalog-card--white",
} as const;

function CatalogLightningIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 25" fill="none" aria-hidden className="w-[13px] h-[25px] shrink-0">
      <path d="M0 13.58695L9.88 0L7.8 10.869575H13L2.6 25L4.16 13.58695H0Z" fill="#774BD9" />
    </svg>
  );
}

export function ProgramCatalog() {
  return (
    <section id="catalog" className="section bg-white scroll-mt-24">
      <div className="container-site">
        <h2 className="section-title">
          Каталог наших
          <br />
          программ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {CATALOG_PROGRAMS.map((p) => {
            const featured = "featured" in p && p.featured;
            const wide = featured || ("wide" in p && p.wide);
            const tone = "tone" in p ? p.tone : "cream";
            return (
              <Link
                key={p.href}
                href={p.href}
                className={`catalog-card ${TONE_CLASS[tone]} ${wide ? "lg:col-span-2" : ""} group`}
              >
                {featured && (
                  <>
                    <div
                      className="catalog-card__spiral"
                      style={{ backgroundImage: `url(${IMAGES.spiral})` }}
                      aria-hidden
                    />
                    {"badge" in p && p.badge && (
                      <div className="catalog-card__badge">
                        <CatalogLightningIcon />
                        <span>{p.badge}</span>
                      </div>
                    )}
                  </>
                )}
                <div className="catalog-card__tag">{p.tag}</div>
                <div className="catalog-card__body">
                  <h3 className="catalog-card__title">{p.title}</h3>
                </div>
                <div className="catalog-card__meta">{p.meta}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
