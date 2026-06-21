"use client";

import { useEffect, useState, type FormEvent } from "react";

interface CallbackPopupProps {
  open: boolean;
  onClose: () => void;
}

type ContactMethod = "phone" | "telegram" | "whatsapp" | "max";

const CONTACT_METHODS: { id: ContactMethod; label: string }[] = [
  { id: "phone", label: "Телефон" },
  { id: "telegram", label: "Telegram" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "max", label: "Max" },
];

function formatRuPhone(value: string): string {
  const digits = value.replace(/\D/g, "").replace(/^[78]/, "").slice(0, 10);
  if (!digits) return "";

  const a = digits.slice(0, 3);
  const b = digits.slice(3, 6);
  const c = digits.slice(6, 8);
  const d = digits.slice(8, 10);

  if (digits.length <= 3) return `(${a}`;
  if (digits.length <= 6) return `(${a}) ${b}`;
  if (digits.length <= 8) return `(${a}) ${b}-${c}`;
  return `(${a}) ${b}-${c}-${d}`;
}

function ContactMethodIcon({ method, active }: { method: ContactMethod; active: boolean }) {
  if (method === "phone") {
    return (
      <svg width="18" height="18" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <circle cx="50" cy="50" r="50" fill={active ? "transparent" : "#000"} />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32.4 30.4c1.5-1.5 2.3-2.2 2.8-2.3.6-.2 1-.1 1.5.3.4.4 1.5 1.5 2.3 2.4 2.2 2.5 4.9 5.8 5.2 6.6.1.2.2.3.2.6 0 .6-.1.8-.9 1.5-1.3 1.1-3.3 3.2-4 4.2-.5.6-.5 1 0 1.7.3.6 2 2.9 3.2 4.3 2 2.4 4.3 4.6 6.6 6.3 1.7 1.3 4 2.7 5.6 3.5 1.1.5 1.5.5 2.2-.2.7-.7 1.5-1.7 2.9-3.7.4-.7.8-1.3.9-1.4.2-.2.5-.3.9-.3.3 0 .5 0 .6.1.3.1 1 .5 4 2.5 1.4.9 2.9 1.9 3.4 2.2 2.8 1.8 3.1 2 3.2 2.5.2.6 0 1-.9 2.2-1.1 1.5-3 3.5-4.4 4.7-1.1 1-2.6 2-4 2.7l-.6.3-.6 0c-1.8 0-3.5-.4-6.2-1.3-6.2-2.2-11.7-5.5-16.5-9.8-.9-.8-3-3-3.8-3.9-2.6-3-4.6-5.9-6.3-9.3-1.2-2.4-2.3-5.3-2.5-6.4-.3-1.6.4-3.8 2-6.1.9-1.4 1.9-2.6 3.4-4.1Z"
          fill="#fff"
        />
      </svg>
    );
  }

  if (method === "telegram") {
    return (
      <svg width="18" height="18" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path
          d="M50 8c23.2 0 42 18.8 42 42s-18.8 42-42 42S8 73.2 8 50 26.8 8 50 8Z"
          fill={active ? "transparent" : "#2AABEE"}
        />
        <path
          d="M73 31 61 69c-.8 2.8-2.2 3.5-4.5 2.2l-12-8.9-5.8 5.6c-.6.6-1.1 1.1-2.3 1.1l.8-12.1 22.3-20.1c1-.9-.2-1.4-1.5-.5L30 47.6 18.3 43.4c-2.5-.8-2.5-2.5.5-3.7L69.5 28c2.1-.8 3.9.5 3.5 3Z"
          fill={active ? "#2AABEE" : "#fff"}
        />
      </svg>
    );
  }

  if (method === "whatsapp") {
    return (
      <svg width="18" height="18" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path
          d="M50 8c23.2 0 42 18.8 42 42 0 7.4-1.9 14.3-5.3 20.3L88 92 68.5 82.4C62.8 85.1 56.6 86.5 50 86.5 26.8 86.5 8 67.7 8 44.5S26.8 8 50 8Z"
          fill={active ? "transparent" : "#25D366"}
        />
        <path
          d="M39.5 33.5c-1.2-.3-2.5-.1-3.6.5-1 .6-1.8 1.6-2.2 2.8-.8 2.2-.3 5 1.2 8.2 1.5 3.2 4.4 7.2 8.2 10.3 3.8 3.1 7.5 4.9 10.2 5.5 2.2.5 4.1.2 5.5-.8 1-.7 1.7-1.7 2-2.9l.8-3.2c.2-.8-.1-1.6-.8-2.1l-3.6-2.7c-.7-.5-1.6-.6-2.4-.2l-2.9 1.7c-.2.1-.5.1-.7 0-1.5-.8-3.7-2.4-5.4-4.3-1.7-1.9-2.8-4-3.3-5.5-.1-.2 0-.5.2-.7l2.2-2.5c.5-.6.6-1.4.3-2.1l-1.5-3.8c-.3-.8-1-1.3-1.8-1.4Z"
          fill={active ? "#25D366" : "#fff"}
        />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="callbackMaxGradient" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill={active ? "transparent" : "url(#callbackMaxGradient)"} />
      <path
        d="M42 34h16c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H42c-4.4 0-8-3.6-8-8V42c0-4.4 3.6-8 8-8Zm6 8v16l12-8-12-8Z"
        fill="#fff"
      />
    </svg>
  );
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

  useEffect(() => {
    if (!open) {
      setSent(false);
      setContactMethod("phone");
      setPhoneValue("");
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
    const fullPhone =
      contactMethod === "phone" && contactValue
        ? `+7${contactValue.replace(/\D/g, "")}`
        : contactValue;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "callback",
          name: data.get("name"),
          phone: fullPhone,
          contact: contactMethod,
          comment: data.get("comment"),
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    }
  }

  const contactPlaceholder =
    contactMethod === "telegram"
      ? "Username или номер телефона"
      : contactMethod === "phone"
        ? "(000) 000-00-00"
        : "Номер телефона";

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
                <div className="callback-popup__methods" role="radiogroup" aria-label="Способ связи">
                  {CONTACT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`callback-popup__method${contactMethod === method.id ? " callback-popup__method--active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="contact"
                        value={method.id}
                        checked={contactMethod === method.id}
                        onChange={() => {
                          setContactMethod(method.id);
                          setPhoneValue("");
                        }}
                        className="callback-popup__method-input"
                      />
                      <span className="callback-popup__method-icon">
                        <ContactMethodIcon method={method.id} active={contactMethod === method.id} />
                      </span>
                      <span className="callback-popup__method-label">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="callback-popup__field">
                {contactMethod === "phone" ? (
                  <div className="callback-popup__phone">
                    <span className="callback-popup__phone-prefix" aria-hidden="true">
                      <span className="callback-popup__phone-flag">🇷🇺</span>
                      <span>+7</span>
                    </span>
                    <input
                      name="contactValue"
                      required
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      value={phoneValue}
                      onChange={(event) => setPhoneValue(formatRuPhone(event.target.value))}
                      placeholder="(000) 000-00-00"
                      className="callback-popup__input callback-popup__input--phone"
                    />
                  </div>
                ) : (
                  <input
                    name="contactValue"
                    required
                    placeholder={contactPlaceholder}
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
