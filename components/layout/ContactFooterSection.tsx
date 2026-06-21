"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { FOOTER_COLUMNS, IMAGES } from "@/lib/site-data";
import { buildFullPhoneNumber } from "@/lib/phone-format";
import { DEFAULT_PHONE_COUNTRY } from "@/lib/phone-countries";
import { getPhoneCountryByIso, PhoneCountryInput } from "@/components/forms/PhoneCountryInput";

function FooterLeadForm() {
  const [sent, setSent] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneCountryIso, setPhoneCountryIso] = useState(DEFAULT_PHONE_COUNTRY.iso);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const country = getPhoneCountryByIso(data.get("phoneCountry")?.toString() || DEFAULT_PHONE_COUNTRY.iso);
    const phone = buildFullPhoneNumber(country, data.get("phone")?.toString() || phoneValue);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "lead",
          name: data.get("name"),
          phone,
          email: data.get("email"),
        }),
      });
    } catch {
      /* fallback */
    }
    setSent(true);
  }

  if (sent) {
    return <p className="site-footer__form-success m-0">Спасибо! Мы свяжемся с вами в ближайшее время.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="site-footer__form">
      <input
        name="name"
        required
        placeholder="Имя"
        className="site-footer__input site-footer__input--full"
      />
      <div className="site-footer__input-row">
        <PhoneCountryInput
          value={phoneValue}
          onChange={setPhoneValue}
          countryIso={phoneCountryIso}
          onCountryChange={setPhoneCountryIso}
          inputName="phone"
          inputClassName="site-footer__input site-footer__input--phone"
          className="site-footer__phone-country"
        />
        <input
          name="email"
          type="email"
          placeholder="Почта"
          className="site-footer__input"
        />
      </div>
      <label className="site-footer__checkbox">
        <input type="checkbox" required />
        <span>
          Я согласен с{" "}
          <Link href="/privacy" className="site-footer__checkbox-link">
            политикой конфиденциальности
          </Link>
          .
        </span>
      </label>
      <button type="submit" className="site-footer__submit">
        ОТПРАВИТЬ ЗАЯВКУ
      </button>
    </form>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div className="site-footer__col">
      <h4 className="site-footer__col-title">{title}</h4>
      <div className="site-footer__col-divider" aria-hidden="true" />
      <nav className="site-footer__links">
        {links.map((link) => (
          <Link key={link.href + link.label} href={link.href} className="site-footer__link">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function ContactFooterSection() {
  return (
    <footer className="site-footer">
      <div className="site-footer__shell">
        <div className="container-site site-footer__inner">
          <div className="site-footer__lead">
            <div className="site-footer__lead-text">
              <h2 className="site-footer__lead-title">
                Нужна опора, терапия
                <br />
                или обучение? Мы&nbsp;подскажем.
              </h2>
              <p className="site-footer__lead-copy">
                Оставьте контакты&nbsp;– ответим в&nbsp;течение дня, поможем выбрать формат (личная
                терапия, группы, обучение, бизнес-курс), сориентируем по&nbsp;расписанию и&nbsp;стоимости.
              </p>
            </div>
            <FooterLeadForm />
          </div>

          <div className="site-footer__grid">
            <div className="site-footer__col site-footer__col--programs">
              <FooterColumn title={FOOTER_COLUMNS.programs.title} links={FOOTER_COLUMNS.programs.links} />
              <Image
                src={IMAGES.logoWhite}
                alt={SITE.fullName}
                width={300}
                height={48}
                className="site-footer__logo"
              />
            </div>

            <FooterColumn title={FOOTER_COLUMNS.about.title} links={FOOTER_COLUMNS.about.links} />

            <div className="site-footer__col site-footer__col--contacts">
              <h4 className="site-footer__col-title">Контакты</h4>
              <div className="site-footer__col-divider" aria-hidden="true" />
              <div className="site-footer__contact-row">
                <div className="site-footer__contacts">
                  <a href={`tel:${SITE.phoneAlt.replace(/[\s()-]/g, "")}`} className="site-footer__link">
                    {SITE.phoneAlt}
                  </a>
                  <a href={`mailto:${SITE.email}`} className="site-footer__link site-footer__link--email">
                    {SITE.email}
                  </a>
                </div>
                <div className="site-footer__socials">
                  <a href="#" className="site-footer__social" aria-label="VK">
                    <Image src={IMAGES.footerSocialVk} alt="" width={47} height={47} />
                  </a>
                  <a href="#" className="site-footer__social" aria-label="Telegram">
                    <Image src={IMAGES.footerSocialTg} alt="" width={47} height={47} />
                  </a>
                </div>
              </div>

              <div className="site-footer__extra">
                <h4 className="site-footer__col-title">{FOOTER_COLUMNS.extra.title}</h4>
                <div className="site-footer__col-divider" aria-hidden="true" />
                <nav className="site-footer__links">
                  {FOOTER_COLUMNS.extra.links.map((link) => (
                    <Link key={link.href + link.label} href={link.href} className="site-footer__link">
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
