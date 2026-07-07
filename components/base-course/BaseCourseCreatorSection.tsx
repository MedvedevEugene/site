import Image from "next/image";
import { BASE_COURSE_CREATOR, BASE_COURSE_IMAGES } from "@/lib/base-course-data";
import styles from "./BaseCourseCreatorSection.module.css";

export function BaseCourseCreatorSection() {
  return (
    <section className={styles.section} aria-labelledby="bc-creator-title">
      <div className={styles.wrap}>
        <div className={styles.panel}>
          <div className={styles.content}>
            <h2 id="bc-creator-title" className={styles.title}>
              Создатель курса
            </h2>

            <p className={styles.quote}>{BASE_COURSE_CREATOR.quote}</p>
            <p className={styles.name}>{BASE_COURSE_CREATOR.name}</p>
            <hr className={styles.divider} />

            <p className={styles.bio}>{BASE_COURSE_CREATOR.bio}</p>

            <ul className={styles.credentials}>
              {BASE_COURSE_CREATOR.credentials.map((item) => (
                <li key={item.bold} className={styles.credential}>
                  <Image
                    src={BASE_COURSE_IMAGES.stepsDot}
                    alt=""
                    width={36}
                    height={36}
                    className={styles.dot}
                  />
                  <span>
                    <strong className={styles.credentialBold}>{item.bold}</strong>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.media}>
            <Image
              src={BASE_COURSE_IMAGES.creator}
              alt={BASE_COURSE_CREATOR.name}
              width={820}
              height={1083}
              className={styles.photo}
              sizes="(min-width: 960px) 820px, 560px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
