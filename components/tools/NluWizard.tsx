"use client";

import { useState } from "react";
import { ToolAccessGate } from "@/components/tools/ToolAccessGate";
import { DynamicFields } from "@/components/tools/DynamicFields";
import { AiReportView, saveToolSession, useAiAnalysis } from "@/components/tools/AiReportView";
import { NLU_LEVELS, emptyFields, filledFields } from "@/lib/tool-config";

type LevelState = Record<string, string[]>;

const INITIAL_LEVELS: LevelState = Object.fromEntries(NLU_LEVELS.map((l) => [l.id, emptyFields()]));

export function NluWizard() {
  const [step, setStep] = useState(0);
  const [topic, setTopic] = useState("");
  const [why, setWhy] = useState("");
  const [levels, setLevels] = useState<LevelState>(INITIAL_LEVELS);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const { analysis, loading, run, emailSent, userEmail } = useAiAnalysis();

  const totalSteps = 1 + NLU_LEVELS.length;
  const levelStep = step - 1;

  function updateLevel(id: string, values: string[]) {
    setLevels((prev) => ({ ...prev, [id]: values }));
  }

  function canProceed() {
    if (step === 0) return topic.trim().length > 0;
    if (levelStep >= 0 && levelStep < NLU_LEVELS.length) {
      const level = NLU_LEVELS[levelStep];
      return filledFields(levels[level.id]).length >= 3;
    }
    return false;
  }

  async function finish() {
    const payload = {
      topic: topic.trim(),
      why: why.trim(),
      levels: Object.fromEntries(NLU_LEVELS.map((l) => [l.id, filledFields(levels[l.id])])),
    };
    const id = await saveToolSession("nlu", payload);
    setSessionId(id);
    setDone(true);
    run("nlu", payload, id);
  }

  return (
    <ToolAccessGate>
      {done ? (
        <div className="max-w-2xl mx-auto">
          <div className="tool-card">
            <h3 className="font-heading text-xl m-0 mb-4">Ваша карта НЛУ</h3>
            <p className="text-sm text-muted m-0 mb-6">Тема: <strong>{topic}</strong></p>
            <div className="flex flex-col gap-4">
              {NLU_LEVELS.map((level) => (
                <div key={level.id} className="tool-mini-card">
                  <div className="font-medium text-sm mb-2">{level.title}</div>
                  <ul className="m-0 pl-4 text-sm text-muted space-y-1">
                    {filledFields(levels[level.id]).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <AiReportView text={analysis} loading={loading} emailSent={emailSent} userEmail={userEmail} />
          {sessionId && <p className="text-xs text-muted text-center mt-4">ID сессии: {sessionId}</p>}
        </div>
      ) : (
        <div className="tool-card max-w-2xl mx-auto">
          <p className="text-sm text-muted m-0 mb-2">
            Шаг {step + 1} из {totalSteps}
          </p>

          {step === 0 && (
            <>
              <h3 className="font-heading text-xl m-0 mb-4">Тема исследования</h3>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ваш запрос..."
                className="tool-input mb-4"
              />
              <label className="block text-sm font-medium mb-2">Почему эта тема важна сейчас?</label>
              <textarea
                value={why}
                onChange={(e) => setWhy(e.target.value)}
                rows={3}
                className="tool-input resize-y"
              />
            </>
          )}

          {levelStep >= 0 && levelStep < NLU_LEVELS.length && (
            <>
              {(() => {
                const level = NLU_LEVELS[levelStep];
                return (
                  <>
                    <h3 className="font-heading text-xl m-0 mb-2">{level.title}</h3>
                    <p className="text-sm text-muted m-0 mb-2">{level.question}</p>
                    <p className="text-xs text-muted m-0 mb-4">Подсказки: {level.hints.join(", ")}</p>
                    <DynamicFields
                      values={levels[level.id]}
                      onChange={(v) => updateLevel(level.id, v)}
                      placeholder="Ответ"
                    />
                  </>
                );
              })()}
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
              onClick={() => (step === totalSteps - 1 ? finish() : setStep((s) => s + 1))}
            >
              {step === totalSteps - 1 ? "Получить карту и ИИ-разбор" : "Далее →"}
            </button>
          </div>
        </div>
      )}
    </ToolAccessGate>
  );
}
