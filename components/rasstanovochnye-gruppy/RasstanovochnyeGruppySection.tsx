"use client";

import Link from "next/link";
import Image from "next/image";
import { FAQ } from "@/components/ui/FAQ";
import { ContactForm } from "@/components/forms/CallbackPopup";
import { useCallbackPopup } from "@/components/layout/CallbackPopupContext";
import {
  RG_DAY_STEPS,
  RG_DEPUTY_VALUE,
  RG_FEATURES,
  RG_FORMATS,
  RG_HERO_IMAGE,
  RG_LEADER,
  RG_MODES,
  RG_PRICING,
  RG_SIGNUP_STEPS,
  RG_FAQ,
  RG_TOPIC_ARROW,
  RG_TOPICS,
} from "@/lib/rasstanovochnye-gruppy-data";

export function RasstanovochnyeGruppySection() {
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
            <span aria-current="page">Расстановочные группы</span>
          </nav>

          <div className="ic-page__hero-grid">
            <div className="ic-page__hero-copy">
              <h1 className="ic-page__hero-title">
                Расстановочные группы — глубинная работа с личными и системными запросами
              </h1>
              <p className="ic-page__hero-text">
                Очные и онлайн-группы для тех, кто хочет разобрать важную жизненную тему или познакомиться с методом
                через участие заместителем.
              </p>
              <div className="ic-page__hero-actions">
                <button
                  type="button"
                  className="ic-page__btn ic-page__btn--hero ic-page__btn--primary"
                  onClick={() => scrollTo("signup")}
                >
                  ЗАПИСАТЬСЯ В ГРУППУ
                </button>
                <Link href="/timetable" className="ic-page__btn ic-page__btn--hero ic-page__btn--outline">
                  БЛИЖАЙШИЕ ДАТЫ
                </Link>
              </div>
            </div>
            <div className="ic-page__hero-media">
              <Image
                src={RG_HERO_IMAGE}
                alt=""
                fill
                className="ic-page__hero-image"
                sizes="(max-width: 1024px) 100vw, 620px"
                priority
              />
            </div>
          </div>

          <div className="ic-page__features">
            {RG_FEATURES.map((feature) => (
              <div key={feature.label} className="ic-page__feature">
                <div className="ic-page__feature-value">{feature.value}</div>
                <div className="ic-page__feature-label">{feature.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ic-page__section">
        <div className="container-site ic-page__narrow">
          <h2 className="ic-page__title">Что такое расстановочная группа</h2>
          <p className="ic-page__subtitle m-0">
            Это групповой формат системной работы, в котором через поле расстановки проявляются скрытые связи,
            динамики и закономерности вашей жизни. Вы видите ситуацию шире — и находите новые опоры для изменений.
          </p>
        </div>
      </section>

      <section className="ic-page__section ic-page__section--cream">
        <div className="container-site">
          <h2 className="ic-page__title ic-page__title--center">Личная работа и участие заместителем</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[960px] mx-auto">
            {RG_FORMATS.map((item) => (
              <article key={item.title} className="card p-8">
                <h3 className="font-heading text-xl font-medium m-0 mb-3 text-[#3b3758]">{item.title}</h3>
                <p className="text-muted m-0 leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ic-page__section">
        <div className="container-site">
          <h2 className="ic-page__title ic-page__title--center">Очные и онлайн-группы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[960px] mx-auto">
            {RG_MODES.map((item) => (
              <article key={item.title} className="card p-8 border-primary/20">
                <h3 className="font-heading text-xl font-medium m-0 mb-3 text-[#3b3758]">{item.title}</h3>
                <p className="text-muted m-0 leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ic-page__section ic-page__section--cream">
        <div className="container-site">
          <h2 className="ic-page__title ic-page__title--center">С какими запросами можно прийти</h2>
          <div className="ic-page__topics">
            {RG_TOPICS.map((topic) => (
              <article key={topic.title} className="ic-topic">
                <Image src={topic.image} alt="" fill className="ic-topic__image" sizes="(max-width: 768px) 100vw, 33vw" />
                <span className="ic-topic__arrow" aria-hidden="true">
                  <Image src={RG_TOPIC_ARROW} alt="" width={30} height={30} />
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

      <section className="ic-page__section ic-page__section--steps">
        <div className="container-site ic-page__steps">
          <h2 className="ic-page__title ic-page__title--center ic-page__title--steps">Как проходит очный день</h2>
          <FAQ items={[...RG_DAY_STEPS]} variant="ic-accordion" />
        </div>
      </section>

      <section className="ic-page__section ic-page__section--cream">
        <div className="container-site max-w-[800px]">
          <h2 className="ic-page__title ic-page__title--center">Ценность участия заместителем</h2>
          <ul className="space-y-3 text-lg text-muted m-0 pl-5">
            {RG_DEPUTY_VALUE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ic-page__section">
        <div className="container-site">
          <h2 className="ic-page__title ic-page__title--center">Ведущая группы</h2>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 max-w-[800px] mx-auto items-start">
            <Image
              src={RG_LEADER.photo}
              alt={RG_LEADER.name}
              width={280}
              height={360}
              className="w-full rounded-[20px] object-cover aspect-[3/4]"
            />
            <div>
              <h3 className="font-heading text-2xl font-medium m-0 mb-1">{RG_LEADER.name}</h3>
              <p className="text-muted m-0 mb-4">{RG_LEADER.role}</p>
              <p className="text-muted m-0 mb-6 leading-relaxed">{RG_LEADER.bio}</p>
              <Link href={RG_LEADER.href} className="ic-page__btn ic-page__btn--primary">
                Подробнее о специалисте
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ic-page__section ic-page__section--cream" id="dates">
        <div className="container-site text-center max-w-[640px]">
          <h2 className="ic-page__title ic-page__title--center">Ближайшие даты</h2>
          <p className="text-muted text-lg m-0 mb-8">
            Расстановочные группы проходят в течение года. Актуальное расписание — в календаре на сайте. Количество
            мест ограничено.
          </p>
          <Link href="/timetable" className="ic-page__btn ic-page__btn--primary">
            Смотреть расписание
          </Link>
        </div>
      </section>

      <section className="ic-page__section ic-page__section--pricing">
        <div className="container-site">
          <h2 className="ic-page__title ic-page__title--center ic-page__title--pricing">Стоимость участия</h2>
          <div className="ic-page__pricing">
            {RG_PRICING.map((item) => (
              <article key={item.title} className="ic-price-card">
                <div className="ic-price-card__icon">
                  <Image src={item.icon} alt="" width={142} height={142} className="object-contain" />
                </div>
                <h3 className="ic-price-card__title">{item.title}</h3>
                <p className="ic-price-card__text">{item.description}</p>
                <button
                  type="button"
                  className="ic-page__btn ic-page__btn--price"
                  onClick={() => openCallbackPopup("constellation-groups")}
                >
                  {item.cta}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ic-page__section ic-page__section--steps">
        <div className="container-site ic-page__steps">
          <h2 className="ic-page__title ic-page__title--center ic-page__title--steps">Как записаться</h2>
          <FAQ items={[...RG_SIGNUP_STEPS]} variant="ic-accordion" />
        </div>
      </section>

      <section className="ic-page__section ic-page__section--faq">
        <div className="container-site ic-page__faq">
          <h2 className="ic-page__title--center ic-page__title--faq m-0">Частые вопросы</h2>
          <FAQ items={[...RG_FAQ]} variant="ic-accordion" />
        </div>
      </section>

      <section className="ic-page__section ic-page__section--cream" id="signup">
        <div className="container-site">
          <div className="bg-gradient-to-br from-primary to-[#5a5478] rounded-[20px] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 text-white">
            <div>
              <h2 className="font-heading text-[28px] m-0 mb-3">Записаться в расстановочную группу</h2>
              <p className="opacity-90 m-0 leading-relaxed">
                Оставьте контакты — расскажем о формате, ближайших датах и поможем выбрать участие с запросом или
                заместителем.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
