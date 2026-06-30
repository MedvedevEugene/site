"use client";

import { useEffect, useState, type FormEvent } from "react";
import { BUSINESS_COURSE_POPUPS, type BusinessCoursePopupKind } from "@/lib/business-course-data";

type BusinessCoursePopupProps = {
  kind: BusinessCoursePopupKind | null;
  onClose: () => void;
};

export function BusinessCoursePopup({ kind, onClose }: BusinessCoursePopupProps) {
  const [sent, setSent] = useState(false);
  const config = kind ? BUSINESS_COURSE_POPUPS[kind] : null;

  useEffect(() => {
    if (!kind) setSent(false);
  }, [kind]);

  if (!kind || !config) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!config) return;
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: config.type,
          name: data.get("name"),
          phone: data.get("phone"),
        }),
      });
    } catch {
      /* fallback */
    }
    setSent(true);
  }

  return (
    <div className="busc-popup-overlay" onClick={onClose}>
      <div className="busc-popup" onClick={(e) => e.stopPropagation()}>
        {sent ? (
          <>
            <h3 className="busc-popup__title">Спасибо!</h3>
            <p className="busc-popup__text">Мы свяжемся с вами в ближайшее время.</p>
            <button type="button" className="busc-btn busc-btn--primary busc-btn--block" onClick={onClose}>
              Закрыть
            </button>
          </>
        ) : (
          <>
            <h3 className="busc-popup__title">{config.title}</h3>
            <p className="busc-popup__text">{config.description}</p>
            <form onSubmit={handleSubmit} className="busc-popup__form">
              <input name="name" required placeholder="Ваше имя" className="busc-input" />
              <input name="phone" required placeholder="(000) 000-00-00" className="busc-input" />
              <button type="submit" className="busc-btn busc-btn--primary busc-btn--block">
                {config.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
