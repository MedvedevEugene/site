"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { ToolDisclaimer } from "@/components/tools/ToolDisclaimer";
import { ToolLogin, type AuthUser } from "@/components/tools/ToolLogin";

export function ToolAccessGate({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "login" | "disclaimer" | "ready">("loading");
  const [user, setUser] = useState<AuthUser | null>(null);

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
    return (
      <ToolLogin
        variant="modal"
        title="Вход перед прохождением"
        description="Укажите email — отправим код для входа. ИИ-разбор придёт на эту же почту после завершения."
        onSuccess={(u) => {
          setUser(u);
          setPhase("disclaimer");
        }}
      />
    );
  }

  if (phase === "disclaimer") {
    return <ToolDisclaimer onAccept={() => setPhase("ready")} />;
  }

  return (
    <>
      {user && (
        <p className="text-sm text-muted text-center mb-4 m-0">
          Вы вошли как <strong>{user.email}</strong>.{" "}
          <Link href="/account" className="text-primary underline">
            Профиль
          </Link>
          . Разбор будет отправлен на эту почту.
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
