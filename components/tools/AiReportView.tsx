"use client";

import { useState } from "react";
import Link from "next/link";

export function AiReportView({
  text,
  loading,
  emailSent,
  userEmail,
}: {
  text: string | null;
  loading: boolean;
  emailSent?: boolean;
  userEmail?: string | null;
}) {
  if (loading) {
    return (
      <div className="tool-card mt-8">
        <p className="m-0 text-muted animate-pulse">Формируем ИИ-разбор по методологии ИЖСИЗ…</p>
      </div>
    );
  }

  if (!text) return null;

  const sections = text.split(/(?=^## )/m).filter(Boolean);

  return (
    <div className="tool-card mt-8">
      <h3 className="font-heading text-xl m-0 mb-4">ИИ-разбор</h3>
      <p className="text-xs text-muted m-0 mb-6">
        Алгоритмический инструмент. Не является консультацией специалиста.
      </p>
      <div className="flex flex-col gap-5">
        {sections.map((section) => {
          const lines = section.trim().split("\n");
          const title = lines[0]?.replace(/^##\s*/, "");
          const body = lines.slice(1).join("\n").trim();
          return (
            <div key={title}>
              {title && <h4 className="font-body text-base font-medium m-0 mb-2 text-[#3b3758]">{title}</h4>}
              <p className="m-0 text-sm leading-relaxed text-[#3b3758] whitespace-pre-wrap">{body}</p>
            </div>
          );
        })}
      </div>
      {emailSent && userEmail && (
        <p className="text-sm text-green-700 bg-green-50 rounded-lg px-4 py-3 mt-4 m-0">
          Разбор также отправлен на <strong>{userEmail}</strong>
        </p>
      )}
      <Link href="/individual-consultations" className="btn btn-primary mt-6 inline-flex">
        Записаться на консультацию
      </Link>
    </div>
  );
}

export async function saveToolSession(tool: string, payload: Record<string, unknown>) {
  const res = await fetch("/api/tool-sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tool, payload }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.id as string;
}

export function useAiAnalysis() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  async function run(tool: string, payload: Record<string, unknown>, sessionId?: string | null) {
    setLoading(true);
    setEmailSent(false);
    setUserEmail(null);
    try {
      const res = await fetch("/api/ai-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool, payload, sessionId }),
      });
      const data = await res.json();
      setAnalysis(data.analysis || "Не удалось сформировать разбор.");
      setEmailSent(!!data.emailSent);
      setUserEmail(data.userEmail || null);
    } catch {
      setAnalysis("Не удалось сформировать разбор. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  }

  return { analysis, loading, run, setAnalysis, emailSent, userEmail };
}
