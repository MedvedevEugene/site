"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToolDisclaimer } from "@/components/tools/ToolDisclaimer";
import { saveToolSession, useAiAnalysis } from "@/components/tools/AiReportView";
import { pairWords } from "@/lib/tool-config";

export function SixteenAssociationsWizard() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState("");
  const [level1, setLevel1] = useState(Array(16).fill(""));
  const [level2, setLevel2] = useState(Array(8).fill(""));
  const [level3, setLevel3] = useState(Array(4).fill(""));
  const [level4, setLevel4] = useState(Array(2).fill(""));
  const [finalWord, setFinalWord] = useState("");
  const { run } = useAiAnalysis();

  const pairs1 = pairWords(level1);
  const pairs2 = pairWords(level2);
  const pairs3 = pairWords(level3);

  function canProceed() {
    switch (step) {
      case 0:
        return query.trim().length >= 2 && query.trim().length <= 120;
      case 1:
        return level1.every((w) => w.trim().length > 0);
      case 2:
        return level2.every((w) => w.trim().length > 0);
      case 3:
        return level3.every((w) => w.trim().length > 0);
      case 4:
        return level4.every((w) => w.trim().length > 0);
      case 5:
        return finalWord.trim().length > 0;
      default:
        return false;
    }
  }

  async function finish() {
    const payload = {
      query: query.trim(),
      level1: level1.map((w) => w.trim()),
      level2: level2.map((w) => w.trim()),
      level3: level3.map((w) => w.trim()),
      level4: level4.map((w) => w.trim()),
      finalWord: finalWord.trim(),
    };
    const id = await saveToolSession("sixteen_associations", payload);
    if (id) {
      router.push(`/16-associations/result/${id}`);
      return;
    }
    run("sixteen_associations", payload, null);
  }

  if (!accepted) return <ToolDisclaimer onAccept={() => setAccepted(true)} />;

  return (
    <div className="tool-card max-w-2xl mx-auto">
      <p className="text-sm text-muted m-0 mb-2">Шаг {step + 1} из 6</p>

      {step === 0 && (
        <>
          <h3 className="font-heading text-xl m-0 mb-4">Ваш запрос</h3>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={120}
            placeholder="деньги, отношения, страх начать своё дело..."
            className="tool-input"
          />
          <p className="text-xs text-muted mt-2 m-0">{query.length}/120 символов</p>
        </>
      )}

      {step === 1 && (
        <>
          <h3 className="font-heading text-xl m-0 mb-4">16 первичных ассоциаций</h3>
          <p className="text-sm text-muted m-0 mb-4">Первые слова, которые приходят в голову. Повторы допустимы.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {level1.map((val, i) => (
              <input
                key={i}
                value={val}
                onChange={(e) => {
                  const next = [...level1];
                  next[i] = e.target.value;
                  setLevel1(next);
                }}
                placeholder={`Ассоциация ${i + 1}`}
                className="tool-input"
              />
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h3 className="font-heading text-xl m-0 mb-4">Объединение в 8 слов</h3>
          <div className="flex flex-col gap-4">
            {pairs1.map(([a, b], i) => (
              <div key={i} className="tool-pair-row">
                <span className="text-sm text-muted shrink-0">{a} + {b}</span>
                <input
                  value={level2[i]}
                  onChange={(e) => {
                    const next = [...level2];
                    next[i] = e.target.value;
                    setLevel2(next);
                  }}
                  placeholder="Объединяющее слово"
                  className="tool-input"
                />
              </div>
            ))}
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h3 className="font-heading text-xl m-0 mb-4">Объединение в 4 слова</h3>
          <div className="flex flex-col gap-4">
            {pairs2.map(([a, b], i) => (
              <div key={i} className="tool-pair-row">
                <span className="text-sm text-muted shrink-0">{a} + {b}</span>
                <input
                  value={level3[i]}
                  onChange={(e) => {
                    const next = [...level3];
                    next[i] = e.target.value;
                    setLevel3(next);
                  }}
                  placeholder="Объединяющее слово"
                  className="tool-input"
                />
              </div>
            ))}
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h3 className="font-heading text-xl m-0 mb-4">Два ключевых направления</h3>
          <div className="flex flex-col gap-4">
            {pairs3.map(([a, b], i) => (
              <div key={i} className="tool-pair-row">
                <span className="text-sm text-muted shrink-0">{a} + {b}</span>
                <input
                  value={level4[i]}
                  onChange={(e) => {
                    const next = [...level4];
                    next[i] = e.target.value;
                    setLevel4(next);
                  }}
                  placeholder="Ключевое направление"
                  className="tool-input"
                />
              </div>
            ))}
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <h3 className="font-heading text-xl m-0 mb-4">Итоговое ключевое слово</h3>
          <p className="text-sm text-muted m-0 mb-4">
            Объедините: <strong>{level4[0]}</strong> и <strong>{level4[1]}</strong>
          </p>
          <input
            value={finalWord}
            onChange={(e) => setFinalWord(e.target.value)}
            placeholder="Одно финальное слово"
            className="tool-input"
          />
        </>
      )}

      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <button type="button" className="btn btn-outline" onClick={() => setStep((s) => s - 1)}>
            Назад
          </button>
        )}
        <button
          type="button"
          className="btn btn-primary"
          disabled={!canProceed()}
          onClick={() => (step === 5 ? finish() : setStep((s) => s + 1))}
        >
          {step === 5 ? "Получить карту и ИИ-разбор" : "Далее →"}
        </button>
      </div>
    </div>
  );
}
