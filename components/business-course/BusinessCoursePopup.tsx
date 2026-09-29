"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  BUSINESS_COURSE_POPUPS,
  type BusinessCoursePopupKind,
} from "@/lib/business-course-data";
import styles from "./BusinessCoursePopup.module.css";

type Props = { kind: BusinessCoursePopupKind | null; onClose: () => void };
export function BusinessCoursePopup({ kind, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const config = kind ? BUSINESS_COURSE_POPUPS[kind] : null;
  useEffect(() => {
    const element = dialog.current;
    if (!kind || !element) return;
    setStatus("idle");
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [kind]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!config || status === "sending") return;
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: config.type,
          source: "business-course",
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          metadata: { privacyConsent: true },
        }),
      });
      if (!response.ok) throw new Error("Contact request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }
  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby="business-popup-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.content}>
        <button
          className={styles.close}
          type="button"
          onClick={onClose}
          aria-label="Закрыть форму"
        >
          ×
        </button>
        <h2 id="business-popup-title">
          {status === "sent" ? "Спасибо!" : config?.title}
        </h2>
        {status === "sent" ? (
          <>
            <p role="status">Мы свяжемся с вами в ближайшее время.</p>
            <button className={styles.submit} type="button" onClick={onClose}>
              Закрыть
            </button>
          </>
        ) : (
          <>
            <p>{config?.description}</p>
            <form onSubmit={submit}>
              <label>
                Ваше имя
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                Телефон
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+7 (000) 000-00-00"
                  required
                />
              </label>
              <label>
                Почта
                <input name="email" type="email" autoComplete="email" />
              </label>
              <label className={styles.consent}>
                <input name="privacyConsent" type="checkbox" required />
                <span>
                  Я согласен с{" "}
                  <Link href="/privacy">политикой конфиденциальности</Link>
                </span>
              </label>
              <button
                type="submit"
                className={styles.submit}
                disabled={status === "sending"}
              >
                {status === "sending" ? "Отправляем…" : config?.submit}
              </button>
              {status === "error" && (
                <p role="alert">
                  Не удалось отправить заявку. Попробуйте ещё раз или позвоните
                  нам.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
