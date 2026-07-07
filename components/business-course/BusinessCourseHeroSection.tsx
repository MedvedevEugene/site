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
      <div className={styles.bg} aria-hidden>
        <Image
          src={BUSINESS_COURSE_IMAGES.heroBg}
          alt=""
          width={842}
          height={1263}
          className={styles.bgRings}
          priority
          sizes="460px"
        />
      </div>

      <Image
        src={BUSINESS_COURSE_IMAGES.heroPhoto}
        alt=""
        width={1221}
        height={1279}
        className={styles.photo}
        priority
        sizes="(min-width: 1200px) 1086px, 90vw"
        unoptimized
      />

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

        <div className={styles.content}>
          <span className={styles.badge}>{BUSINESS_COURSE_HERO.badge}</span>
          <h1 id="busc-hero-title" className={styles.title}>
            {BUSINESS_COURSE_HERO.title}
          </h1>
          <p className={styles.subtitle}>{BUSINESS_COURSE_HERO.subtitle}</p>

          <div className={styles.offer}>
            <span className={styles.offerIconWrap}>
              <Image
                src={BUSINESS_COURSE_IMAGES.heroGift}
                alt=""
                width={40}
                height={40}
                className={styles.offerIcon}
              />
            </span>
            <span className={styles.offerText}>{BUSINESS_COURSE_HERO.offer}</span>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.btnPrimary} onClick={onProgramClick}>
              Получить программу курса
            </button>
            <button type="button" className={styles.btnGhost} onClick={onConsultationClick}>
              Записаться на консультацию
            </button>
          </div>

          <div className={styles.stats}>
            {BUSINESS_COURSE_HERO.stats.map((item) => (
              <div key={item} className={styles.stat}>
                <span className={styles.statDot} aria-hidden />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.scroll} aria-hidden>
          <Image
            src={BUSINESS_COURSE_IMAGES.heroScroll}
            alt=""
            width={28}
            height={28}
            className={styles.scrollIcon}
          />
        </div>
      </div>
    </section>
  );
}
