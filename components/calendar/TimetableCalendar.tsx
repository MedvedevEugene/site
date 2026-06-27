"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string | null;
  startAt: string;
  endAt: string;
  instructor?: string | null;
  format: string;
  eventType?: string | null;
  link?: string | null;
}

type ViewMode = "week" | "month" | "list";

const WEEKDAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const MONTHS = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

function startOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDayHeader(date: Date) {
  return `${WEEKDAYS[(date.getDay() + 6) % 7]} ${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

function formatType(type?: string | null) {
  const map: Record<string, string> = {
    group: "Расстановочная группа",
    course: "Курс",
    consultation: "Консультация",
    webinar: "Вебинар",
  };
  return type ? map[type] || type : "";
}

function EventCard({ event, compact }: { event: CalendarEvent; compact?: boolean }) {
  const start = new Date(event.startAt);
  const formatLabel = event.format === "offline" ? "Очно" : "Онлайн";

  return (
    <div className={`rounded-[14px] border border-border bg-white p-3 shadow-[0_4px_14px_rgba(59,55,88,0.06)] ${compact ? "text-[13px]" : ""}`}>
      <div className="font-semibold text-primary mb-1">{formatTime(start)}</div>
      {event.eventType && <div className="text-[11px] uppercase tracking-wide text-accent-purple mb-1">{formatType(event.eventType)}</div>}
      <div className="font-medium leading-snug mb-1">{event.title}</div>
      {event.instructor && <div className="text-muted text-xs mb-1">{event.instructor}</div>}
      <div className="inline-flex text-[11px] rounded-full bg-cream-bg px-2 py-0.5 text-primary">{formatLabel}</div>
      {event.description && !compact && <p className="text-xs text-muted mt-2 m-0 line-clamp-2">{event.description}</p>}
      {event.link && (
        <Link href={event.link} className="text-xs text-accent-purple underline mt-2 inline-block">Записаться</Link>
      )}
    </div>
  );
}

export function TimetableCalendar({ compact }: { compact?: boolean }) {
  const [view, setView] = useState<ViewMode>("week");
  const [cursor, setCursor] = useState(() => startOfWeek(new Date()));
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const range = useMemo(() => {
    if (view === "month") {
      const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
      const end = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0, 23, 59, 59);
      return { start, end };
    }
    if (view === "list") {
      const start = new Date();
      const end = addDays(start, 60);
      end.setHours(23, 59, 59);
      return { start, end };
    }
    const start = startOfWeek(cursor);
    const end = addDays(start, 6);
    end.setHours(23, 59, 59);
    return { start, end };
  }, [cursor, view]);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 6000);

    try {
      const res = await fetch(
        `/api/public/events?from=${range.start.toISOString()}&to=${range.end.toISOString()}`,
        { signal: controller.signal },
      );
      if (!res.ok) throw new Error("Failed to load events");
      const data = await res.json();
      setEvents(data.events || []);
    } catch {
      setEvents([]);
    } finally {
      window.clearTimeout(timeoutId);
      setLoading(false);
    }
  }, [range.start, range.end]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(cursor), i)), [cursor]);

  const monthDays = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const start = startOfWeek(first);
    return Array.from({ length: 42 }, (_, i) => addDays(start, i));
  }, [cursor]);

  const headerLabel = useMemo(() => {
    if (view === "month") {
      return `${MONTHS[cursor.getMonth()]} ${cursor.getFullYear()}`;
    }
    const end = addDays(startOfWeek(cursor), 6);
    return `${startOfWeek(cursor).getDate()} – ${end.getDate()} ${MONTHS[end.getMonth()]}. ${end.getFullYear()} г.`;
  }, [cursor, view]);

  function eventsForDay(day: Date) {
    return events.filter((e) => {
      const d = new Date(e.startAt);
      return d.getFullYear() === day.getFullYear() && d.getMonth() === day.getMonth() && d.getDate() === day.getDate();
    });
  }

  function navigate(dir: -1 | 1) {
    if (view === "month") {
      setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + dir, 1));
    } else {
      setCursor(addDays(cursor, dir * 7));
    }
  }

  return (
    <div className={`overflow-hidden bg-gradient-to-br from-[#f0faf9] via-white to-cream-bg ${compact ? "rounded-none border-0" : "rounded-[24px] border border-border shadow-[0_8px_30px_rgba(59,55,88,0.06)]"}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-5 border-b border-border bg-white/80">
        <div className="flex items-center gap-2 flex-wrap">
          <button type="button" className="pill-tab bg-white text-sm py-2" onClick={() => setCursor(startOfWeek(new Date()))}>
            Сегодня
          </button>
          <button type="button" className="w-9 h-9 rounded-lg border border-border bg-white" onClick={() => navigate(-1)}>‹</button>
          <button type="button" className="w-9 h-9 rounded-lg border border-border bg-white" onClick={() => navigate(1)}>›</button>
          <span className="font-medium text-sm md:text-base px-2">{headerLabel}</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["week", "month", "list"] as ViewMode[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`pill-tab text-sm py-2 ${view === v ? "pill-tab-active" : "bg-white"}`}
            >
              {v === "week" ? "Неделя" : v === "month" ? "Месяц" : "Список"}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="p-10 text-center text-muted">Загрузка расписания...</div>
      ) : view === "week" ? (
        <div className="grid grid-cols-1 md:grid-cols-7 divide-y md:divide-y-0 md:divide-x divide-border min-h-[420px]">
          {weekDays.map((day) => {
            const dayEvents = eventsForDay(day);
            const isToday = new Date().toDateString() === day.toDateString();
            return (
              <div key={day.toISOString()} className="p-3 md:p-4 bg-white/60">
                <div className={`text-sm font-medium mb-3 ${isToday ? "text-accent-purple" : "text-primary"}`}>
                  {formatDayHeader(day)}
                </div>
                <div className="space-y-3">
                  {dayEvents.length === 0 ? (
                    <div className="text-xs text-muted/60">Нет событий</div>
                  ) : (
                    dayEvents.map((e) => <EventCard key={e.id} event={e} compact={compact} />)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : view === "month" ? (
        <div className="p-4 bg-white/60">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-center text-xs text-muted uppercase py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((day) => {
              const inMonth = day.getMonth() === cursor.getMonth();
              const dayEvents = eventsForDay(day);
              const isToday = new Date().toDateString() === day.toDateString();
              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-[90px] rounded-xl border p-1.5 ${inMonth ? "border-border bg-white" : "border-transparent bg-transparent opacity-40"}`}
                >
                  <div className={`text-xs mb-1 ${isToday ? "w-6 h-6 rounded-full bg-accent-purple text-white grid place-items-center" : ""}`}>
                    {day.getDate()}
                  </div>
                  {dayEvents.slice(0, 2).map((e) => (
                    <div key={e.id} className="text-[10px] leading-tight bg-cream-bg rounded px-1 py-0.5 mb-0.5 truncate">
                      {formatTime(new Date(e.startAt))} {e.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && <div className="text-[10px] text-muted">+{dayEvents.length - 2}</div>}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 md:p-6 space-y-4 bg-white/60 max-h-[600px] overflow-y-auto">
          {events.length === 0 ? (
            <p className="text-muted text-center py-8">Ближайших событий пока нет.</p>
          ) : (
            events.map((e) => <EventCard key={e.id} event={e} />)
          )}
        </div>
      )}
    </div>
  );
}
