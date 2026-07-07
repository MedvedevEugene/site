import {
  BUSINESS_COURSE_MODULES,
  BUSINESS_COURSE_PROGRAM_INTRO,
} from "@/lib/business-course-data";
import styles from "./BusinessCourseProgramSection.module.css";

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
      <g fill="none" fillRule="evenodd" stroke="#7e7988" strokeLinecap="square">
        <g transform="translate(1 1)">
          <path d="M0,11 L22,11" />
          <path d="M11,0 L11,22" />
        </g>
      </g>
    </svg>
  );
}

type BusinessCourseProgramSectionProps = {
  onApply: () => void;
};

export function BusinessCourseProgramSection({ onApply }: BusinessCourseProgramSectionProps) {
  return (
    <section className={styles.section} id="program" aria-labelledby="busc-program-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <span className={styles.label}>{BUSINESS_COURSE_PROGRAM_INTRO.label}</span>
          <h2 id="busc-program-title" className={styles.title}>
            {BUSINESS_COURSE_PROGRAM_INTRO.title}
            <br />
            {BUSINESS_COURSE_PROGRAM_INTRO.subtitle}
          </h2>
          <p className={styles.subtitle}>{BUSINESS_COURSE_PROGRAM_INTRO.text}</p>
        </header>

        <div className={styles.list}>
          {BUSINESS_COURSE_MODULES.map((mod) => (
            <details key={mod.num} className={styles.item}>
              <summary className={styles.summary}>
                <span className={styles.summaryTitle}>
                  <span className={styles.blockLabel}>Блок </span>
                  <span className={styles.blockNum}>{mod.num}</span>
                  <span className={styles.moduleName}>{mod.title}</span>
                </span>
                <span className={styles.iconWrap} aria-hidden>
                  <PlusIcon className={styles.icon} />
                </span>
              </summary>
              <div className={styles.body}>
                <p className={styles.lead}>Ваши результаты после прохождения блока:</p>
                <ul>
                  {mod.results.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>

        <div className={styles.ctaWrap}>
          <button type="button" className={styles.cta} onClick={onApply}>
            Поступить в институт
          </button>
        </div>
      </div>
    </section>
  );
}
