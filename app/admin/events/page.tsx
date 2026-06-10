"use client";

import { useEffect, useState } from "react";
import { AdminShell, AdminCard, Field, inputClass, textareaClass } from "@/components/admin/AdminShell";

interface EventItem {
  id: string;
  title: string;
  description?: string | null;
  startAt: string;
  endAt: string;
  instructor?: string | null;
  format: string;
  eventType?: string | null;
  link?: string | null;
  published: boolean;
}

const emptyForm = {
  title: "",
  description: "",
  startAt: "",
  endAt: "",
  instructor: "",
  format: "online",
  eventType: "group",
  link: "",
  published: true,
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/events");
    const data = await res.json();
    setEvents(data.events || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function toLocalInput(iso: string) {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function startEdit(event: EventItem) {
    setEditId(event.id);
    setForm({
      title: event.title,
      description: event.description || "",
      startAt: toLocalInput(event.startAt),
      endAt: toLocalInput(event.endAt),
      instructor: event.instructor || "",
      format: event.format,
      eventType: event.eventType || "group",
      link: event.link || "",
      published: event.published,
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      startAt: new Date(form.startAt).toISOString(),
      endAt: new Date(form.endAt).toISOString(),
      ...(editId ? { id: editId } : {}),
    };
    await fetch("/api/admin/events", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setForm(emptyForm);
    setEditId(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Удалить событие?")) return;
    await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <AdminShell>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        <AdminCard title="События расписания">
          {loading ? (
            <p className="text-muted">Загрузка...</p>
          ) : events.length === 0 ? (
            <p className="text-muted">Пока нет событий. Добавьте первое справа.</p>
          ) : (
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="border border-border rounded-[14px] p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted">
                      {new Date(event.startAt).toLocaleString("ru-RU")} · {event.format === "online" ? "Онлайн" : "Очно"}
                      {event.instructor ? ` · ${event.instructor}` : ""}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button type="button" className="btn btn-outline text-xs py-2" onClick={() => startEdit(event)}>Изменить</button>
                    <button type="button" className="btn btn-outline text-xs py-2" onClick={() => remove(event.id)}>Удалить</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AdminCard>

        <AdminCard title={editId ? "Редактировать" : "Новое событие"}>
          <form onSubmit={save}>
            <Field label="Название">
              <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </Field>
            <Field label="Описание">
              <textarea className={textareaClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </Field>
            <Field label="Начало">
              <input type="datetime-local" className={inputClass} value={form.startAt} onChange={(e) => setForm({ ...form, startAt: e.target.value })} required />
            </Field>
            <Field label="Конец">
              <input type="datetime-local" className={inputClass} value={form.endAt} onChange={(e) => setForm({ ...form, endAt: e.target.value })} required />
            </Field>
            <Field label="Ведущий">
              <input className={inputClass} value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} placeholder="А. Быковская" />
            </Field>
            <Field label="Формат">
              <select className={inputClass} value={form.format} onChange={(e) => setForm({ ...form, format: e.target.value })}>
                <option value="online">Онлайн</option>
                <option value="offline">Очно</option>
              </select>
            </Field>
            <Field label="Тип">
              <select className={inputClass} value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })}>
                <option value="group">Расстановочная группа</option>
                <option value="course">Курс / обучение</option>
                <option value="consultation">Консультация</option>
                <option value="webinar">Вебинар</option>
              </select>
            </Field>
            <Field label="Ссылка на запись">
              <input className={inputClass} value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." />
            </Field>
            <label className="flex items-center gap-2 text-sm mb-4">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              Опубликовано на сайте
            </label>
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary flex-1">{editId ? "Сохранить" : "Добавить"}</button>
              {editId && (
                <button type="button" className="btn btn-outline" onClick={() => { setEditId(null); setForm(emptyForm); }}>Отмена</button>
              )}
            </div>
          </form>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
