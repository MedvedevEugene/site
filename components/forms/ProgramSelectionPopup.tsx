"use client";

import { useEffect, useState, type FormEvent } from "react";

interface ProgramSelectionPopupProps {
  open: boolean;
  onClose: () => void;
}

export function ProgramSelectionPopup({ open, onClose }: ProgramSelectionPopupProps) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) setSent(false);
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "program-selection",
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
      <div className="bg-white rounded-[10px] p-8 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        {sent ? (
          <>
            <h3 className="font-body text-xl font-medium m-0 mb-3 text-center">Спасибо!</h3>
            <p className="text-muted m-0 mb-6 text-center">
              Мы свяжемся с вами и поможем подобрать программу.
            </p>
            <button type="button" className="btn btn-primary w-full" onClick={onClose}>
              Закрыть
            </button>
          </>
        ) : (
          <>
            <h3 className="font-body text-xl font-medium m-0 mb-2 text-center text-primary">
              Подберём программу под ваш запрос
            </h3>
            <p className="text-muted text-sm m-0 mb-6 text-center leading-relaxed">
              Оставьте заявку, и специалист Института поможет выбрать программу, которая лучше всего
              соответствует вашему запросу и текущей жизненной ситуации.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                name="name"
                required
                placeholder="Ваше имя"
                className="border border-[#c9c9c9] rounded-[5px] px-4 py-3 text-base"
              />
              <input
                name="phone"
                required
                placeholder="Телефон"
                className="border border-[#c9c9c9] rounded-[5px] px-4 py-3 text-base"
              />
              <select name="contact" className="border border-[#c9c9c9] rounded-[5px] px-4 py-3 text-base">
                <option value="phone">Телефон</option>
                <option value="telegram">Telegram</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="max">Max</option>
              </select>
              <button type="submit" className="btn btn-primary w-full mt-2">
                Отправить
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
