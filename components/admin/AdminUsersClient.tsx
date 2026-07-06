"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminShell, AdminCard } from "@/components/admin/AdminShell";

type UserRow = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  sessionsCount: number;
  createdAt: string;
};

export function AdminUsersClient() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Не удалось загрузить");
        return;
      }
      setUsers(data.users || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function setRole(userId: string, role: "user" | "admin") {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });
    if (res.ok) load();
  }

  return (
    <AdminShell>
      <AdminCard title="Пользователи и роли">
        <p className="text-sm text-muted m-0 mb-6">
          Назначьте роль «admin» нужным email — они смогут входить в{" "}
          <strong>/admin</strong> через тот же аккаунт (без отдельного пароля).
          Также можно указать email в <code>ADMIN_EMAILS</code> в Vercel. После смены роли пользователю нужно
          перелогиниться на <Link href="/account" className="underline">/account</Link>.
        </p>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {loading ? (
          <p className="text-muted animate-pulse">Загрузка…</p>
        ) : users.length === 0 ? (
          <p className="text-muted m-0">
            Пользователей пока нет. Они появятся после входа в ИИ-инструменты или на странице /account.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="py-2 pr-4 font-medium">Email</th>
                  <th className="py-2 pr-4 font-medium">Роль</th>
                  <th className="py-2 pr-4 font-medium">Прохождений</th>
                  <th className="py-2 font-medium">Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border/60">
                    <td className="py-3 pr-4">{u.email}</td>
                    <td className="py-3 pr-4">
                      {u.role === "admin" ? (
                        <span className="text-xs font-semibold bg-[#272344] text-white px-2 py-1 rounded-full">
                          admin
                        </span>
                      ) : (
                        "user"
                      )}
                    </td>
                    <td className="py-3 pr-4">{u.sessionsCount}</td>
                    <td className="py-3">
                      {u.role === "admin" ? (
                        <button
                          type="button"
                          className="text-xs underline text-muted"
                          onClick={() => setRole(u.id, "user")}
                        >
                          Снять admin
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="text-xs underline text-primary"
                          onClick={() => setRole(u.id, "admin")}
                        >
                          Сделать admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </AdminShell>
  );
}
