"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AssociationsTree } from "@/components/tools/AssociationsTree";
import { AiReportView, useAiAnalysis } from "@/components/tools/AiReportView";

type Payload = {
  query: string;
  level1: string[];
  level2: string[];
  level3: string[];
  level4: string[];
  finalWord: string;
};

function markDuplicates(words: string[]) {
  const counts = new Map<string, number>();
  words.forEach((w) => {
    const key = w.toLowerCase();
    if (key) counts.set(key, (counts.get(key) || 0) + 1);
  });
  return words.map((w) => ((counts.get(w.toLowerCase()) || 0) > 1 ? `${w} (повтор)` : w));
}

export function AssociationResultView({ sessionId }: { sessionId: string }) {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [error, setError] = useState(false);
  const [cachedReport, setCachedReport] = useState<string | null>(null);
  const { analysis, loading, run, emailSent, userEmail } = useAiAnalysis();

  useEffect(() => {
    fetch(`/api/tool-sessions?id=${sessionId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((session) => {
        setPayload(session.payload as Payload);
        if (session.aiReport) setCachedReport(session.aiReport);
        else run("sixteen_associations", session.payload, sessionId);
      })
      .catch(() => setError(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (error) {
    return (
      <div className="tool-card max-w-lg mx-auto text-center">
        <p className="m-0 mb-4">Сессия не найдена или ссылка устарела.</p>
        <Link href="/16-associations" className="btn btn-primary">
          Пройти заново
        </Link>
      </div>
    );
  }

  if (!payload) {
    return <div className="tool-card max-w-lg mx-auto animate-pulse text-muted">Загрузка…</div>;
  }

  const columns = [
    { title: "16 ассоциаций", words: markDuplicates(payload.level1) },
    { title: "8 слов", words: payload.level2 },
    { title: "4 слова", words: payload.level3 },
    { title: "2 направления", words: payload.level4 },
    { title: "Ключ", words: [payload.finalWord] },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="tool-card">
        <h1 className="font-heading text-2xl font-medium m-0 mb-2">16 ассоциаций — результат</h1>
        <p className="text-sm text-muted m-0 mb-6">
          Запрос: <strong>{payload.query}</strong> → Ключ: <strong>{payload.finalWord}</strong>
        </p>
        <AssociationsTree columns={columns} />
      </div>
      <AiReportView
        text={cachedReport || analysis}
        loading={loading && !cachedReport}
        emailSent={emailSent}
        userEmail={userEmail}
      />
      <div className="text-center mt-6">
        <Link href="/16-associations" className="btn btn-outline">
          Пройти снова
        </Link>
      </div>
    </div>
  );
}
