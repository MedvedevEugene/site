"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AdminCard, Field, inputClass } from "@/components/admin/AdminShell";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Неверный пароль");
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-cream-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AdminCard title="Вход в админ-панель">
          <p className="text-sm text-muted m-0 mb-5">
            Управление расписанием, новостями, тарифами и фото на сайте.
            Или{" "}
            <Link href="/account" className="text-primary underline">
              войдите по email
            </Link>
            , если у вашего аккаунта есть роль admin.
          </p>
          <form onSubmit={handleSubmit}>
            <Field label="Пароль">
              <input
                type="password"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
            </Field>
            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading ? "Вход..." : "Войти"}
            </button>
          </form>
        </AdminCard>
      </div>
    </div>
  );
}
