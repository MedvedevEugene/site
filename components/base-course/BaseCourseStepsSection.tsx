import Image from "next/image";
import { BASE_COURSE_IMAGES, BASE_COURSE_STEPS } from "@/lib/base-course-data";
import styles from "./BaseCourseStepsSection.module.css";

type BaseCourseStepsSectionProps = {
  onApply: () => void;
};

export function BaseCourseStepsSection({ onApply }: BaseCourseStepsSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="bc-steps-title">
      <div className={styles.wrap}>
        <div className={styles.panel}>
          <div className={styles.content}>
            <h2 id="bc-steps-title" className={styles.title}>
              7 шагов на курсе
            </h2>
            <p className={styles.subtitle}>К новой профессии</p>

            <ul className={styles.list}>
              {BASE_COURSE_STEPS.map((step) => (
                <li key={step} className={styles.item}>
                  <Image
                    src={BASE_COURSE_IMAGES.stepsDot}
                    alt=""
                    width={36}
                    height={36}
                    className={styles.dot}
                  />
                  <span>{step}</span>
                </li>
              ))}
            </ul>

            <button type="button" className={styles.cta} onClick={onApply}>
              начать учиться
            </button>
          </div>

          <div className={styles.media}>
            <Image
              src={BASE_COURSE_IMAGES.steps}
              alt=""
              width={682}
              height={787}
              className={styles.photo}
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
