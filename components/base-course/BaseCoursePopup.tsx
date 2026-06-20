"use client";

import { useEffect, useState, type FormEvent } from "react";
import { BASE_COURSE_POPUPS, type BaseCoursePopupKind } from "@/lib/base-course-data";

interface BaseCoursePopupProps {
  kind: BaseCoursePopupKind | null;
  onClose: () => void;
}

export function BaseCoursePopup({ kind, onClose }: BaseCoursePopupProps) {
  const [sent, setSent] = useState(false);
  const config = kind ? BASE_COURSE_POPUPS[kind] : null;

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
          contact: data.get("contact"),
          message: data.get("message"),
        }),
      });
    } catch {
      /* fallback */
    }
    setSent(true);
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-[10px] p-8 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        {sent ? (
          <>
            <h3 className="font-body text-xl font-medium m-0 mb-3 text-center">Спасибо!</h3>
            <p className="text-muted m-0 mb-6 text-center">Мы свяжемся с вами в ближайшее время.</p>
            <button type="button" className="bc-btn bc-btn--dark w-full" onClick={onClose}>
              Закрыть
            </button>
          </>
        ) : (
          <>
            <h3 className="font-body text-xl font-medium m-0 mb-2 text-center text-[#272344]">{config.title}</h3>
            <p className="text-muted text-sm m-0 mb-6 text-center leading-relaxed">{config.description}</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                name="name"
                required
                placeholder="Имя"
                className="bc-input"
              />
              <input
                name="phone"
                required
                placeholder="Телефон"
                className="bc-input"
              />
              {kind === "discount" && (
                <input name="message" placeholder="В какое время вам перезвонить?" className="bc-input" />
              )}
              <select name="contact" className="bc-input">
                <option value="phone">Телефон</option>
                <option value="telegram">Telegram</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="max">Max</option>
              </select>
              <button type="submit" className="bc-btn bc-btn--dark w-full mt-2">
                {config.submit}
              </button>
              <p className="text-[11px] text-muted m-0 text-center leading-relaxed">
                Нажимая на кнопку, вы соглашаетесь с{" "}
                <a href="/privacy" className="underline">
                  политикой конфиденциальности
                </a>
                .
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
