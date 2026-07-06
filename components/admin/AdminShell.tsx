"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

const NAV_PRIMARY = [
  { href: "/admin", label: "Обзор" },
  { href: "/admin/leads", label: "Заявки" },
  { href: "/admin/events", label: "Расписание" },
  { href: "/admin/specialists", label: "Специалисты" },
  { href: "/admin/media", label: "Фото" },
  { href: "/admin/users", label: "Доступ" },
];

const NAV_SECONDARY = [
  { href: "/admin/tariffs", label: "Тарифы" },
  { href: "/admin/news", label: "Новости" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/account");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f4f3ef]">
      <header className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <div className="font-heading font-medium">Админ-панель ИЖСИЗ</div>
            <div className="text-xs text-white/70">Заявки · расписание · специалисты · доступ по email</div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/account" className="text-sm text-white/80 hover:text-white">
              Профиль
            </Link>
            <button type="button" onClick={logout} className="text-sm bg-white/15 px-3 py-1.5 rounded-lg border-0 text-white">
              Выйти
            </button>
          </div>
        </div>
      </header>
      <nav className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-5 flex gap-1 overflow-x-auto items-stretch">
          {NAV_PRIMARY.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 ${
                pathname === item.href ? "border-primary text-primary font-medium" : "border-transparent text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <span className="w-px bg-border my-2 shrink-0" aria-hidden />
          {NAV_SECONDARY.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 ${
                pathname === item.href
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-5 py-8">{children}</main>
    </div>
  );
}

export function AdminCard({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-[20px] border border-border p-6 shadow-sm">
      {title && <h2 className="font-heading text-lg font-medium m-0 mb-5">{title}</h2>}
      {children}
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium mb-1.5">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full border border-border rounded-[10px] px-4 py-2.5 text-sm outline-none focus:border-primary";

export const textareaClass = `${inputClass} min-h-[100px] resize-y`;
