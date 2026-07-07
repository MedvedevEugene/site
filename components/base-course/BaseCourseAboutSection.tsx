import Image from "next/image";
import { BASE_COURSE_ABOUT, BASE_COURSE_IMAGES } from "@/lib/base-course-data";
import styles from "./BaseCourseAboutSection.module.css";

const ABOUT_LEFT = BASE_COURSE_ABOUT.slice(0, 3);
const ABOUT_RIGHT = BASE_COURSE_ABOUT.slice(3);

type BaseCourseAboutSectionProps = {
  onConsultation: () => void;
};

export function BaseCourseAboutSection({ onConsultation }: BaseCourseAboutSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="bc-about-title">
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h2 id="bc-about-title" className={styles.title}>
            что такое расстановки?
          </h2>
          <p className={styles.subtitle}>Зачем нужны и почему работают?</p>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.textList} ${styles.textListLeft}`}>
            {ABOUT_LEFT.map((item) => (
              <p key={item} className={styles.textItem}>
                {item}
              </p>
            ))}
          </div>

          <div className={styles.media}>
            <Image
              src={BASE_COURSE_IMAGES.aboutDiagram}
              alt=""
              width={418}
              height={418}
              className={styles.diagram}
              sizes="(min-width: 640px) 418px, 321px"
            />
          </div>

          <div className={`${styles.textList} ${styles.textListRight}`}>
            {ABOUT_RIGHT.map((item) => (
              <p key={item} className={styles.textItem}>
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.ctaWrap}>
          <button type="button" className={styles.cta} onClick={onConsultation}>
            Получить консультацию
          </button>
        </div>
      </div>
    </section>
  );
}
