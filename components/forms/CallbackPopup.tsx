"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CONTACT_METHOD_PLACEHOLDERS, type ContactMethod } from "@/lib/contact-form-data";
import { buildFullPhoneNumber } from "@/lib/phone-format";
import { DEFAULT_PHONE_COUNTRY } from "@/lib/phone-countries";
import { ContactMethodPicker } from "@/components/forms/ContactMethodPicker";
import { getPhoneCountryByIso, PhoneCountryInput } from "@/components/forms/PhoneCountryInput";

interface CallbackPopupProps {
  open: boolean;
  onClose: () => void;
}

function CloseIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 23 23" aria-hidden="true">
      <g fill="#fff" fillRule="evenodd">
        <rect transform="translate(11.314 11.314) rotate(-45)" x="10.314" y="-3.686" width="2" height="30" />
        <rect transform="translate(11.314 11.314) rotate(-315)" x="10.314" y="-3.686" width="2" height="30" />
      </g>
    </svg>
  );
}

export function CallbackPopup({ open, onClose }: CallbackPopupProps) {
  const [sent, setSent] = useState(false);
  const [contactMethod, setContactMethod] = useState<ContactMethod>("phone");
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneCountryIso, setPhoneCountryIso] = useState(DEFAULT_PHONE_COUNTRY.iso);

  useEffect(() => {
    if (!open) {
      setSent(false);
      setContactMethod("phone");
      setPhoneValue("");
      setPhoneCountryIso(DEFAULT_PHONE_COUNTRY.iso);
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const contactValue = data.get("contactValue")?.toString() || "";
    const countryIso = data.get("contactValueCountry")?.toString() || DEFAULT_PHONE_COUNTRY.iso;
    const country = getPhoneCountryByIso(countryIso);
    const phone =
      contactMethod === "phone" || contactMethod === "whatsapp"
        ? buildFullPhoneNumber(country, contactValue)
        : contactValue;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "callback",
          name: data.get("name"),
          phone,
          contact: contactMethod,
          comment: data.get("comment"),
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    }
  }

  const usesPhoneInput = contactMethod === "phone" || contactMethod === "whatsapp";
  const textPlaceholder = CONTACT_METHOD_PLACEHOLDERS[contactMethod];

  return (
    <div className="callback-popup" role="dialog" aria-modal="true" aria-label="Задайте нам вопрос">
      <button type="button" className="callback-popup__overlay" aria-label="Закрыть" onClick={onClose} />
      <button type="button" className="callback-popup__close" aria-label="Закрыть диалоговое окно" onClick={onClose}>
        <CloseIcon />
      </button>

      <div className="callback-popup__container" onClick={(e) => e.stopPropagation()}>
        {sent ? (
          <div className="callback-popup__wrapper">
            <div className="callback-popup__head">
              <h3 className="callback-popup__title">Спасибо!</h3>
              <p className="callback-popup__descr">Мы свяжемся с вами в ближайшее время.</p>
            </div>
            <button type="button" className="callback-popup__submit" onClick={onClose}>
              <span className="callback-popup__submit-icon" aria-hidden="true">→</span>
              <span>Закрыть</span>
            </button>
          </div>
        ) : (
          <div className="callback-popup__wrapper">
            <div className="callback-popup__head">
              <h3 className="callback-popup__title">Задайте нам вопрос</h3>
              <p className="callback-popup__descr">
                Мы свяжемся с вами в будние дни <u>с 10:00 до 18:00</u>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="callback-popup__form">
              <div className="callback-popup__field">
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Ваше имя"
                  className="callback-popup__input"
                />
              </div>

              <div className="callback-popup__field">
                <ContactMethodPicker
                  value={contactMethod}
                  onChange={(method) => {
                    setContactMethod(method);
                    setPhoneValue("");
                  }}
                />
              </div>

              <div className="callback-popup__field">
                {usesPhoneInput ? (
                  <PhoneCountryInput
                    value={phoneValue}
                    onChange={setPhoneValue}
                    countryIso={phoneCountryIso}
                    onCountryChange={setPhoneCountryIso}
                    inputName="contactValue"
                  />
                ) : (
                  <input
                    name="contactValue"
                    required
                    placeholder={textPlaceholder ?? ""}
                    className="callback-popup__input"
                  />
                )}
              </div>

              <div className="callback-popup__field">
                <textarea
                  name="comment"
                  required
                  rows={3}
                  placeholder="Комментарий"
                  className="callback-popup__textarea"
                />
              </div>

              <button type="submit" className="callback-popup__submit">
                <span className="callback-popup__submit-icon" aria-hidden="true">→</span>
                <span>Заказать обратный звонок</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("cookie-accepted")) {
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  function accept() {
    localStorage.setItem("cookie-accepted", "1");
    setVisible(false);
  }

  return (
    <div className="fixed bottom-5 right-5 left-5 md:left-auto z-[150] md:max-w-[480px] lg:max-w-[560px] bg-[#ebebeb] rounded-[10px] p-5 shadow-[0_5px_15px_rgba(0,0,0,0.08)]">
      <p className="text-sm text-primary m-0 mb-4 leading-relaxed">
        Используя сайт, вы соглашаетесь на работу файлов cookie. Они помогают нам лучше настроить
        взаимодействие и поддерживать стабильное, понятное цифровое пространство. Обработка данных
        ведётся по{" "}
        <a href="/privacy" className="underline">Политике персональных данных</a>.
      </p>
      <button
        type="button"
        className="rounded-[5px] border border-[#999] bg-white px-6 py-2.5 text-sm font-medium text-primary hover:bg-cream-bg"
        onClick={accept}
      >
        Принимаю
      </button>
    </div>
  );
}

export function ContactForm({ title, subtitle }: { title?: string; subtitle?: string }) {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "lead",
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
        }),
      });
    } catch {
      /* fallback */
    }
    setSent(true);
  }

  if (sent) {
    return <p className="text-white opacity-90">Спасибо! Мы свяжемся с вами в ближайшее время.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {title && <h3 className="font-heading text-xl text-white m-0">{title}</h3>}
      {subtitle && <p className="text-white/90 text-sm m-0 mb-2">{subtitle}</p>}
      <input name="name" required placeholder="Имя" className="border-0 rounded-[10px] px-4 py-3.5 text-base" />
      <input name="phone" required placeholder="Телефон" className="border-0 rounded-[10px] px-4 py-3.5 text-base" />
      <input name="email" type="email" placeholder="Почта" className="border-0 rounded-[10px] px-4 py-3.5 text-base" />
      <button type="submit" className="btn bg-white text-primary hover:bg-cream-bg mt-2">Отправить заявку</button>
    </form>
  );
}
