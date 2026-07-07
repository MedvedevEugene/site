"use client";

import { useState } from "react";
import { BUSINESS_COURSE_FAQ, BUSINESS_COURSE_FAQ_SECTION } from "@/lib/business-course-data";
import styles from "./BusinessCourseFaqSection.module.css";

function PlusIcon() {
  return (
    <svg
      className={styles.iconSvg}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden
    >
      <g fill="none" fillRule="evenodd" strokeLinecap="square">
        <g transform="translate(1 1)" stroke="#7e7988">
          <path d="M0 11 H22" />
          <path d="M11 0 V22" />
        </g>
      </g>
    </svg>
  );
}

export function BusinessCourseFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.section} aria-labelledby="busc-faq-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.label}>{BUSINESS_COURSE_FAQ_SECTION.label}</span>
          <h2 id="busc-faq-title" className={styles.title}>
            Часто задаваемые
            <br />
            вопросы
          </h2>
        </header>

        <div className={styles.list}>
          {BUSINESS_COURSE_FAQ.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article key={item.q} className={styles.item}>
                <div className={`${styles.card}${isOpen ? ` ${styles.cardOpen}` : ""}`}>
                  <button
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className={styles.question}>{item.q}</span>
                    <span className={styles.iconWrap} aria-hidden>
                      <PlusIcon />
                      <span className={styles.iconCircle} />
                    </span>
                  </button>

                  <div className={styles.panel} aria-hidden={!isOpen}>
                    <div className={styles.panelInner}>
                      <p className={styles.answer}>{item.a}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
