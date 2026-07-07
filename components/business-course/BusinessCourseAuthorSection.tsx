import Image from "next/image";
import { BUSINESS_COURSE_AUTHOR, BUSINESS_COURSE_IMAGES } from "@/lib/business-course-data";
import styles from "./BusinessCourseAuthorSection.module.css";

export function BusinessCourseAuthorSection() {
  return (
    <section className={styles.section} id="author" aria-labelledby="busc-author-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.media}>
            <Image
              src={BUSINESS_COURSE_IMAGES.authorDecor}
              alt=""
              width={957}
              height={750}
              className={styles.decor}
              sizes="(min-width: 960px) 560px, 90vw"
            />
            <Image
              src={BUSINESS_COURSE_IMAGES.authorFrame}
              alt=""
              width={560}
              height={692}
              className={styles.frame}
              sizes="(min-width: 960px) 560px, 78vw"
              priority
            />
          </div>

          <div className={styles.content}>
            <span className={styles.label}>{BUSINESS_COURSE_AUTHOR.label}</span>
            <h2 id="busc-author-title" className={styles.title}>
              Эксперт-практик
              <br />
              с системным
              <br />
              образованием
            </h2>
            <p className={styles.text}>{BUSINESS_COURSE_AUTHOR.text}</p>

            <div className={styles.stats}>
              {BUSINESS_COURSE_AUTHOR.stats.map((item) => (
                <article key={item.label} className={styles.stat}>
                  <span className={styles.statValue}>{item.value}</span>
                  <span className={styles.statLabel}>{item.label}</span>
                </article>
              ))}
            </div>

            <p className={styles.quote}>{BUSINESS_COURSE_AUTHOR.quote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
