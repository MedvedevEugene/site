import Image from "next/image";
import { BUSINESS_COURSE_IMAGES, BUSINESS_COURSE_METHOD } from "@/lib/business-course-data";
import styles from "./BusinessCourseMethodSection.module.css";

export function BusinessCourseMethodSection() {
  return (
    <section className={styles.section} aria-labelledby="busc-method-title">
      <div className={styles.panel}>
        <header className={styles.header}>
          <span className={styles.label}>{BUSINESS_COURSE_METHOD.label}</span>
          <h2 id="busc-method-title" className={styles.title}>
            Что такое{" "}
            <span className={styles.titleAccent}>
              бизнес-
              <br />
              расстановки?
            </span>
          </h2>
          <p className={styles.subtitle}>{BUSINESS_COURSE_METHOD.subtitle}</p>
        </header>

        <div className={styles.grid}>
          <div className={styles.media}>
            <Image
              src={BUSINESS_COURSE_IMAGES.methodImage}
              alt=""
              width={360}
              height={599}
              className={styles.image}
              sizes="(min-width: 960px) 360px, 100vw"
            />
          </div>

          <div className={styles.cards}>
            {BUSINESS_COURSE_METHOD.items.map((item) => (
              <article key={item.num} className={styles.card}>
                <span className={styles.cardNum}>{item.num}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
