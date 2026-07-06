"use client";

import { useState } from "react";

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  role?: "user" | "admin";
};

type ToolLoginProps = {
  onSuccess: (user: AuthUser) => void;
  variant?: "modal" | "inline";
  title?: string;
  description?: string;
};

export function ToolLogin({
  onSuccess,
  variant = "modal",
  title = "Вход",
  description = "Укажите email — отправим код для входа.",
}: ToolLoginProps) {
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

  const card = (
    <div className={variant === "modal" ? "bg-white rounded-[20px] p-8 max-w-md w-full shadow-xl" : "tool-card max-w-md mx-auto"}>
      <h2 className="font-body text-xl font-medium m-0 mb-2 text-[#272344]">{title}</h2>
      <p className="text-sm text-muted m-0 mb-5 leading-relaxed">{description}</p>

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
          <p className="text-sm text-muted m-0">
            Код отправлен на <strong>{email}</strong>
          </p>
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
  );

  if (variant === "modal") {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
        {card}
      </div>
    );
  }

  return card;
}
