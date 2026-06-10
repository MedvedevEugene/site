"use client";

import { useEffect, useState } from "react";
import { AdminShell, AdminCard, Field, inputClass } from "@/components/admin/AdminShell";
import { IMAGES } from "@/lib/site-data";

const PRESETS = [
  { key: "hero-portrait", label: "Hero — портрет", url: IMAGES.heroPortrait },
  { key: "consult-hero", label: "Консультации — hero", url: IMAGES.consultHero },
  { key: "quiz-team", label: "Квиз — фото команды", url: IMAGES.quizTeam },
  { key: "diploma", label: "Диплом", url: IMAGES.diploma },
];

interface MediaItem {
  id: string;
  key: string;
  label: string;
  url: string;
  alt?: string | null;
}

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [form, setForm] = useState({ key: "", label: "", url: "", alt: "" });

  async function load() {
    const res = await fetch("/api/admin/media");
    const data = await res.json();
    setItems(data.items || []);
  }

  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ key: "", label: "", url: "", alt: "" });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Удалить?")) return;
    await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
    load();
  }

  function usePreset(p: (typeof PRESETS)[number]) {
    setForm({ key: p.key, label: p.label, url: p.url, alt: "" });
  }

  return (
    <AdminShell>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        <AdminCard title="Фото на сайте">
          <p className="text-sm text-muted mb-4">Замените URL картинки — изменения появятся на сайте после сохранения.</p>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="border border-border rounded-[14px] p-4 flex gap-4 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt="" className="w-16 h-16 rounded-lg object-cover bg-light shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-muted truncate">{item.key} · {item.url}</div>
                </div>
                <button type="button" className="btn btn-outline text-xs py-2" onClick={() => remove(item.id)}>Удалить</button>
              </div>
            ))}
          </div>
        </AdminCard>
        <div className="space-y-6">
          <AdminCard title="Добавить / заменить фото">
            <form onSubmit={save}>
              <Field label="Ключ (уникальный)"><input className={inputClass} value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} required placeholder="hero-portrait" /></Field>
              <Field label="Подпись"><input className={inputClass} value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required /></Field>
              <Field label="URL изображения"><input className={inputClass} value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required placeholder="https://..." /></Field>
              <Field label="Alt"><input className={inputClass} value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} /></Field>
              <button type="submit" className="btn btn-primary w-full">Сохранить</button>
            </form>
          </AdminCard>
          <AdminCard title="Быстрые пресеты">
            <div className="flex flex-col gap-2">
              {PRESETS.map((p) => (
                <button key={p.key} type="button" className="btn btn-outline text-left justify-start text-sm" onClick={() => usePreset(p)}>
                  {p.label}
                </button>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>
    </AdminShell>
  );
}
