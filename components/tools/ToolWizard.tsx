"use client";

import { useState } from "react";
import Link from "next/link";

interface ToolWizardProps {
  toolName: string;
  steps: string[];
}

export function ToolWizard({ toolName, steps }: ToolWizardProps) {
  const [step, setStep] = useState(0);
  const [topic, setTopic] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [showAiOffer, setShowAiOffer] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const currentAnswer = answers[step] || "";

  function handleNext() {
    if (step === 0 && !topic.trim()) return;
    if (step > 0 && step <= steps.length && !currentAnswer.trim()) return;

    if (step < steps.length) {
      setStep(step + 1);
      return;
    }

    const summary = [
      `Инструмент: ${toolName}`,
      `Тема: ${topic}`,
      ...steps.map((q, i) => `${q}: ${answers[i + 1] || "—"}`),
    ].join("\n");

    setResult(
      `Базовый результат по теме «${topic}»:\n\nВы исследовали ключевые аспекты запроса. Обратите внимание на повторяющиеся паттерны в ваших ответах — они часто указывают на скрытые связи.\n\n${summary.slice(0, 300)}...`
    );
    setShowAiOffer(true);
  }

  async function requestAiAnalysis() {
    setLoading(true);
    try {
      const res = await fetch("/api/ai-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolName, topic, answers, steps }),
      });
      const data = await res.json();
      setAiResult(data.analysis || "Расширенный разбор будет доступен после подключения оплаты и ИИ.");
    } catch {
      setAiResult("Расширенный разбор будет доступен после подключения оплаты и ИИ.");
    } finally {
      setLoading(false);
    }
  }

  if (result && !aiResult) {
    return (
      <div className="card max-w-2xl mx-auto">
        <h3 className="font-heading text-xl m-0 mb-4">Ваш результат</h3>
        <pre className="whitespace-pre-wrap text-sm text-muted bg-cream-bg p-5 rounded-[10px] mb-6 font-body">{result}</pre>
        {showAiOffer && (
          <div className="bg-cream-bg p-6 rounded-[12px] border border-border">
            <strong className="block mb-2">Хотите получить расширенный разбор с помощью ИИ?</strong>
            <p className="text-sm text-muted m-0 mb-4">
              После небольшой оплаты мы сформируем структурированный текстовый разбор вашего запроса.
            </p>
            <button type="button" className="btn btn-primary" disabled={loading} onClick={requestAiAnalysis}>
              {loading ? "Генерация..." : "Получить ИИ-разбор — 290 ₽"}
            </button>
          </div>
        )}
        <Link href="/individual-consultations" className="btn btn-outline mt-4 inline-flex">Записаться на консультацию</Link>
      </div>
    );
  }

  if (aiResult) {
    return (
      <div className="card max-w-2xl mx-auto">
        <h3 className="font-heading text-xl m-0 mb-4">ИИ-разбор</h3>
        <pre className="whitespace-pre-wrap text-sm leading-relaxed m-0 mb-6">{aiResult}</pre>
        <Link href="/individual-consultations" className="btn btn-primary">Записаться на консультацию</Link>
      </div>
    );
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <p className="text-sm text-muted m-0 mb-2">
        Шаг {step + 1} из {steps.length + 1}
      </p>
      <h3 className="font-heading text-xl m-0 mb-6">
        {step === 0 ? "Введите тему для исследования" : steps[step - 1]}
      </h3>
      {step === 0 ? (
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Например: отношения, деньги, самоценность..."
          className="w-full border border-border rounded-[10px] px-4 py-3.5 text-base mb-6"
        />
      ) : (
        <textarea
          value={currentAnswer}
          onChange={(e) => {
            const next = [...answers];
            next[step] = e.target.value;
            setAnswers(next);
          }}
          rows={4}
          placeholder="Ваш ответ..."
          className="w-full border border-border rounded-[10px] px-4 py-3.5 text-base mb-6 resize-y"
        />
      )}
      <button type="button" className="btn btn-primary" onClick={handleNext}>
        {step < steps.length ? "Далее →" : "Получить результат"}
      </button>
    </div>
  );
}
