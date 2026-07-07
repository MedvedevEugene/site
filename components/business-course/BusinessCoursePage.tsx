"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQ } from "@/components/ui/FAQ";
import { BusinessCourseHeroSection } from "@/components/business-course/BusinessCourseHeroSection";
import { BusinessCourseMethodSection } from "@/components/business-course/BusinessCourseMethodSection";
import { BusinessCourseFormatSection } from "@/components/business-course/BusinessCourseFormatSection";
import { BusinessCourseProgramSection } from "@/components/business-course/BusinessCourseProgramSection";
import { BusinessCourseAuthorSection } from "@/components/business-course/BusinessCourseAuthorSection";
import { BusinessCourseDiplomaSection } from "@/components/business-course/BusinessCourseDiplomaSection";
import { BusinessCourseSalesSection } from "@/components/business-course/BusinessCourseSalesSection";
import { BusinessCoursePopup } from "@/components/business-course/BusinessCoursePopup";
import {
  BUSINESS_COURSE_AUDIENCE,
  BUSINESS_COURSE_FAQ,
  BUSINESS_COURSE_FINAL,
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
        <BusinessCourseHeroSection
          onProgramClick={openPopup(setPopup, "program")}
          onConsultationClick={openPopup(setPopup, "consultation")}
        />

        {/* Method — rec2284974381 */}
        <BusinessCourseMethodSection />

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

        {/* Program — rec2285022771 + rec2196401591 + rec2285026371 */}
        <BusinessCourseProgramSection onApply={openPopup(setPopup, "apply")} />

        {/* Format — rec2302035251 */}
        <BusinessCourseFormatSection />

        {/* Sales — rec2302040081 */}
        <BusinessCourseSalesSection onStartClick={openPopup(setPopup, "tariff-supervision")} />

        {/* Author — rec2302676631 */}
        <BusinessCourseAuthorSection />

        {/* Diploma — rec2302724901 */}
        <BusinessCourseDiplomaSection />

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
