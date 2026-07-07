import { BASE_COURSE_MODULES } from "@/lib/base-course-data";
import styles from "./BaseCourseProgramSection.module.css";

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

type BaseCourseProgramSectionProps = {
  onConsultation: () => void;
};

export function BaseCourseProgramSection({ onConsultation }: BaseCourseProgramSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="bc-program-title">
      <div className={styles.wrap}>
        <h2 id="bc-program-title" className={styles.title}>
          Программа курса
        </h2>

        <div className={styles.list}>
          {BASE_COURSE_MODULES.map((module) => (
            <details key={module} className={styles.item}>
              <summary className={styles.summary}>
                <span className={styles.summaryText}>{module}</span>
                <PlusIcon className={styles.icon} />
              </summary>
            </details>
          ))}
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
