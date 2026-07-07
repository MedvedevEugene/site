"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { getPhoneCountryByIso, PhoneCountryInput } from "@/components/forms/PhoneCountryInput";
import { BASE_COURSE_POPUPS } from "@/lib/base-course-data";
import { buildFullPhoneNumber } from "@/lib/phone-format";
import { DEFAULT_PHONE_COUNTRY } from "@/lib/phone-countries";
import styles from "./BaseCourseFinalCtaSection.module.css";

const config = BASE_COURSE_POPUPS.discount;

export function BaseCourseFinalCtaSection() {
  const [sent, setSent] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneCountryIso, setPhoneCountryIso] = useState(DEFAULT_PHONE_COUNTRY.iso);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const countryIso = data.get("phoneCountry")?.toString() || DEFAULT_PHONE_COUNTRY.iso;
    const country = getPhoneCountryByIso(countryIso);
    const phone = buildFullPhoneNumber(country, data.get("phone")?.toString() || "");

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: config.type,
          name: data.get("name"),
          phone,
          message: data.get("message"),
        }),
      });
    } catch {
      /* fallback */
    }

    setSent(true);
  }

  return (
    <section className={styles.section} aria-labelledby="bc-final-cta-title">
      <div className={styles.wrap}>
        <div className={styles.card}>
          <h2 id="bc-final-cta-title" className={styles.title}>
            {config.title}
          </h2>
          <p className={styles.subtitle}>{config.description}</p>

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
                placeholder="Имя"
                autoComplete="name"
                className={styles.input}
              />

              <PhoneCountryInput
                value={phoneValue}
                onChange={setPhoneValue}
                countryIso={phoneCountryIso}
                onCountryChange={setPhoneCountryIso}
                inputName="phone"
                className={styles.phoneInput}
              />

              <input
                name="message"
                required
                placeholder="В какое время вам перезвонить?"
                className={styles.input}
              />

              <button type="submit" className={styles.submit}>
                Записаться на консультацию
              </button>

              <p className={styles.legal}>
                Нажимая на кнопку я соглашаюсь с{" "}
                <Link href="/privacy">политикой конфиденциальности.</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
