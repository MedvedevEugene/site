"use client";

import Image from "next/image";
import {
  BUSINESS_COURSE_HERO,
  BUSINESS_COURSE_IMAGES,
  BUSINESS_COURSE_NAV,
} from "@/lib/business-course-data";
import styles from "./BusinessCourseHeroSection.module.css";

type BusinessCourseHeroSectionProps = {
  onProgramClick: () => void;
  onConsultationClick: () => void;
};

export function BusinessCourseHeroSection({
  onProgramClick,
  onConsultationClick,
}: BusinessCourseHeroSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="busc-hero-title">
      <Image src={BUSINESS_COURSE_IMAGES.heroBg} alt="" fill priority className={styles.bg} sizes="100vw" />
      <div className={styles.overlay} aria-hidden />

      <div className={styles.wrap}>
        <header className={styles.header}>
          <Image
            src={BUSINESS_COURSE_IMAGES.heroLogo}
            alt="Институт жизненных систем имплицитного знания"
            width={342}
            height={48}
            className={styles.logo}
            priority
          />
          <nav className={styles.nav} aria-label="Навигация по странице">
            {BUSINESS_COURSE_NAV.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <div className={styles.layout}>
          <div className={styles.content}>
            <span className={styles.badge}>{BUSINESS_COURSE_HERO.badge}</span>
            <h1 id="busc-hero-title" className={styles.title}>
              {BUSINESS_COURSE_HERO.title}
            </h1>
            <p className={styles.subtitle}>{BUSINESS_COURSE_HERO.subtitle}</p>

            <div className={styles.offer}>
              <Image
                src={BUSINESS_COURSE_IMAGES.heroGift}
                alt=""
                width={45}
                height={45}
                className={styles.offerIcon}
              />
              <span>{BUSINESS_COURSE_HERO.offer}</span>
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.btnPrimary} onClick={onProgramClick}>
                Получить программу курса
              </button>
              <button type="button" className={styles.btnGhost} onClick={onConsultationClick}>
                Записаться на консультацию
              </button>
            </div>

            <ul className={styles.stats}>
              {BUSINESS_COURSE_HERO.stats.map((item) => (
                <li key={item} className={styles.stat}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.visual} aria-hidden>
            <Image
              src={BUSINESS_COURSE_IMAGES.heroPhoto}
              alt=""
              width={920}
              height={980}
              className={styles.photo}
              priority
              sizes="(min-width: 960px) 58vw, 90vw"
            />
          </div>
        </div>

        <div className={styles.scroll} aria-hidden>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
