"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE, EDUCATION_LINKS } from "@/lib/constants";
import { HELP_LINKS, TOOL_LINKS } from "@/lib/navigation";
import { buildFullPhoneNumber } from "@/lib/phone-format";
import { DEFAULT_PHONE_COUNTRY } from "@/lib/phone-countries";
import {
  getPhoneCountryByIso,
  PhoneCountryInput,
} from "@/components/forms/PhoneCountryInput";
import styles from "./ContactFooterSection.module.css";

function FooterLeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(DEFAULT_PHONE_COUNTRY.iso);
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
          type: "lead",
          source: "footer",
          name: data.get("name"),
          email: data.get("email"),
          phone: buildFullPhoneNumber(getPhoneCountryByIso(country), phone),
          metadata: {
            privacyConsent: true,
            marketingConsent: data.get("marketingConsent") === "on",
          },
        }),
      });
      if (!response.ok) throw new Error("Contact request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }
  if (status === "sent")
    return <p role="status">Спасибо! Мы свяжемся с вами в ближайшее время.</p>;
  return (
    <form className={styles.form} onSubmit={submit}>
      <input
        name="name"
        autoComplete="name"
        aria-label="Имя"
        placeholder="Имя"
        required
      />
      <PhoneCountryInput
        value={phone}
        onChange={setPhone}
        countryIso={country}
        onCountryChange={setCountry}
        inputName="phone"
        className={`site-footer__phone-country ${styles.phoneField}`}
        required
      />
      <input
        name="email"
        type="email"
        autoComplete="email"
        aria-label="Почта"
        placeholder="Почта"
      />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Отправляем…" : "Отправить заявку"}
      </button>
      <label className={styles.consent}>
        <input name="privacyConsent" type="checkbox" required />
        <span>
          Я согласен с <Link href="/privacy">политикой конфиденциальности</Link>
        </span>
      </label>
      <label className={styles.consent}>
        <input name="marketingConsent" type="checkbox" />
        <span>
          Я даю согласие на получение новостей, полезных материалов, рекламных
          предложений
        </span>
      </label>
      {status === "error" && (
        <p role="alert">
          Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.
        </p>
      )}
    </form>
  );
}
function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(min-width:768px)");
    const update = () => {
      if (ref.current) ref.current.open = media.matches;
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <details ref={ref} className={styles.linkGroup} open>
      <summary>
        {title}
        <span aria-hidden="true">⌄</span>
      </summary>
      <nav aria-label={title}>
        {links.map((link) => (
          <Link href={link.href} key={link.label}>
            {link.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
export function ContactFooterSection() {
  return (
    <footer className={styles.footer} id="contacts">
      <div className={styles.inner}>
        <section className={styles.lead} aria-labelledby="footer-lead-heading">
          <div>
            <h2 id="footer-lead-heading">
              Не знаете, с чего начать?
              <br />
              Поможем подобрать формат.
            </h2>
            <p>
              Оставьте контакты — ответим в течение дня, поможем выбрать формат
              (личная терапия, группы, обучение, бизнес-курс), сориентируем по
              расписанию и стоимости.
            </p>
          </div>
          <FooterLeadForm />
        </section>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/">
              <Image
                src="/images/site/tild3934-3966-4163-a230-616634613964__logo-white.svg"
                alt={`${SITE.name} — ${SITE.fullName}`}
                width={260}
                height={65}
              />
            </Link>
            <p>
              Обучение системным расстановкам, психологическая помощь и
              практические инструменты для личных и профессиональных запросов
            </p>
            <details className={styles.license}>
              <summary>
                Государственная лицензия <span aria-hidden="true">↗</span>
              </summary>
              <p>№ {SITE.license}</p>
            </details>
          </div>
          <div>
            <FooterLinks title="Обучение" links={EDUCATION_LINKS} />
            <FooterLinks title="Онлайн-сервисы" links={TOOL_LINKS.slice(1)} />
          </div>
          <div>
            <FooterLinks
              title="Психологическая помощь"
              links={HELP_LINKS.slice(1)}
            />
            <FooterLinks
              title="Институт"
              links={[
                {
                  label: "Специалисты",
                  href: "/specialists",
                },
                { label: "Календарь мероприятий", href: "/timetable" },
                { label: "Блог", href: "/blog" },
              ]}
            />
          </div>
          <div className={styles.contacts}>
            <h3>Контакты</h3>
            <div className={styles.contactGrid}>
              <div>
                <small>Звоните нам</small>
                <a href={`tel:${SITE.phone.replace(/[\s()-]/g, "")}`}>
                  {SITE.phoneDisplay}
                </a>
              </div>
              <div>
                <small>Пишите нам</small>
                <a
                  href="https://t.me/katrinskul"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Написать в Telegram"
                >
                  <Image
                    src="/images/site/tild6161-6231-4365-b061-653139623038__color.svg"
                    alt="Telegram"
                    width={32}
                    height={32}
                  />
                </a>
              </div>
              <div>
                <small>Наша почта</small>
                <a href="mailto:lifeinstitute@yandex.ru">
                  lifeinstitute@yandex.ru
                </a>
              </div>
              <div>
                Пн–Вс
                <br />с 09:00 до 21:00
                <br />
                по Москве
              </div>
            </div>
          </div>
        </div>
        <div className={styles.legal}>
          <p>© АНО «ИЖСИЗ», {new Date().getFullYear()}</p>
          <div>
            <Link href="/privacy">
              Политика в отношении обработки персональных данных
            </Link>
          </div>
          <p>
            Государственный контроль (надзор) в сфере образования: Департамент
            образования и науки города Москвы, Федеральная служба по надзору в
            сфере образования и науки
          </p>
          <p>
            Автономная некоммерческая организация «Институт жизненных систем и
            имплицитного знания» (АНО «ИЖСИЗ»)
            <br />
            ИНН 7751368714
            <br />
            ОГРН 1257700351820
          </p>
        </div>
      </div>
    </footer>
  );
}
