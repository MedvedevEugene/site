"use client";

import { useEffect, useState } from "react";
import { AdminShell, AdminCard, Field, inputClass, textareaClass } from "@/components/admin/AdminShell";

interface TariffItem {
  id: string;
  title: string;
  description?: string | null;
  price?: string | null;
  priceNote?: string | null;
  ctaText: string;
  ctaLink?: string | null;
  iconUrl?: string | null;
  group: string;
  sortOrder: number;
  published: boolean;
  outline: boolean;
}

const empty = {
  title: "", description: "", price: "", priceNote: "", ctaText: "Записаться", ctaLink: "",
  iconUrl: "", group: "consultations", sortOrder: 0, published: true, outline: false,
};

export default function AdminTariffsPage() {
  const [tariffs, setTariffs] = useState<TariffItem[]>([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/tariffs");
    const data = await res.json();
    setTariffs(data.tariffs || []);
  }

  useEffect(() => { load(); }, []);

  function startEdit(t: TariffItem) {
    setEditId(t.id);
    setForm({
      title: t.title, description: t.description || "", price: t.price || "", priceNote: t.priceNote || "",
      ctaText: t.ctaText, ctaLink: t.ctaLink || "", iconUrl: t.iconUrl || "", group: t.group,
      sortOrder: t.sortOrder, published: t.published, outline: t.outline,
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/tariffs", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: editId }),
    });
    setForm(empty);
    setEditId(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Удалить тариф?")) return;
    await fetch(`/api/admin/tariffs?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <AdminShell>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        <AdminCard title="Тарифы и услуги">
          <div className="space-y-3">
            {tariffs.map((t) => (
              <div key={t.id} className="border border-border rounded-[14px] p-4 flex justify-between gap-3">
                <div>
                  <div className="font-medium">{t.title}</div>
                  <div className="text-sm text-muted">{t.group} · {t.price || "без цены"}</div>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn btn-outline text-xs py-2" onClick={() => startEdit(t)}>Изменить</button>
                  <button type="button" className="btn btn-outline text-xs py-2" onClick={() => remove(t.id)}>Удалить</button>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
        <AdminCard title={editId ? "Редактировать" : "Новый тариф"}>
          <form onSubmit={save}>
            <Field label="Название"><input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></Field>
            <Field label="Описание"><textarea className={textareaClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
            <Field label="Цена"><input className={inputClass} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="от 3 000 ₽" /></Field>
            <Field label="Примечание к цене"><input className={inputClass} value={form.priceNote} onChange={(e) => setForm({ ...form, priceNote: e.target.value })} /></Field>
            <Field label="Группа (страница)">
              <select className={inputClass} value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })}>
                <option value="consultations">Консультации</option>
                <option value="base">Базовый курс</option>
                <option value="business">Бизнес-курс</option>
              </select>
            </Field>
            <Field label="Текст кнопки"><input className={inputClass} value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} /></Field>
            <Field label="Ссылка кнопки"><input className={inputClass} value={form.ctaLink} onChange={(e) => setForm({ ...form, ctaLink: e.target.value })} /></Field>
            <Field label="URL иконки"><input className={inputClass} value={form.iconUrl} onChange={(e) => setForm({ ...form, iconUrl: e.target.value })} /></Field>
            <Field label="Порядок"><input type="number" className={inputClass} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} /></Field>
            <label className="flex items-center gap-2 text-sm mb-2"><input type="checkbox" checked={form.outline} onChange={(e) => setForm({ ...form, outline: e.target.checked })} />Кнопка outline</label>
            <label className="flex items-center gap-2 text-sm mb-4"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />Опубликовано</label>
            <button type="submit" className="btn btn-primary w-full">{editId ? "Сохранить" : "Добавить"}</button>
          </form>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
