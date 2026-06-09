"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TimetablePage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/calendar")
      .then((r) => r.json())
      .then((data) => setEvents(data.events || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="py-8 md:py-12">
        <div className="container-site">
          <div className="text-sm text-muted mb-6">
            <Link href="/">Главная</Link> / Расписание
          </div>
          <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium m-0 mb-4">Расписание</h1>
          <p className="text-lg text-muted max-w-[640px] m-0 mb-10">
            В этом разделе вы найдёте расписание всех наших программ, занятий и групп — выберите подходящее время.
          </p>

          {loading ? (
            <p className="text-muted">Загрузка расписания...</p>
          ) : events.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-muted m-0">Ближайших событий пока нет. Следите за обновлениями.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {events.map((event) => (
                <div key={event.id} className="card flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-64 shrink-0 font-medium text-primary">{formatDate(event.start)}</div>
                  <div className="flex-1">
                    <h3 className="font-heading text-base font-medium m-0 mb-1">{event.title}</h3>
                    {event.description && <p className="text-sm text-muted m-0">{event.description}</p>}
                  </div>
                  <Link href="/individual-consultations" className="btn btn-outline shrink-0">Записаться</Link>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 p-6 bg-cream-bg rounded-[20px] border border-border">
            <p className="text-sm text-muted m-0">
              <strong>Для администраторов:</strong> расписание обновляется автоматически из Google Calendar.
              Добавьте событие в календарь — оно появится на сайте.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
