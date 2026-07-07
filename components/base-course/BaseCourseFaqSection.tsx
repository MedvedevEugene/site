import { BASE_COURSE_FAQ } from "@/lib/base-course-data";
import styles from "./BaseCourseFaqSection.module.css";

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      role="presentation"
      focusable="false"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="square">
        <g transform="translate(1 1)">
          <path d="M0,11 L22,11" />
          <path d="M11,0 L11,22" />
        </g>
      </g>
    </svg>
  );
}

export function BaseCourseFaqSection() {
  return (
    <section className={styles.section} aria-labelledby="bc-faq-title">
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h2 id="bc-faq-title" className={styles.title}>
            Ответы на частые вопросы
          </h2>
          <p className={styles.subtitle}>А что если:</p>
        </div>

        <div className={styles.list}>
          {BASE_COURSE_FAQ.map((item) => (
            <details key={item.question} className={styles.item}>
              <summary className={styles.summary}>
                <span className={styles.summaryText}>{item.question}</span>
                <PlusIcon className={styles.icon} />
              </summary>
              <div className={styles.answer}>
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
