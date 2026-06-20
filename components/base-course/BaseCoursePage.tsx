"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FAQ } from "@/components/ui/FAQ";
import { BaseCoursePopup } from "@/components/base-course/BaseCoursePopup";
import {
  BASE_COURSE_ABOUT,
  BASE_COURSE_AUDIENCE,
  BASE_COURSE_CREATOR,
  BASE_COURSE_FAQ,
  BASE_COURSE_HERO,
  BASE_COURSE_IMAGES,
  BASE_COURSE_MODULES,
  BASE_COURSE_NOT_PSYCHOLOGIST,
  BASE_COURSE_REASONS,
  BASE_COURSE_STEPS,
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

        {/* Hero */}
        <section className="bc-section bc-hero">
          <div className="container-site bc-hero__grid">
            <div className="bc-hero__content">
              <h1 className="bc-hero__title">{BASE_COURSE_HERO.title}</h1>
              <p className="bc-hero__subtitle">{BASE_COURSE_HERO.subtitle}</p>
              <div className="bc-hero__actions">
                <button type="button" className="bc-btn bc-btn--dark" onClick={openPopup(setPopup, "application")}>
                  заявка на обучение
                </button>
                <button type="button" className="bc-btn bc-btn--outline" onClick={openPopup(setPopup, "consultation")}>
                  Получить консультацию
                </button>
              </div>
              <div className="bc-hero__stats">
                {BASE_COURSE_HERO.stats.map((item) => (
                  <div key={item.label} className="bc-hero__stat">
                    <div className="bc-hero__stat-label">{item.label}</div>
                    <div className="bc-hero__stat-value">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bc-hero__media">
              <div className="bc-hero__discount">
                <span>{BASE_COURSE_HERO.discount}</span>
              </div>
              <Image
                src={BASE_COURSE_IMAGES.hero}
                alt=""
                width={642}
                height={420}
                priority
                className="bc-hero__photo"
              />
            </div>
          </div>
        </section>

        {/* 8 reasons */}
        <section className="bc-section">
          <div className="container-site">
            <h2 className="bc-section-title">8 причин пойти на курс</h2>
            <div className="bc-reasons">
              {BASE_COURSE_REASONS.map((item, index) => (
                <div key={item.text} className="bc-reason">
                  <div className="bc-reason__num">{index + 1}.</div>
                  <Image src={item.image} alt="" width={48} height={48} className="bc-reason__icon" />
                  <p className="bc-reason__text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audience */}
        <section className="bc-section bc-section--cream">
          <div className="container-site">
            <h2 className="bc-section-title">Для кого предназначен курс?</h2>
            <div className="bc-audience">
              {BASE_COURSE_AUDIENCE.map((item) => (
                <div key={item.title} className="bc-audience__card">
                  <Image src={item.image} alt="" width={64} height={64} className="bc-audience__icon" />
                  <h3 className="bc-audience__title">{item.title}</h3>
                  <p className="bc-audience__text">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="bc-not-psychologist">
              <h3 className="bc-not-psychologist__title">{BASE_COURSE_NOT_PSYCHOLOGIST.title}</h3>
              <p className="bc-not-psychologist__text">{BASE_COURSE_NOT_PSYCHOLOGIST.text}</p>
            </div>
            <div className="bc-center mt-10">
              <button type="button" className="bc-btn bc-btn--dark" onClick={openPopup(setPopup, "consultation")}>
                Получить консультацию
              </button>
            </div>
          </div>
        </section>

        {/* 7 steps */}
        <section className="bc-section">
          <div className="container-site bc-steps">
            <div className="bc-steps__content">
              <h2 className="bc-section-title bc-section-title--left">7 шагов на курсе</h2>
              <ol className="bc-steps__list">
                {BASE_COURSE_STEPS.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <div className="bc-steps__actions">
                <span className="bc-steps__label">К новой профессии</span>
                <button type="button" className="bc-btn bc-btn--dark" onClick={openPopup(setPopup, "application")}>
                  начать учиться
                </button>
              </div>
            </div>
            <div className="bc-steps__media">
              <Image src={BASE_COURSE_IMAGES.steps} alt="" width={400} height={400} className="w-full h-auto max-w-[360px]" />
            </div>
          </div>
        </section>

        {/* About constellations */}
        <section className="bc-section bc-section--cream">
          <div className="container-site bc-about">
            <div className="bc-about__content">
              <h2 className="bc-section-title bc-section-title--left">что такое расстановки?</h2>
              <ul className="bc-about__list">
                {BASE_COURSE_ABOUT.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3 className="bc-about__subtitle">Зачем нужны и почему работают?</h3>
            </div>
            <div className="bc-about__images">
              <Image src={BASE_COURSE_IMAGES.about1} alt="" width={280} height={280} className="bc-about__img" />
              <Image src={BASE_COURSE_IMAGES.about2} alt="" width={200} height={200} className="bc-about__img bc-about__img--small" />
            </div>
          </div>
          <div className="container-site bc-center mt-10">
            <button type="button" className="bc-btn bc-btn--dark" onClick={openPopup(setPopup, "consultation")}>
              Получить консультацию
            </button>
          </div>
        </section>

        {/* Program */}
        <section className="bc-section">
          <div className="container-site">
            <h2 className="bc-section-title">Программа курса</h2>
            <div className="bc-program">
              {BASE_COURSE_MODULES.map((module, index) => (
                <details key={module} className="bc-program__item" open={index === 0}>
                  <summary className="bc-program__summary">{module}</summary>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews placeholder */}
        <section className="bc-section bc-section--cream">
          <div className="container-site">
            <h2 className="bc-section-title">Отзывы</h2>
            <p className="bc-section-subtitle">Люди говорят о результатах</p>
            <div className="bc-reviews">
              {[
                "Курс изменил моё понимание себя и отношений в семье.",
                "Получила профессию, которую давно искала, и уверенность в практике.",
                "Структура обучения и поддержка сонаставников — на высшем уровне.",
              ].map((text) => (
                <blockquote key={text} className="bc-review">
                  {text}
                </blockquote>
              ))}
            </div>
            <div className="bc-center mt-8">
              <button type="button" className="bc-btn bc-btn--dark" onClick={openPopup(setPopup, "application")}>
                хочу жизнь мечты
              </button>
            </div>
          </div>
        </section>

        {/* Tariffs */}
        <section className="bc-section">
          <div className="container-site">
            <h2 className="bc-section-title">Выбирай свой формат участия</h2>
            <p className="bc-section-subtitle">Три уровня поддержки для твоего развития</p>
            <div className="bc-tariffs">
              {BASE_COURSE_TARIFFS.map((tariff) => (
                <article
                  key={tariff.id}
                  className={`bc-tariff ${"featured" in tariff && tariff.featured ? "bc-tariff--featured" : ""}`}
                >
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

        {/* FAQ */}
        <section className="bc-section bc-section--cream">
          <div className="container-site">
            <h2 className="bc-section-title">Ответы на частые вопросы</h2>
            <p className="bc-section-subtitle">А что если:</p>
            <FAQ items={[...BASE_COURSE_FAQ]} />
          </div>
        </section>

        {/* Creator */}
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
