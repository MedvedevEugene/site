"use client";

import Link from "next/link";
import Image from "next/image";
import { FAQ } from "@/components/ui/FAQ";
import { ContactForm } from "@/components/forms/CallbackPopup";
import { useCallbackPopup } from "@/components/layout/CallbackPopupContext";
import {
  TT_CONSULTATION,
  TT_CORRECTIONS,
  TT_DIRECTIONS,
  TT_DOBAUKIVANIE_FORMATS,
  TT_FAQ,
  TT_FEATURES,
  TT_HERO_IMAGE,
  TT_LEADER,
  TT_PELENANIE,
  TT_PRICING,
  TT_SESSION_STEPS,
  TT_STATES,
  TT_TOPIC_ARROW,
} from "@/lib/telese-terapiya-data";

export function TeleseTerapiyaSection() {
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
            <span aria-current="page">Телесно-ориентированная терапия</span>
          </nav>

          <div className="ic-page__hero-grid">
            <div className="ic-page__hero-copy">
              <h1 className="ic-page__hero-title">
                Телесно-ориентированная терапия — работа с телом, состоянием и внутренним ресурсом
              </h1>
              <p className="ic-page__hero-text">
                Практики добаюкивания, пеленания и телесных правок помогают снять напряжение, восстановить контакт с
                собой и мягко проработать глубинные переживания.
              </p>
              <div className="ic-page__hero-actions">
                <button
                  type="button"
                  className="ic-page__btn ic-page__btn--hero ic-page__btn--primary"
                  onClick={() => scrollTo("signup")}
                >
                  ЗАПИСАТЬСЯ
                </button>
                <button
                  type="button"
                  className="ic-page__btn ic-page__btn--hero ic-page__btn--outline"
                  onClick={() => scrollTo("dobaukivanie")}
                >
                  ФОРМАТЫ ДОБАЮКИВАНИЯ
                </button>
              </div>
            </div>
            <div className="ic-page__hero-media">
              <Image
                src={TT_HERO_IMAGE}
                alt=""
                fill
                className="ic-page__hero-image"
                sizes="(max-width: 1024px) 100vw, 620px"
                priority
              />
            </div>
          </div>

          <div className="ic-page__features">
            {TT_FEATURES.map((feature) => (
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
          <h2 className="ic-page__title ic-page__title--center">С какими состояниями и запросами можно прийти</h2>
          <div className="ic-page__topics">
            {TT_STATES.map((topic) => (
              <article key={topic.title} className="ic-topic">
                <Image src={topic.image} alt="" fill className="ic-topic__image" sizes="(max-width: 768px) 100vw, 33vw" />
                <span className="ic-topic__arrow" aria-hidden="true">
                  <Image src={TT_TOPIC_ARROW} alt="" width={30} height={30} />
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

      <section className="ic-page__section ic-page__section--methods">
        <div className="container-site ic-page__methods-wrap">
          <h2 className="ic-page__title ic-page__title--center ic-page__title--methods ic-page__title--light">
            Основные направления телесной работы
          </h2>
          <div className="ic-page__methods">
            {TT_DIRECTIONS.map((method) => (
              <article key={method.title} className="ic-method">
                <div className="ic-method__icon">
                  <Image src={method.icon} alt="" width={150} height={150} className="ic-method__icon-img" />
                </div>
                <div className="ic-method__body">
                  <h3 className="ic-method__title">{method.title}</h3>
                  <p className="ic-method__text">{method.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ic-page__section ic-page__section--cream" id="dobaukivanie">
        <div className="container-site ic-page__steps max-w-[900px]">
          <h2 className="ic-page__title ic-page__title--center">Добаюкивание</h2>
          <p className="ic-page__subtitle mx-auto text-center">
            Бережные практики восстановления раннего опыта заботы и безопасности. Внутри — форматы под разные запросы:
          </p>
          <FAQ items={[...TT_DOBAUKIVANIE_FORMATS]} variant="ic-accordion" />
        </div>
      </section>

      <section className="ic-page__section">
        <div className="container-site grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[960px]">
          <article className="card p-8">
            <h3 className="font-heading text-xl font-medium m-0 mb-3">Пеленание</h3>
            <p className="text-muted m-0 leading-relaxed">{TT_PELENANIE}</p>
          </article>
          <article className="card p-8">
            <h3 className="font-heading text-xl font-medium m-0 mb-3">Телесные правки</h3>
            <p className="text-muted m-0 leading-relaxed">{TT_CORRECTIONS}</p>
          </article>
        </div>
      </section>

      <section className="ic-page__section ic-page__section--cream">
        <div className="container-site ic-page__narrow">
          <h2 className="ic-page__title ic-page__title--center">Телесно-ориентированная терапия и консультация</h2>
          <p className="ic-page__subtitle m-0 mx-auto text-center">{TT_CONSULTATION}</p>
        </div>
      </section>

      <section className="ic-page__section ic-page__section--steps">
        <div className="container-site ic-page__steps">
          <h2 className="ic-page__title ic-page__title--center ic-page__title--steps">Как проходит встреча</h2>
          <FAQ items={[...TT_SESSION_STEPS]} variant="ic-accordion" />
        </div>
      </section>

      <section className="ic-page__section">
        <div className="container-site">
          <h2 className="ic-page__title ic-page__title--center">Специалист / ведущий практик</h2>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 max-w-[800px] mx-auto items-start">
            <Image
              src={TT_LEADER.photo}
              alt={TT_LEADER.name}
              width={280}
              height={360}
              className="w-full rounded-[20px] object-cover aspect-[3/4]"
            />
            <div>
              <h3 className="font-heading text-2xl font-medium m-0 mb-1">{TT_LEADER.name}</h3>
              <p className="text-muted m-0 mb-4">{TT_LEADER.role}</p>
              <p className="text-muted m-0 mb-6 leading-relaxed">{TT_LEADER.bio}</p>
              <Link href={TT_LEADER.href} className="ic-page__btn ic-page__btn--primary">
                Подробнее о специалисте
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ic-page__section ic-page__section--pricing">
        <div className="container-site">
          <h2 className="ic-page__title ic-page__title--center ic-page__title--pricing">Стоимость и запись</h2>
          <div className="ic-page__pricing">
            {TT_PRICING.map((item) => (
              <article key={item.title} className="ic-price-card">
                <div className="ic-price-card__icon">
                  <Image src={item.icon} alt="" width={142} height={142} className="object-contain" />
                </div>
                <h3 className="ic-price-card__title">{item.title}</h3>
                <p className="ic-price-card__text">{item.description}</p>
                <button type="button" className="ic-page__btn ic-page__btn--price" onClick={() => openCallbackPopup()}>
                  {item.cta}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ic-page__section ic-page__section--faq">
        <div className="container-site ic-page__faq">
          <h2 className="ic-page__title--center ic-page__title--faq m-0">Частые вопросы</h2>
          <FAQ items={[...TT_FAQ]} variant="ic-accordion" />
        </div>
      </section>

      <section className="ic-page__section ic-page__section--cream" id="signup">
        <div className="container-site">
          <div className="bg-gradient-to-br from-primary to-[#5a5478] rounded-[20px] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 text-white">
            <div>
              <h2 className="font-heading text-[28px] m-0 mb-3">Запись на телесную практику</h2>
              <p className="opacity-90 m-0 leading-relaxed">
                Оставьте контакты — мы подберём формат, специалиста и удобное время для встречи.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
