import Link from "next/link";
import Image from "next/image";
import { CATALOG_PROGRAMS, IMAGES } from "@/lib/site-data";

export function ProgramCatalog() {
  return (
    <section className="section bg-white">
      <div className="container-site">
        <h2 className="section-title">Каталог наших программ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATALOG_PROGRAMS.map((p) => {
            const featured = "featured" in p && p.featured;
            return (
              <Link
                key={p.href}
                href={p.href}
                className={`catalog-card ${featured ? "catalog-card--featured" : "catalog-card--default"} group`}
              >
                {featured && (
                  <Image
                    src={IMAGES.catalogDecor}
                    alt=""
                    width={200}
                    height={200}
                    className="absolute right-4 bottom-4 w-[min(180px,40%)] h-auto opacity-[0.12] pointer-events-none object-contain"
                  />
                )}
                <div>
                  <div className="text-[13px] text-muted mb-2">{p.tag}</div>
                  {"badge" in p && p.badge && (
                    <div className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary mb-3">
                      <span className="text-accent-purple">⚡</span> {p.badge}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-heading text-[clamp(18px,2vw,24px)] font-medium m-0 mb-3 max-w-[420px] group-hover:opacity-80">
                    {p.title}
                  </h3>
                  <div className="text-[13px] text-muted">{p.meta}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
