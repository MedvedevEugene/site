"use client";

import { useEffect, useState } from "react";
import { AdminShell, AdminCard, Field, inputClass, textareaClass } from "@/components/admin/AdminShell";

interface SpecialistItem {
  id: string;
  slug: string;
  name: string;
  role: string;
  photoUrl: string;
  bio?: string | null;
  services: string[];
  sortOrder: number;
  published: boolean;
}

const empty = {
  name: "",
  slug: "",
  role: "",
  photoUrl: "",
  bio: "",
  servicesText: "",
  sortOrder: 0,
  published: true,
};

export default function AdminSpecialistsPage() {
  const [specialists, setSpecialists] = useState<SpecialistItem[]>([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/specialists");
    const data = await res.json();
    setSpecialists(data.specialists || []);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(s: SpecialistItem) {
    setEditId(s.id);
    setForm({
      name: s.name,
      slug: s.slug,
      role: s.role,
      photoUrl: s.photoUrl,
      bio: s.bio || "",
      servicesText: s.services.join("\n"),
      sortOrder: s.sortOrder,
      published: s.published,
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const services = form.servicesText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    await fetch("/api/admin/specialists", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editId,
        name: form.name,
        slug: form.slug,
        role: form.role,
        photoUrl: form.photoUrl,
        bio: form.bio,
        services,
        sortOrder: form.sortOrder,
        published: form.published,
      }),
    });
    setForm(empty);
    setEditId(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Удалить специалиста?")) return;
    await fetch(`/api/admin/specialists?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <AdminShell>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        <AdminCard title="Специалисты ИЖСИЗ">
          <p className="text-sm text-muted mb-4">
            Карточки отображаются на странице{" "}
            <a href="/individual-consultations" className="text-primary underline">/individual-consultations</a> и в блоке консультаций.
          </p>
          <div className="space-y-3">
            {specialists.map((s) => (
              <div key={s.id} className="border border-border rounded-[14px] p-4 flex gap-4 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.photoUrl} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-muted truncate">{s.role}</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button type="button" className="btn btn-outline text-xs py-2" onClick={() => startEdit(s)}>
                    Изменить
                  </button>
                  <button type="button" className="btn btn-outline text-xs py-2" onClick={() => remove(s.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
        <AdminCard title={editId ? "Редактировать" : "Новый специалист"}>
          <form onSubmit={save}>
            <Field label="Имя">
              <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </Field>
            <Field label="Slug (URL)">
              <input className={inputClass} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="asya-bykovskaya" />
            </Field>
            <Field label="Должность / роль">
              <input className={inputClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
            </Field>
            <Field label="URL фото">
              <input className={inputClass} value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} required placeholder="https://..." />
            </Field>
            <Field label="О специалисте">
              <textarea className={textareaClass} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            </Field>
            <Field label="Услуги (каждая с новой строки)">
              <textarea className={textareaClass} value={form.servicesText} onChange={(e) => setForm({ ...form, servicesText: e.target.value })} />
            </Field>
            <Field label="Порядок">
              <input type="number" className={inputClass} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
            </Field>
            <label className="flex items-center gap-2 text-sm mb-4">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              Опубликовано
            </label>
            <button type="submit" className="btn btn-primary w-full">{editId ? "Сохранить" : "Добавить"}</button>
          </form>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
