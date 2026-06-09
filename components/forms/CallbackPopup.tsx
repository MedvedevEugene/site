"use client";

import { useState } from "react";

interface CallbackPopupProps {
  open: boolean;
  onClose: () => void;
}

export function CallbackPopup({ open, onClose }: CallbackPopupProps) {
  const [sent, setSent] = useState(false);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "callback",
          name: data.get("name"),
          phone: data.get("phone"),
          contact: data.get("contact"),
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-[20px] p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        {sent ? (
          <>
            <h3 className="font-heading text-xl m-0 mb-3">Спасибо!</h3>
            <p className="text-muted m-0 mb-6">Мы свяжемся с вами в ближайшее время.</p>
            <button type="button" className="btn btn-primary w-full" onClick={onClose}>Закрыть</button>
          </>
        ) : (
          <>
            <h3 className="font-heading text-xl m-0 mb-2">Заказать обратный звонок</h3>
            <p className="text-muted text-sm m-0 mb-6">Мы свяжемся с вами в будние дни с 10:00 до 18:00.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input name="name" required placeholder="Имя" className="border border-border rounded-[10px] px-4 py-3 text-base" />
              <input name="phone" required placeholder="Телефон" className="border border-border rounded-[10px] px-4 py-3 text-base" />
              <select name="contact" className="border border-border rounded-[10px] px-4 py-3 text-base">
                <option value="phone">Phone</option>
                <option value="telegram">Telegram</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="max">Max</option>
              </select>
              <button type="submit" className="btn btn-primary w-full mt-2">Отправить</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[150] bg-white border border-border rounded-[20px] p-5 shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
      <p className="text-sm text-muted m-0 mb-4">
        Используя сайт, вы соглашаетесь на работу файлов cookie. Обработка данных ведётся по{" "}
        <a href="/privacy" className="underline">Политике персональных данных</a>.
      </p>
      <button type="button" className="btn btn-primary w-full" onClick={() => setVisible(false)}>
        Принимаю
      </button>
    </div>
  );
}

export function ContactForm({ title, subtitle }: { title?: string; subtitle?: string }) {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
