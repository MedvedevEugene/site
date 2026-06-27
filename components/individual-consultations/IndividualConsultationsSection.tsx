"use client";

import Link from "next/link";
import Image from "next/image";
import { FAQ } from "@/components/ui/FAQ";
import { ConsultationQuiz } from "@/components/individual-consultations/ConsultationQuiz";
import { useCallbackPopup } from "@/components/layout/CallbackPopupContext";
import {
  IC_FAQ,
  IC_FEATURES,
  IC_HERO_IMAGE,
  IC_METHODS,
  IC_PRICING,
  IC_SPECIALISTS,
  IC_STEPS,
  IC_TOPIC_ARROW,
  IC_TOPICS,
} from "@/lib/individual-consultations-data";

export function IndividualConsultationsSection() {
  const { openCallbackPopup } = useCallbackPopup();

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="ic-page">
      <section className="ic-page__hero">
        <div className="container-site">
          <nav className="ic-page__breadcrumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <span className="ic-page__breadcrumbs-sep">/</span>
            <span aria-current="page">Индивидуальные консультации</span>
          </nav>

          <div className="ic-page__hero-grid">
            <div className="ic-page__hero-copy">
              <h1 className="ic-page__hero-title">
                Индивидуальные консультации онлайн – чтобы лучше понять свою ситуацию и найти опору
              </h1>
              <p className="ic-page__hero-text">
                Спокойно разбираем личные и жизненные запросы, помогаем увидеть суть происходящего и подобрать подходящий
                формат дальнейшей работы.
              </p>
              <div className="ic-page__hero-actions">
                <button type="button" className="ic-page__btn ic-page__btn--hero ic-page__btn--primary" onClick={() => scrollTo("specialists")}>
                  ВЫБРАТЬ СПЕЦИАЛИСТА
                </button>
                <button type="button" className="ic-page__btn ic-page__btn--hero ic-page__btn--outline" onClick={() => scrollTo("quiz")}>
                  ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
                </button>
              </div>
            </div>
            <div className="ic-page__hero-media">
              <Image
                src={IC_HERO_IMAGE}
                alt=""
                fill
                className="ic-page__hero-image"
                sizes="(max-width: 1024px) 100vw, 620px"
                priority
              />
            </div>
          </div>

          <div className="ic-page__features">
            {IC_FEATURES.map((feature) => (
              <div key={feature.label} className="ic-page__feature">
                <div className="ic-page__feature-value">{feature.value}</div>
                <div className="ic-page__feature-label">{feature.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ic-page__section ic-page__section--cream">
        <div className="container-site">
          <h2 className="ic-page__title ic-page__title--center">Когда это помогает?</h2>
          <div className="ic-page__topics">
            {IC_TOPICS.map((topic) => (
              <article key={topic.title} className="ic-topic">
                <Image src={topic.image} alt="" fill className="ic-topic__image" sizes="(max-width: 768px) 100vw, 33vw" />
                <span className="ic-topic__arrow" aria-hidden="true">
                  <Image src={IC_TOPIC_ARROW} alt="" width={30} height={30} />
                </span>
                <div className="ic-topic__content">
                  <h3 className="ic-topic__title">{topic.title}</h3>
                  <p className="ic-topic__text">{topic.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ic-page__section ic-page__section--pricing">
        <div className="container-site">
          <h2 className="ic-page__title ic-page__title--center ic-page__title--pricing">Форматы и стоимость</h2>
          <div className="ic-page__pricing">
            {IC_PRICING.map((item) => (
              <article key={item.title} className="ic-price-card">
                <div className="ic-price-card__head">
                  <h3 className="ic-price-card__title">{item.title}</h3>
                  <div className="ic-price-card__icon">
                    <Image src={item.icon} alt="" width={142} height={142} className="object-contain" />
                  </div>
                </div>
                <p className="ic-price-card__text">{item.description}</p>
                <button type="button" className="ic-page__btn ic-page__btn--price" onClick={() => openCallbackPopup()}>
                  {item.cta}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ic-page__section">
        <div className="container-site ic-page__narrow">
          <h2 className="ic-page__title ic-page__title--center">Как проходит работа?</h2>
          <FAQ items={[...IC_STEPS]} />
        </div>
      </section>

      <section className="ic-page__section ic-page__section--methods">
        <div className="container-site">
          <h2 className="ic-page__title ic-page__title--light">Методы работы</h2>
          <div className="ic-page__methods">
            {IC_METHODS.map((method) => (
              <article key={method.title} className={`ic-method ic-method--${method.tone}`}>
                <div className="ic-method__icon">
                  <Image src={method.icon} alt="" width={48} height={48} className="object-contain" />
                </div>
                <h3 className="ic-method__title">{method.title}</h3>
                <p className="ic-method__text">{method.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ic-page__section" id="quiz">
        <div className="container-site">
          <h2 className="ic-page__title">Подберем вам специалиста</h2>
          <ConsultationQuiz />
        </div>
      </section>

      <section className="ic-page__section" id="specialists">
        <div className="container-site">
          <div className="ic-page__specialists-head">
            <h2 className="ic-page__title m-0">Наши специалисты</h2>
            <Link href="/specialists" className="ic-page__btn ic-page__btn--outline-dark ic-page__btn--sm">
              Все специалисты
            </Link>
          </div>
          <div className="ic-page__specialists">
            {IC_SPECIALISTS.map((specialist) => (
              <article key={specialist.slug} className="ic-specialist">
                <div className="ic-specialist__photo">
                  <Image src={specialist.photo} alt={specialist.name} fill className="object-cover object-top" sizes="280px" />
                </div>
                <div className="ic-specialist__body">
                  <p className="ic-specialist__name">{specialist.name}</p>
                  <p className="ic-specialist__role">{specialist.role}</p>
                  <div className="ic-specialist__actions">
                    <button type="button" className="ic-page__btn ic-page__btn--primary ic-page__btn--sm" onClick={() => scrollTo("quiz")}>
                      Запись
                    </button>
                    <Link href={`/teachers/${specialist.slug}`} className="ic-page__btn ic-page__btn--outline-dark ic-page__btn--sm">
                      О специалисте
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ic-page__section ic-page__section--faq">
        <div className="container-site ic-page__narrow">
          <h2 className="ic-page__title ic-page__title--center">Ответы на вопросы</h2>
          <FAQ items={[...IC_FAQ]} />
        </div>
      </section>
    </div>
  );
}
