"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ToolLogin, type AuthUser } from "@/components/tools/ToolLogin";
import { TOOL_LABELS } from "@/lib/tool-labels";

type SessionRow = {
  id: string;
  tool: string;
  status: string;
  emailSent: boolean;
  createdAt: string;
};

function sessionResultHref(tool: string, id: string) {
  if (tool === "sixteen_associations") return `/16-associations/result/${id}`;
  if (tool === "nlu") return "/nlu";
  if (tool === "insightograph") return "/ptichno-rybko";
  return "/psychological-help";
}

export function AccountSection() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      if (!meData.user) {
        setUser(null);
        setSessions([]);
        return;
      }
      setUser(meData.user);

      const sessRes = await fetch("/api/account/sessions");
      if (sessRes.ok) {
        const sessData = await sessRes.json();
        setSessions(sessData.sessions || []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setSessions([]);
  }

  if (loading) {
    return <div className="tool-card max-w-lg mx-auto text-muted animate-pulse">Загрузка профиля…</div>;
  }

  if (!user) {
    return (
      <ToolLogin
        variant="inline"
        title="Вход в аккаунт"
        description="Войдите по email — здесь будут ваши прохождения инструментов и ссылки на результаты."
        onSuccess={() => load()}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div className="tool-card">
        <h2 className="font-heading text-xl m-0 mb-4">Профиль</h2>
        <p className="m-0 mb-6">
          <span className="text-muted">Email: </span>
          <strong>{user.email}</strong>
        </p>
        {user.role === "admin" && (
          <>
            <p className="m-0 mb-6">
              <span className="text-muted">Роль: </span>
              <span className="inline-block bg-[#272344] text-white text-xs font-semibold px-3 py-1 rounded-full">
                Администратор
              </span>
            </p>
            <div className="flex flex-wrap gap-3 mb-0">
              <Link href="/admin" className="btn btn-primary">
                Админ-панель
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              <Link href="/psychological-help#ai-tools" className="btn btn-outline">
                ИИ-инструменты
              </Link>
              <button type="button" className="btn btn-outline" onClick={logout}>
                Выйти
              </button>
            </div>
          </>
        )}
        {user.role !== "admin" && (
          <div className="flex flex-wrap gap-3">
            <Link href="/psychological-help#ai-tools" className="btn btn-outline">
              ИИ-инструменты
            </Link>
            <button type="button" className="btn btn-outline" onClick={logout}>
              Выйти
            </button>
          </div>
        )}
      </div>

      <div className="tool-card">
        <h3 className="font-heading text-lg m-0 mb-4">Мои прохождения</h3>
        {sessions.length === 0 ? (
          <p className="text-sm text-muted m-0">
            Пока нет сохранённых результатов.{" "}
            <Link href="/nlu" className="text-primary underline">
              Пройти НЛУ
            </Link>
          </p>
        ) : (
          <ul className="m-0 p-0 list-none flex flex-col gap-3">
            {sessions.map((s) => (
              <li key={s.id} className="tool-mini-card flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-medium text-sm">{TOOL_LABELS[s.tool] || s.tool}</div>
                  <div className="text-xs text-muted">
                    {new Date(s.createdAt).toLocaleString("ru-RU")}
                    {s.emailSent ? " · отправлено на email" : ""}
                  </div>
                </div>
                <Link href={sessionResultHref(s.tool, s.id)} className="btn btn-outline text-xs py-2 px-3">
                  Открыть
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
