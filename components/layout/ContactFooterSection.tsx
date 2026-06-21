"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { SITE } from "@/lib/constants";
import { FOOTER_COLUMNS, IMAGES } from "@/lib/site-data";

function FooterLeadForm() {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "lead",
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          contact: data.get("contact"),
        }),
      });
    } catch {
      /* fallback */
    }
    setSent(true);
  }

  if (sent) {
    return <p className="text-white/90 m-0">Спасибо! Мы свяжемся с вами в ближайшее время.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input name="name" required placeholder="Имя" className="rounded-[10px] border-0 px-4 py-3.5 text-base text-primary" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input name="phone" required placeholder="+7 (000) 000-00-00" className="rounded-[10px] border-0 px-4 py-3.5 text-base text-primary" />
        <input name="email" type="email" placeholder="Почта" className="rounded-[10px] border-0 px-4 py-3.5 text-base text-primary" />
      </div>
      <select name="contact" className="rounded-[10px] border-0 px-4 py-3.5 text-base text-primary bg-white">
        <option value="phone">Телефон</option>
        <option value="telegram">Telegram</option>
        <option value="whatsapp">WhatsApp</option>
        <option value="max">Max</option>
      </select>
      <label className="flex items-start gap-2 text-sm text-white/80">
        <input type="checkbox" required className="mt-1" />
        <span>
          Я согласен с{" "}
          <Link href="/privacy" className="underline">политикой конфиденциальности</Link>.
        </span>
      </label>
      <button type="submit" className="btn btn-primary-solid self-start mt-1">Отправить заявку</button>
    </form>
  );
}

export function ContactFooterSection() {
  return (
    <footer className="footer-dark">
      <div className="footer-dark__shell">
      <div className="container-site pt-[100px] pb-10">
        <div className="bg-primary-card rounded-[32px] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          <div>
            <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-medium m-0 mb-4 text-white leading-snug">
              Нужна опора, терапия<br />или обучение? Мы подскажем.
            </h2>
            <p className="text-white/80 m-0 leading-relaxed">
              Оставьте контакты – ответим в течение дня, поможем выбрать формат (личная терапия, группы,
              обучение, бизнес-курс), сориентируем по расписанию и стоимости.
            </p>
          </div>
          <FooterLeadForm />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h4 className="footer-col-title">{FOOTER_COLUMNS.programs.title}</h4>
            {FOOTER_COLUMNS.programs.links.map((l) => (
              <Link key={l.href + l.label} href={l.href} className="block text-sm text-white/85 mb-2.5 hover:text-white">
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 mt-8">
              <SafeImage src={IMAGES.logoCircle} alt="" width={48} height={48} className="w-12 h-12 shrink-0" />
              <SafeImage src={IMAGES.logoWhite} alt={SITE.name} width={140} height={40} className="h-10 w-auto" />
            </div>
          </div>
          <div>
            <h4 className="footer-col-title">{FOOTER_COLUMNS.about.title}</h4>
            {FOOTER_COLUMNS.about.links.map((l) => (
              <Link key={l.href + l.label} href={l.href} className="block text-sm text-white/85 mb-2.5 hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="footer-col-title">Контакты</h4>
            <a href={`tel:${SITE.phoneAlt.replace(/[\s()-]/g, "")}`} className="block text-sm text-white/85 mb-2.5 hover:text-white">
              {SITE.phoneAlt}
            </a>
            <a href={`mailto:${SITE.email}`} className="block text-sm text-white/85 mb-4 hover:text-white">
              {SITE.email}
            </a>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white grid place-items-center text-primary text-xs font-bold">VK</a>
              <a href="#" className="w-9 h-9 rounded-full bg-white grid place-items-center text-primary text-xs font-bold">TG</a>
            </div>
          </div>
          <div>
            <h4 className="footer-col-title">{FOOTER_COLUMNS.extra.title}</h4>
            {FOOTER_COLUMNS.extra.links.map((l) => (
              <Link key={l.href + l.label} href={l.href} className="block text-sm text-white/85 mb-2.5 hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex justify-between flex-wrap gap-3 text-[13px] text-white/60">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <Link href="/privacy" className="hover:text-white">Политика конфиденциальности</Link>
        </div>
      </div>
      </div>
    </footer>
  );
}
