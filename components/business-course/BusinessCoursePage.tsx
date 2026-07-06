"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FAQ } from "@/components/ui/FAQ";
import { BusinessCoursePopup } from "@/components/business-course/BusinessCoursePopup";
import {
  BUSINESS_COURSE_AUDIENCE,
  BUSINESS_COURSE_AUTHOR,
  BUSINESS_COURSE_DIPLOMA,
  BUSINESS_COURSE_FAQ,
  BUSINESS_COURSE_FINAL,
  BUSINESS_COURSE_FORMAT,
  BUSINESS_COURSE_HERO,
  BUSINESS_COURSE_IMAGES,
  BUSINESS_COURSE_METHOD,
  BUSINESS_COURSE_MODULES,
  BUSINESS_COURSE_NAV,
  BUSINESS_COURSE_PROGRAM_INTRO,
  BUSINESS_COURSE_SALES,
  BUSINESS_COURSE_TARIFFS,
  type BusinessCoursePopupKind,
} from "@/lib/business-course-data";

function openPopup(setter: (k: BusinessCoursePopupKind) => void, kind: BusinessCoursePopupKind) {
  return () => setter(kind);
}

export function BusinessCoursePage() {
  const [popup, setPopup] = useState<BusinessCoursePopupKind | null>(null);

  return (
    <>
      <div className="busc-page">
        {/* Hero — rec2284896261 */}
        <section className="busc-hero">
          <Image src={BUSINESS_COURSE_IMAGES.heroBg} alt="" fill priority className="busc-hero__bg" sizes="100vw" />
          <div className="busc-hero__overlay" aria-hidden />
          <div className="busc-hero__inner">
            <header className="busc-hero__header">
              <Image src={BUSINESS_COURSE_IMAGES.heroLogo} alt="ИЖСИЗ" width={180} height={48} className="busc-hero__logo" />
              <nav className="busc-hero__nav" aria-label="Навигация по странице">
                {BUSINESS_COURSE_NAV.map((item) => (
                  <a key={item.href} href={item.href} className="busc-hero__nav-link">
                    {item.label}
                  </a>
                ))}
              </nav>
            </header>

            <div className="busc-hero__main">
              <div className="busc-hero__content">
                <span className="busc-badge">{BUSINESS_COURSE_HERO.badge}</span>
                <h1 className="busc-hero__title">{BUSINESS_COURSE_HERO.title}</h1>
                <p className="busc-hero__subtitle">{BUSINESS_COURSE_HERO.subtitle}</p>
                <div className="busc-hero__offer">
                  <Image src={BUSINESS_COURSE_IMAGES.heroGift} alt="" width={45} height={45} />
                  <span>{BUSINESS_COURSE_HERO.offer}</span>
                </div>
                <div className="busc-hero__actions">
                  <button type="button" className="busc-btn busc-btn--primary" onClick={openPopup(setPopup, "program")}>
                    Получить программу курса
                  </button>
                  <button type="button" className="busc-btn busc-btn--ghost" onClick={openPopup(setPopup, "consultation")}>
                    Записаться на консультацию
                  </button>
                </div>
                <ul className="busc-hero__stats">
                  {BUSINESS_COURSE_HERO.stats.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="busc-hero__scroll" aria-hidden>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </section>

        {/* Method — rec2284974381 */}
        <section className="busc-section busc-method">
          <div className="busc-container">
            <div className="busc-section-head">
              <span className="busc-label">{BUSINESS_COURSE_METHOD.label}</span>
              <h2 className="busc-section-title">{BUSINESS_COURSE_METHOD.title}</h2>
              <p className="busc-section-subtitle">{BUSINESS_COURSE_METHOD.subtitle}</p>
            </div>
            <div className="busc-method__grid">
              <div className="busc-method__media">
                <Image
                  src={BUSINESS_COURSE_IMAGES.methodImage}
                  alt=""
                  width={520}
                  height={640}
                  className="busc-method__image"
                />
              </div>
              <div className="busc-method__cards">
                {BUSINESS_COURSE_METHOD.items.map((item) => (
                  <article key={item.num} className="busc-card busc-card--glass">
                    <span className="busc-card__num">{item.num}</span>
                    <h3 className="busc-card__title">{item.title}</h3>
                    <p className="busc-card__text">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Audience — rec2285016521 */}
        <section className="busc-section busc-audience">
          <div className="busc-container">
            <div className="busc-section-head">
              <span className="busc-label">{BUSINESS_COURSE_AUDIENCE.label}</span>
              <h2 className="busc-section-title">{BUSINESS_COURSE_AUDIENCE.title}</h2>
              <p className="busc-section-subtitle">{BUSINESS_COURSE_AUDIENCE.subtitle}</p>
            </div>
            <div className="busc-audience__grid">
              {BUSINESS_COURSE_AUDIENCE.items.map((item) => (
                <article key={item.title} className="busc-card busc-card--glass busc-card--dot">
                  <h3 className="busc-card__title">{item.title}</h3>
                  <p className="busc-card__text">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Program intro — rec2285022771 */}
        <section className="busc-section busc-program-intro">
          <div className="busc-container busc-section-head">
            <span className="busc-label">{BUSINESS_COURSE_PROGRAM_INTRO.label}</span>
            <h2 className="busc-section-title busc-section-title--lg">
              {BUSINESS_COURSE_PROGRAM_INTRO.title}
              <span className="busc-section-title__accent">{BUSINESS_COURSE_PROGRAM_INTRO.subtitle}</span>
            </h2>
            <p className="busc-section-subtitle">{BUSINESS_COURSE_PROGRAM_INTRO.text}</p>
          </div>
        </section>

        {/* Modules — rec2196401591 */}
        <section className="busc-section busc-modules" id="program">
          <div className="busc-container busc-modules__list">
            {BUSINESS_COURSE_MODULES.map((mod) => (
              <details key={mod.num} className="busc-module">
                <summary className="busc-module__summary">
                  <span className="busc-module__title">
                    <span className="busc-module__block">Блок </span>
                    <span className="busc-module__num">{mod.num}</span>
                    <span className="busc-module__name">{mod.title}</span>
                  </span>
                  <span className="busc-module__icon" aria-hidden />
                </summary>
                <div className="busc-module__body">
                  <p className="busc-module__lead">Ваши результаты после прохождения блока:</p>
                  <ul>
                    {mod.results.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
          <div className="busc-container busc-modules__cta-wrap">
            <button type="button" className="busc-btn busc-btn--primary busc-btn--lg" onClick={openPopup(setPopup, "apply")}>
              Поступить в институт
            </button>
          </div>
        </section>

        {/* Format — rec2302035251 */}
        <section className="busc-section busc-format">
          <div className="busc-container">
            <div className="busc-format__grid">
              {BUSINESS_COURSE_FORMAT.items.map((item) => (
                <article key={item.title} className="busc-card busc-card--glass busc-format__item">
                  <h3 className="busc-card__title">{item.title}</h3>
                  <p className="busc-card__text">{item.text}</p>
                </article>
              ))}
            </div>
            <div className="busc-format__head">
              <span className="busc-label">{BUSINESS_COURSE_FORMAT.label}</span>
              <h2 className="busc-section-title">{BUSINESS_COURSE_FORMAT.title}</h2>
            </div>
          </div>
        </section>

        {/* Sales — rec2302040081 */}
        <section className="busc-section busc-sales">
          <div className="busc-container busc-sales__grid">
            <div className="busc-sales__content">
              <span className="busc-label">{BUSINESS_COURSE_SALES.label}</span>
              <h2 className="busc-section-title busc-section-title--left">{BUSINESS_COURSE_SALES.title}</h2>
              <p className="busc-section-subtitle busc-section-subtitle--left">{BUSINESS_COURSE_SALES.subtitle}</p>
              <ul className="busc-sales__list">
                {BUSINESS_COURSE_SALES.items.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <button type="button" className="busc-btn busc-btn--primary" onClick={openPopup(setPopup, "tariff-supervision")}>
                Начать обучение
              </button>
            </div>
            <div className="busc-sales__media">
              <Image src={BUSINESS_COURSE_IMAGES.salesImage} alt="" width={560} height={420} className="busc-sales__image" />
            </div>
          </div>
        </section>

        {/* Author — rec2302676631 */}
        <section className="busc-section busc-author" id="author">
          <div className="busc-container busc-author__grid">
            <div className="busc-author__media">
              <Image
                src={BUSINESS_COURSE_IMAGES.authorDecor}
                alt=""
                width={520}
                height={520}
                className="busc-author__decor"
              />
              <Image
                src={BUSINESS_COURSE_IMAGES.authorFrame}
                alt=""
                width={400}
                height={480}
                className="busc-author__frame"
              />
              <Image
                src={BUSINESS_COURSE_IMAGES.authorPhoto}
                alt=""
                width={400}
                height={480}
                className="busc-author__photo"
              />
            </div>
            <div className="busc-author__content">
              <span className="busc-label">{BUSINESS_COURSE_AUTHOR.label}</span>
              <h2 className="busc-section-title busc-section-title--left busc-author__title">
                Эксперт-практик
                <span className="busc-section-title__accent">с системным образованием</span>
              </h2>
              <p className="busc-author__text">{BUSINESS_COURSE_AUTHOR.text}</p>
              <div className="busc-author__stats">
                {BUSINESS_COURSE_AUTHOR.stats.map((item) => (
                  <div key={item.label} className="busc-author__stat busc-card busc-card--glass">
                    <span className="busc-author__stat-value">{item.value}</span>
                    <span className="busc-author__stat-label">{item.label}</span>
                  </div>
                ))}
              </div>
              <p className="busc-author__quote">{BUSINESS_COURSE_AUTHOR.quote}</p>
            </div>
          </div>
        </section>

        {/* Diploma — rec2302724901 */}
        <section className="busc-section busc-diploma">
          <div className="busc-container busc-diploma__grid">
            <div className="busc-diploma__media">
              <Image
                src={BUSINESS_COURSE_IMAGES.diplomaOverlay1}
                alt=""
                width={120}
                height={120}
                className="busc-diploma__overlay busc-diploma__overlay--1"
              />
              <Image
                src={BUSINESS_COURSE_IMAGES.diplomaOverlay2}
                alt=""
                width={120}
                height={120}
                className="busc-diploma__overlay busc-diploma__overlay--2"
              />
              <Image
                src={BUSINESS_COURSE_IMAGES.diplomaPhoto}
                alt=""
                width={460}
                height={520}
                className="busc-diploma__photo"
              />
            </div>
            <div className="busc-diploma__content">
              <span className="busc-label">{BUSINESS_COURSE_DIPLOMA.label}</span>
              <h2 className="busc-section-title busc-section-title--left">{BUSINESS_COURSE_DIPLOMA.title}</h2>
              <p className="busc-diploma__text">{BUSINESS_COURSE_DIPLOMA.text}</p>
              <p className="busc-diploma__license">{BUSINESS_COURSE_DIPLOMA.license}</p>
              <ul className="busc-diploma__list">
                {BUSINESS_COURSE_DIPLOMA.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Tariffs — rec2302981921 */}
        <section className="busc-section busc-tariffs" id="tariffs">
          <div className="busc-container">
            <div className="busc-section-head">
              <span className="busc-label">Тарифы</span>
              <h2 className="busc-section-title">
                Выберите
                <br />
                формат обучения
              </h2>
              <p className="busc-section-subtitle">
                Доступна рассрочка на 24 месяца без переплат и оплата от юридического лица.
              </p>
            </div>
            <div className="busc-tariffs__grid">
              {BUSINESS_COURSE_TARIFFS.map((tariff) => (
                <article
                  key={tariff.id}
                  className={`busc-tariff${"featured" in tariff && tariff.featured ? " busc-tariff--featured" : ""}`}
                >
                  <h3 className="busc-tariff__name">{tariff.name}</h3>
                  <div className="busc-tariff__price">{tariff.price}</div>
                  <div className="busc-tariff__installment">{tariff.installment}</div>
                  <ul className="busc-tariff__features">
                    {tariff.features.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="busc-btn busc-btn--primary busc-btn--block"
                    onClick={openPopup(setPopup, `tariff-${tariff.id}` as BusinessCoursePopupKind)}
                  >
                    {tariff.cta}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — rec2303160161 */}
        <section className="busc-section busc-faq">
          <div className="busc-container">
            <div className="busc-section-head">
              <span className="busc-label">Вопросы</span>
              <h2 className="busc-section-title">Часто задаваемые вопросы</h2>
            </div>
            <FAQ
              items={BUSINESS_COURSE_FAQ.map((item) => ({ question: item.q, answer: item.a }))}
              variant="ic-accordion"
            />
          </div>
        </section>

        {/* Final CTA — rec2303311491 */}
        <section className="busc-section busc-final">
          <div className="busc-container busc-final__inner">
            <div className="busc-final__content">
              <h2 className="busc-section-title busc-section-title--left">{BUSINESS_COURSE_FINAL.title}</h2>
              <p className="busc-section-subtitle busc-section-subtitle--left">{BUSINESS_COURSE_FINAL.subtitle}</p>
              <span className="busc-badge">{BUSINESS_COURSE_FINAL.badge}</span>
            </div>
            <form
              className="busc-final__form"
              onSubmit={(e) => {
                e.preventDefault();
                openPopup(setPopup, "consultation")();
              }}
            >
              <input name="name" required placeholder="Ваше имя" className="busc-input" />
              <input name="phone" required placeholder="(000) 000-00-00" className="busc-input" />
              <button type="submit" className="busc-btn busc-btn--primary busc-btn--block">
                Записаться на консультацию
              </button>
              <p className="busc-final__legal">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <Link href="/privacy">политикой обработки персональных данных</Link>.
              </p>
            </form>
          </div>
        </section>
      </div>

      <BusinessCoursePopup kind={popup} onClose={() => setPopup(null)} />
    </>
  );
}
