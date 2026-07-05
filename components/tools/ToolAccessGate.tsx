"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ToolDisclaimer } from "@/components/tools/ToolDisclaimer";

type User = { id: string; email: string; name: string | null };

function ToolLogin({ onSuccess }: { onSuccess: (user: User) => void }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [devHint, setDevHint] = useState("");

  async function requestCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Не удалось отправить код");
        return;
      }
      if (data.devCode) setDevHint(`Код для разработки: ${data.devCode}`);
      setStep("code");
    } catch {
      setError("Ошибка сети. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Неверный код");
        return;
      }
      onSuccess(data.user);
    } catch {
      setError("Ошибка сети. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-[20px] p-8 max-w-md w-full shadow-xl">
        <h2 className="font-body text-xl font-medium m-0 mb-2 text-[#272344]">Вход перед прохождением</h2>
        <p className="text-sm text-muted m-0 mb-5 leading-relaxed">
          Укажите email — отправим код для входа. ИИ-разбор придёт на эту же почту после завершения.
        </p>

        {step === "email" ? (
          <form onSubmit={requestCode} className="flex flex-col gap-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="tool-input"
              autoComplete="email"
            />
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 shrink-0"
                required
              />
              <span className="text-sm text-[#3b3758]">
                Согласен на обработку персональных данных и получение результата на email
              </span>
            </label>
            {error && <p className="text-sm text-red-600 m-0">{error}</p>}
            <button type="submit" className="btn btn-primary w-full" disabled={loading || !consent}>
              {loading ? "Отправляем…" : "Получить код на почту"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="flex flex-col gap-4">
            <p className="text-sm text-muted m-0">Код отправлен на <strong>{email}</strong></p>
            {devHint && <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2 m-0">{devHint}</p>}
            <input
              type="text"
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              required
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="6 цифр"
              className="tool-input text-center tracking-[0.3em] text-lg"
              autoComplete="one-time-code"
            />
            {error && <p className="text-sm text-red-600 m-0">{error}</p>}
            <button type="submit" className="btn btn-primary w-full" disabled={loading || code.length !== 6}>
              {loading ? "Проверяем…" : "Войти"}
            </button>
            <button
              type="button"
              className="btn btn-outline w-full"
              onClick={() => {
                setStep("email");
                setCode("");
                setError("");
                setDevHint("");
              }}
            >
              Другой email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function ToolAccessGate({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "login" | "disclaimer" | "ready">("loading");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setPhase("disclaimer");
        } else {
          setPhase("login");
        }
      })
      .catch(() => setPhase("login"));
  }, []);

  if (phase === "loading") {
    return <div className="tool-card max-w-lg mx-auto text-muted animate-pulse">Проверяем вход…</div>;
  }

  if (phase === "login") {
    return <ToolLogin onSuccess={(u) => { setUser(u); setPhase("disclaimer"); }} />;
  }

  if (phase === "disclaimer") {
    return <ToolDisclaimer onAccept={() => setPhase("ready")} />;
  }

  return (
    <>
      {user && (
        <p className="text-sm text-muted text-center mb-4 m-0">
          Вы вошли как <strong>{user.email}</strong>. Разбор будет отправлен на эту почту.
        </p>
      )}
      {children}
    </>
  );
}

export function useToolUserEmail() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setEmail(d.user?.email || null))
      .catch(() => setEmail(null));
  }, []);
  return email;
}
