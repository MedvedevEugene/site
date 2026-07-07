"use client";

import { useState } from "react";
import { BusinessCourseHeroSection } from "@/components/business-course/BusinessCourseHeroSection";
import { BusinessCourseMethodSection } from "@/components/business-course/BusinessCourseMethodSection";
import { BusinessCourseFormatSection } from "@/components/business-course/BusinessCourseFormatSection";
import { BusinessCourseProgramSection } from "@/components/business-course/BusinessCourseProgramSection";
import { BusinessCourseAuthorSection } from "@/components/business-course/BusinessCourseAuthorSection";
import { BusinessCourseDiplomaSection } from "@/components/business-course/BusinessCourseDiplomaSection";
import { BusinessCourseFaqSection } from "@/components/business-course/BusinessCourseFaqSection";
import { BusinessCourseSalesSection } from "@/components/business-course/BusinessCourseSalesSection";
import { BusinessCourseTariffsSection } from "@/components/business-course/BusinessCourseTariffsSection";
import { BusinessCourseFinalCtaSection } from "@/components/business-course/BusinessCourseFinalCtaSection";
import { BusinessCoursePopup } from "@/components/business-course/BusinessCoursePopup";
import {
  BUSINESS_COURSE_AUDIENCE,
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
        <BusinessCourseTariffsSection
          onTariffClick={(tariffId) => openPopup(setPopup, `tariff-${tariffId}` as BusinessCoursePopupKind)()}
        />

        {/* FAQ — rec2303158621 + rec2303160161 */}
        <BusinessCourseFaqSection />

        {/* Final CTA — rec2303311491 */}
        <BusinessCourseFinalCtaSection />
      </div>

      <BusinessCoursePopup kind={popup} onClose={() => setPopup(null)} />
    </>
  );
}
