import { BUSINESS_COURSE_FORMAT } from "@/lib/business-course-data";
import styles from "./BusinessCourseFormatSection.module.css";

function ChevronIcon() {
  return (
    <svg
      className={styles.chevron}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 15"
      fill="none"
      role="img"
      aria-hidden
    >
      <path d="M0.3414286206896552 0.3414286206896552L14.000048275862069 14.000048275862069L27.658689655172413 0.3414286206896552" stroke="white" />
    </svg>
  );
}

export function BusinessCourseFormatSection() {
  return (
    <section className={styles.section} aria-labelledby="busc-format-title">
      <div className={styles.panel}>
        <header className={styles.header}>
          <span className={styles.label}>{BUSINESS_COURSE_FORMAT.label}</span>
          <h2 id="busc-format-title" className={styles.title}>
            Как проходит
            <br />
            обучение
          </h2>
        </header>

        <div className={styles.grid}>
          {BUSINESS_COURSE_FORMAT.items.map((item) => (
            <article key={item.title} className={styles.cell}>
              <div className={styles.cellHeading}>
                <span className={styles.dot} aria-hidden />
                <h3 className={styles.cellTitle}>{item.title}</h3>
              </div>
              <p className={styles.cellText}>{item.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.chevronWrap}>
          <ChevronIcon />
        </div>
      </div>
    </section>
  );
}
