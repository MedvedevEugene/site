"use client";

import Image from "next/image";
import {
  BUSINESS_COURSE_IMAGES,
  BUSINESS_COURSE_TARIFFS,
  BUSINESS_COURSE_TARIFFS_SECTION,
} from "@/lib/business-course-data";
import styles from "./BusinessCourseTariffsSection.module.css";

type BusinessCourseTariffsSectionProps = {
  onTariffClick: (tariffId: (typeof BUSINESS_COURSE_TARIFFS)[number]["id"]) => void;
};

export function BusinessCourseTariffsSection({ onTariffClick }: BusinessCourseTariffsSectionProps) {
  return (
    <section className={styles.section} id="tariffs" aria-labelledby="busc-tariffs-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.label}>{BUSINESS_COURSE_TARIFFS_SECTION.label}</span>
          <h2 id="busc-tariffs-title" className={styles.title}>
            Выберите
            <br />
            формат обучения
          </h2>
          <p className={styles.subtitle}>{BUSINESS_COURSE_TARIFFS_SECTION.subtitle}</p>
        </header>

        <div className={styles.grid}>
          {BUSINESS_COURSE_TARIFFS.map((tariff) => {
            const featured = "featured" in tariff && tariff.featured;

            return (
              <article
                key={tariff.id}
                className={`${styles.card}${featured ? ` ${styles.cardFeatured}` : ""}`}
              >
                <div className={styles.cardBody}>
                  <h3 className={styles.name}>{tariff.name}</h3>
                  <div className={styles.priceBlock}>
                    <p className={`${styles.price}${featured ? ` ${styles.priceGradient}` : ""}`}>
                      {tariff.price}
                    </p>
                    <p className={styles.installment}>{tariff.installment}</p>
                  </div>

                  <ul className={styles.features}>
                    {tariff.features.map((item) => (
                      <li key={item} className={styles.feature}>
                        <Image
                          src={BUSINESS_COURSE_IMAGES.diplomaCheckIcon}
                          alt=""
                          width={24}
                          height={24}
                          className={styles.featureIcon}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className={`${styles.cta}${featured ? ` ${styles.ctaPrimary}` : ` ${styles.ctaOutline}`}`}
                  onClick={() => onTariffClick(tariff.id)}
                >
                  {tariff.cta}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
