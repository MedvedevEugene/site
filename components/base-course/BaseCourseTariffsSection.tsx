import Image from "next/image";
import {
  BASE_COURSE_IMAGES,
  BASE_COURSE_TARIFFS,
  type BaseCoursePopupKind,
} from "@/lib/base-course-data";
import styles from "./BaseCourseTariffsSection.module.css";

type BaseCourseTariffsSectionProps = {
  onSelectTariff: (kind: BaseCoursePopupKind) => void;
};

export function BaseCourseTariffsSection({ onSelectTariff }: BaseCourseTariffsSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="bc-tariffs-title">
      <div className={styles.wrap}>
        <div className={styles.panel}>
          <div className={styles.header}>
            <h2 id="bc-tariffs-title" className={styles.title}>
              Выбирай свой формат участия
            </h2>
            <p className={styles.subtitle}>Три уровня поддержки для твоего развития</p>
          </div>

          <div className={styles.cards}>
            {BASE_COURSE_TARIFFS.map((tariff) => (
              <article key={tariff.id} className={styles.card}>
                <div className={styles.iconWrap}>
                  <Image
                    src={tariff.icon}
                    alt=""
                    width={120}
                    height={96}
                    className={styles.icon}
                  />
                </div>

                <h3 className={styles.name}>{tariff.name}</h3>

                <ul className={styles.features}>
                  {tariff.features.map((feature) => (
                    <li key={feature} className={styles.feature}>
                      <Image
                        src={BASE_COURSE_IMAGES.stepsDot}
                        alt=""
                        width={20}
                        height={20}
                        className={styles.dot}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.footer}>
                  <Image
                    src={BASE_COURSE_IMAGES.tariffCertificates}
                    alt=""
                    width={120}
                    height={48}
                    className={styles.certificates}
                  />

                  <div className={styles.prices}>
                    <span className={styles.oldPrice}>{tariff.oldPrice}</span>
                    <span className={styles.midPrice}>{tariff.midPrice}</span>
                    <span className={styles.price}>{tariff.price}</span>
                  </div>

                  <div className={styles.discount}>
                    <span>скидка</span>
                    <span>-11%</span>
                  </div>

                  <button
                    type="button"
                    className={styles.btn}
                    onClick={() => onSelectTariff(tariff.id as BaseCoursePopupKind)}
                  >
                    выбрать тариф
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
