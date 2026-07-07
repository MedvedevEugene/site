"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { getPhoneCountryByIso, PhoneCountryInput } from "@/components/forms/PhoneCountryInput";
import {
  BUSINESS_COURSE_FINAL,
  BUSINESS_COURSE_POPUPS,
} from "@/lib/business-course-data";
import { buildFullPhoneNumber } from "@/lib/phone-format";
import { DEFAULT_PHONE_COUNTRY } from "@/lib/phone-countries";
import styles from "./BusinessCourseFinalCtaSection.module.css";

export function BusinessCourseFinalCtaSection() {
  const [sent, setSent] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneCountryIso, setPhoneCountryIso] = useState(DEFAULT_PHONE_COUNTRY.iso);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const countryIso = data.get("phoneCountry")?.toString() || DEFAULT_PHONE_COUNTRY.iso;
    const country = getPhoneCountryByIso(countryIso);
    const phone = buildFullPhoneNumber(country, data.get("phone")?.toString() || phoneValue);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: BUSINESS_COURSE_POPUPS.consultation.type,
          name: data.get("name"),
          phone,
        }),
      });
    } catch {
      /* fallback */
    }

    setSent(true);
  }

  return (
    <section className={styles.section} aria-labelledby="busc-final-title">
      <div className={styles.container}>
        <div className={styles.panel}>
          <span className={styles.label}>{BUSINESS_COURSE_FINAL.badge}</span>

          <h2 id="busc-final-title" className={styles.title}>
            Запишитесь на консультацию
            <br />
            и получите
            <br />
            <span className={styles.titleAccent}>программу курса</span>
          </h2>

          <p className={styles.subtitle}>{BUSINESS_COURSE_FINAL.subtitle}</p>

          {sent ? (
            <div className={styles.success}>
              <h3 className={styles.successTitle}>Спасибо!</h3>
              <p className={styles.successText}>Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                name="name"
                required
                placeholder="Ваше имя"
                autoComplete="name"
                className={styles.input}
              />

              <PhoneCountryInput
                value={phoneValue}
                onChange={setPhoneValue}
                countryIso={phoneCountryIso}
                onCountryChange={setPhoneCountryIso}
                inputName="phone"
                required
                className={styles.phoneInput}
              />

              <button type="submit" className={styles.submit}>
                Записаться на консультацию
              </button>

              <p className={styles.legal}>
                Нажимая кнопку, вы соглашаетесь с{" "}
                <Link href="/privacy">политикой обработки персональных данных</Link>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
