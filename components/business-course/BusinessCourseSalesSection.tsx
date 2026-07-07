import Image from "next/image";
import { BUSINESS_COURSE_IMAGES, BUSINESS_COURSE_SALES } from "@/lib/business-course-data";
import styles from "./BusinessCourseSalesSection.module.css";

type BusinessCourseSalesSectionProps = {
  onStartClick: () => void;
};

export function BusinessCourseSalesSection({ onStartClick }: BusinessCourseSalesSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="busc-sales-title">
      <div className={styles.panel}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <span className={styles.label}>{BUSINESS_COURSE_SALES.label}</span>
            <h2 id="busc-sales-title" className={styles.title}>
              Мы помогаем не только обучиться, но и{" "}
              <span className={styles.titleAccent}>выйти в продажи</span>
            </h2>
            <p className={styles.subtitle}>{BUSINESS_COURSE_SALES.subtitle}</p>
            <button type="button" className={styles.cta} onClick={onStartClick}>
              Начать обучение
            </button>
          </div>

          <div className={styles.cards}>
            {BUSINESS_COURSE_SALES.items.map((item) => (
              <article key={item.title} className={styles.card}>
                <div className={styles.cardRow}>
                  <Image
                    src={BUSINESS_COURSE_IMAGES.salesOkIcon}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.cardIcon}
                  />
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardText}>{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
