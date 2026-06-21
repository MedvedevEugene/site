import Image from "next/image";
import { FEATURE_PILLARS } from "@/lib/site-data";

export function FeaturePillars() {
  return (
    <section className="feature-pillars-section">
      <div className="container-site">
        <div className="feature-pillars-grid">
          {FEATURE_PILLARS.map((item) => (
            <article
              key={item.titleLines.join("-")}
              className={`feature-pillar${item.tint === "blue" ? " feature-pillar--blue" : ""}`}
            >
              <div className="feature-pillar__icon">
                <Image src={item.image} alt="" width={150} height={150} className="h-auto w-[150px] object-contain" />
              </div>
              <p className="feature-pillar__title">
                {item.titleLines.map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
