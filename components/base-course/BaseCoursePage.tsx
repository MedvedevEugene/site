"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FAQ } from "@/components/ui/FAQ";
import { BaseCoursePopup } from "@/components/base-course/BaseCoursePopup";
import { BaseCourseReviewsCarousel } from "@/components/base-course/BaseCourseReviewsCarousel";
import { BaseCourseAudienceSection } from "@/components/base-course/BaseCourseAudienceSection";
import { BaseCourseReasonsSection } from "@/components/base-course/BaseCourseReasonsSection";
import { BaseCourseAboutSection } from "@/components/base-course/BaseCourseAboutSection";
import { BaseCourseStepsSection } from "@/components/base-course/BaseCourseStepsSection";
import {
  BASE_COURSE_CREATOR,
  BASE_COURSE_FAQ,
  BASE_COURSE_HERO,
  BASE_COURSE_IMAGES,
  BASE_COURSE_MODULES,
  BASE_COURSE_TARIFFS,
  type BaseCoursePopupKind,
} from "@/lib/base-course-data";

function openPopup(setter: (k: BaseCoursePopupKind) => void, kind: BaseCoursePopupKind) {
  return () => setter(kind);
}

export function BaseCoursePage() {
  const [popup, setPopup] = useState<BaseCoursePopupKind | null>(null);

  return (
    <>
      <div className="bc-page">
        <div className="bc-header-spacer" aria-hidden />

        <div className="container-site">
          <nav className="bc-breadcrumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <span className="bc-breadcrumbs__sep">/</span>
            <span>Базовый курс по расстановкам</span>
          </nav>
        </div>

        {/* Hero — rec1458816781 */}
        <section className="bc-section bc-hero">
          <div className="container-site bc-hero__wrapper">
            <div className="bc-hero__main">
              <div className="bc-hero__content">
                <div className="bc-hero__title-wrap">
                  <h1 className="bc-hero__title">{BASE_COURSE_HERO.title}</h1>
                  <div className="bc-hero__discount" aria-label="Скидка 11%">
                    <span className="bc-hero__discount-label">скидка</span>
                    <span className="bc-hero__discount-value">{BASE_COURSE_HERO.discount}</span>
                  </div>
                </div>
                <p className="bc-hero__subtitle">{BASE_COURSE_HERO.subtitle}</p>
                <div className="bc-hero__actions">
                  <button type="button" className="bc-btn bc-btn--dark bc-btn--hero" onClick={openPopup(setPopup, "application")}>
                    заявка на обучение
                  </button>
                  <button type="button" className="bc-btn bc-btn--outline bc-btn--hero bc-btn--hero-outline" onClick={openPopup(setPopup, "consultation")}>
                    Получить консультацию
                  </button>
                </div>
              </div>
              <div className="bc-hero__media">
                <Image
                  src={BASE_COURSE_IMAGES.hero}
                  alt=""
                  width={520}
                  height={340}
                  priority
                  className="bc-hero__photo"
                />
              </div>
            </div>
            <div className="bc-hero__stats">
              {BASE_COURSE_HERO.stats.map((item) => (
                <div key={item.label} className="bc-hero__stat">
                  <div className="bc-hero__stat-head">
                    <span className="bc-hero__stat-dot" aria-hidden />
                    <div className="bc-hero__stat-label">{item.label}</div>
                  </div>
                  <div className="bc-hero__stat-value">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8 reasons — rec1458878661 */}
        <BaseCourseReasonsSection />

        {/* Audience — rec1458816791 */}
        <BaseCourseAudienceSection onConsultation={openPopup(setPopup, "consultation")} />

        {/* 7 steps — rec1458973181 */}
        <BaseCourseStepsSection onApply={openPopup(setPopup, "application")} />

        {/* About constellations — rec1458816801 */}
        <BaseCourseAboutSection onConsultation={openPopup(setPopup, "consultation")} />

        {/* Program — rec1458816831, t668 */}
        <section className="bc-section">
          <div className="container-site">
            <h2 className="bc-section-title">Программа курса</h2>
            <div className="bc-program">
              {BASE_COURSE_MODULES.map((module) => (
                <details key={module} className="bc-program__item">
                  <summary className="bc-program__summary">{module}</summary>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews — rec1458816841 + rec1458816851 t994 */}
        <section className="bc-section bc-section--cream bc-reviews-section">
          <div className="container-site">
            <h2 className="bc-section-title">Отзывы</h2>
            <p className="bc-section-subtitle">Люди говорят о результатах</p>
            <BaseCourseReviewsCarousel />
            <div className="bc-center mt-8">
              <button type="button" className="bc-btn bc-btn--dark bc-btn--hero" onClick={openPopup(setPopup, "application")}>
                хочу жизнь мечты
              </button>
            </div>
          </div>
        </section>

        {/* Tariffs — rec1458816871 */}
        <section className="bc-section bc-tariffs-section">
          <Image
            src={BASE_COURSE_IMAGES.tariffsDecor}
            alt=""
            width={1400}
            height={400}
            className="bc-tariffs-section__decor"
            aria-hidden
          />
          <div className="container-site">
            <h2 className="bc-section-title">Выбирай свой формат участия</h2>
            <p className="bc-section-subtitle">Три уровня поддержки для твоего развития</p>
            <div className="bc-tariffs">
              {BASE_COURSE_TARIFFS.map((tariff) => (
                <article key={tariff.id} className="bc-tariff">
                  <div className="bc-tariff__discount">-11%</div>
                  <h3 className="bc-tariff__name">{tariff.name}</h3>
                  <div className="bc-tariff__prices">
                    <span className="bc-tariff__old">{tariff.oldPrice}</span>
                    <span className="bc-tariff__mid">{tariff.midPrice}</span>
                    <span className="bc-tariff__price">{tariff.price}</span>
                  </div>
                  <ul className="bc-tariff__features">
                    {tariff.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="bc-btn bc-btn--dark bc-tariff__btn"
                    onClick={openPopup(setPopup, tariff.id as BaseCoursePopupKind)}
                  >
                    выбрать тариф
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — rec1458816891, t668 */}
        <section className="bc-section bc-section--cream bc-faq-section">
          <div className="container-site">
            <h2 className="bc-section-title bc-faq-section__title">Ответы на частые вопросы</h2>
            <p className="bc-section-subtitle">А что если:</p>
            <FAQ items={[...BASE_COURSE_FAQ]} variant="ic-accordion" />
          </div>
        </section>

        {/* Creator — rec1458816911 */}
        <section className="bc-section">
          <div className="container-site bc-creator">
            <div className="bc-creator__photo-wrap">
              <Image
                src={BASE_COURSE_IMAGES.creator}
                alt={BASE_COURSE_CREATOR.name}
                width={360}
                height={420}
                className="bc-creator__photo"
              />
            </div>
            <div className="bc-creator__content">
              <h2 className="bc-section-title bc-section-title--left">Создатель курса</h2>
              <h3 className="bc-creator__name">{BASE_COURSE_CREATOR.name}</h3>
              <p className="bc-creator__quote">{BASE_COURSE_CREATOR.quote}</p>
              <ul className="bc-creator__credentials">
                {BASE_COURSE_CREATOR.credentials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="bc-creator__bio">{BASE_COURSE_CREATOR.bio}</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bc-section bc-section--cream bc-final">
          <div className="container-site bc-final__inner">
            <h2 className="bc-section-title">
              Забронируйте скидку 11% и получите бесплатную консультацию
            </h2>
            <button type="button" className="bc-btn bc-btn--dark bc-final__btn" onClick={openPopup(setPopup, "discount")}>
              Оставить заявку
            </button>
            <p className="bc-final__note">Мы свяжемся с вами в любое удобное для вас время</p>
          </div>
        </section>
      </div>

      <BaseCoursePopup kind={popup} onClose={() => setPopup(null)} />
    </>
  );
}
