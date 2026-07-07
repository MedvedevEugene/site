import Image from "next/image";
import { BUSINESS_COURSE_DIPLOMA, BUSINESS_COURSE_IMAGES } from "@/lib/business-course-data";
import styles from "./BusinessCourseDiplomaSection.module.css";

export function BusinessCourseDiplomaSection() {
  return (
    <section className={styles.section} aria-labelledby="busc-diploma-title">
      <div className={styles.panel}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <span className={styles.label}>{BUSINESS_COURSE_DIPLOMA.label}</span>
            <h2 id="busc-diploma-title" className={styles.title}>
              Диплом о профессиональной
              <br />
              <span className={styles.titleAccent}>переподготовке</span>
            </h2>
            <p className={styles.text}>{BUSINESS_COURSE_DIPLOMA.text}</p>
            <p className={styles.license}>{BUSINESS_COURSE_DIPLOMA.license}</p>
            <ul className={styles.features}>
              {BUSINESS_COURSE_DIPLOMA.features.map((item) => (
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

          <div className={styles.media}>
            <Image
              src={BUSINESS_COURSE_IMAGES.diplomaPhoto}
              alt=""
              width={967}
              height={682}
              className={styles.photo}
              sizes="(min-width: 960px) 460px, 90vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
