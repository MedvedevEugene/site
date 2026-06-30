import Image from "next/image";
import { BASE_COURSE_AUDIENCE } from "@/lib/base-course-data";
import styles from "./BaseCourseAudienceSection.module.css";

type BaseCourseAudienceSectionProps = {
  onConsultation: () => void;
};

export function BaseCourseAudienceSection({ onConsultation }: BaseCourseAudienceSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <h2 className={styles.title}>Для кого предназначен курс?</h2>

        <div className={styles.grid}>
          {BASE_COURSE_AUDIENCE.map((item) => (
            <article
              key={item.title}
              className={`${styles.card}${item.variant === "dark" ? ` ${styles.cardDark}` : ""}`}
            >
              <h3
                className={styles.cardTitle}
                style={item.titleWeight ? { fontWeight: item.titleWeight } : undefined}
              >
                {item.title}
              </h3>
              <p className={styles.cardText}>{item.text}</p>
              <Image
                src={item.image}
                alt=""
                width={142}
                height={142}
                className={styles.cardIcon}
              />
            </article>
          ))}
        </div>

        <button type="button" className={styles.cta} onClick={onConsultation}>
          Получить консультацию
        </button>
      </div>
    </section>
  );
}
