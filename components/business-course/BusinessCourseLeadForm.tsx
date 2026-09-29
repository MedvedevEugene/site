"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import styles from "./BusinessCoursePage.module.css";

export function BusinessCourseLeadForm() {
  const [status, setStatus] = useState("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "business-course-consultation",
          source: "business-course",
          name: data.get("name"),
          phone: data.get("phone"),
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
    <form className={styles.leadForm} onSubmit={submit}>
      {status === "sent" ? (
        <p role="status">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
      ) : (
        <>
          <label>
            Имя
            <input
              name="name"
              autoComplete="name"
              placeholder="Как к вам обращаться"
              required
            />
          </label>
          <label>
            Телефон
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+7 900 000 00 00"
              required
            />
          </label>
          <label className={styles.formConsent}>
            <input type="checkbox" required />
            <span>
              Я согласен с{" "}
              <Link href="/privacy">политикой конфиденциальности</Link>
            </span>
          </label>
          <button className={styles.button} disabled={status === "sending"}>
            {status === "sending"
              ? "Отправляем…"
              : "Записаться на консультацию"}
          </button>
          {status === "error" && (
            <p role="alert">
              Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.
            </p>
          )}
        </>
      )}
    </form>
  );
}
