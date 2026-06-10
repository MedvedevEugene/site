"use client";

import { useEffect, useState } from "react";
import { AdminShell, AdminCard, Field, inputClass, textareaClass } from "@/components/admin/AdminShell";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  imageUrl?: string | null;
  published: boolean;
  publishedAt: string;
}

const empty = { title: "", slug: "", excerpt: "", content: "", imageUrl: "", published: true, publishedAt: "" };

export default function AdminNewsPage() {
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/news");
    const data = await res.json();
    setPosts(data.posts || []);
  }

  useEffect(() => { load(); }, []);

  function startEdit(post: NewsItem) {
    setEditId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      imageUrl: post.imageUrl || "",
      published: post.published,
      publishedAt: post.publishedAt.slice(0, 10),
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/news", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: editId, publishedAt: form.publishedAt || new Date().toISOString() }),
    });
    setForm(empty);
    setEditId(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Удалить статью?")) return;
    await fetch(`/api/admin/news?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <AdminShell>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        <AdminCard title="Новости и статьи">
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="border border-border rounded-[14px] p-4 flex justify-between gap-3">
                <div>
                  <div className="font-medium">{post.title}</div>
                  <div className="text-sm text-muted">{new Date(post.publishedAt).toLocaleDateString("ru-RU")} · /blog</div>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn btn-outline text-xs py-2" onClick={() => startEdit(post)}>Изменить</button>
                  <button type="button" className="btn btn-outline text-xs py-2" onClick={() => remove(post.id)}>Удалить</button>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
        <AdminCard title={editId ? "Редактировать" : "Новая статья"}>
          <form onSubmit={save}>
            <Field label="Заголовок"><input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></Field>
            <Field label="URL (slug)"><input className={inputClass} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-from-title" /></Field>
            <Field label="Краткое описание"><textarea className={textareaClass} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} /></Field>
            <Field label="Текст"><textarea className={textareaClass} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} /></Field>
            <Field label="URL обложки"><input className={inputClass} value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." /></Field>
            <Field label="Дата"><input type="date" className={inputClass} value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} /></Field>
            <label className="flex items-center gap-2 text-sm mb-4"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />Опубликовано</label>
            <button type="submit" className="btn btn-primary w-full">{editId ? "Сохранить" : "Добавить"}</button>
          </form>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
