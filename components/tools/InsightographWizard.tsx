"use client";

import { useMemo, useState } from "react";
import { ToolAccessGate } from "@/components/tools/ToolAccessGate";
import { DynamicFields } from "@/components/tools/DynamicFields";
import { InsightographMap } from "@/components/tools/InsightographMap";
import { AiReportView, saveToolSession, useAiAnalysis } from "@/components/tools/AiReportView";
import { INSIGHTOGRAPH_BLOCKS, emptyFields, filledFields } from "@/lib/tool-config";

type BlockState = Record<string, string[]>;

const INITIAL_BLOCKS: BlockState = Object.fromEntries(
  INSIGHTOGRAPH_BLOCKS.map((b) => [b.id, emptyFields()])
);

export function InsightographWizard() {
  const [step, setStep] = useState(0);
  const [pso, setPso] = useState("");
  const [why, setWhy] = useState("");
  const [blocks, setBlocks] = useState<BlockState>(INITIAL_BLOCKS);
  const [tension, setTension] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const { analysis, loading, run, emailSent, userEmail } = useAiAnalysis();

  const totalSteps = 1 + INSIGHTOGRAPH_BLOCKS.length + 1;
  const blockStep = step - 1;
  const isTensionStep = step === totalSteps - 1;

  const allFormulations = useMemo(() => {
    const list: string[] = [];
    INSIGHTOGRAPH_BLOCKS.forEach((block) => {
      filledFields(blocks[block.id] || []).forEach((item) => {
        list.push(`${block.title}: ${item}`);
      });
    });
    return list;
  }, [blocks]);

  function updateBlock(id: string, values: string[]) {
    setBlocks((prev) => ({ ...prev, [id]: values }));
  }

  function canProceed() {
    if (step === 0) return pso.trim().length > 0;
    if (blockStep >= 0 && blockStep < INSIGHTOGRAPH_BLOCKS.length) {
      const block = INSIGHTOGRAPH_BLOCKS[blockStep];
      return filledFields(blocks[block.id]).length >= 3;
    }
    if (isTensionStep) return tension.length >= 1 && tension.length <= 5;
    return false;
  }

  async function finish() {
    const payload = {
      pso: pso.trim(),
      why: why.trim(),
      blocks: Object.fromEntries(
        INSIGHTOGRAPH_BLOCKS.map((b) => [b.id, filledFields(blocks[b.id])])
      ),
      tension,
    };
    const id = await saveToolSession("insightograph", payload);
    setSessionId(id);
    setDone(true);
    run("insightograph", payload, id);
  }

  function handleNext() {
    if (!canProceed()) return;
    if (isTensionStep) {
      finish();
      return;
    }
    setStep((s) => s + 1);
  }

  function toggleTension(item: string) {
    setTension((prev) => {
      if (prev.includes(item)) return prev.filter((x) => x !== item);
      if (prev.length >= 5) return prev;
      return [...prev, item];
    });
  }

  return (
    <ToolAccessGate>
      {done ? (
        <div className="max-w-3xl mx-auto">
          <div className="tool-card">
            <h3 className="font-heading text-xl m-0 mb-2">Ваша карта убеждений</h3>
            <p className="text-sm text-muted m-0 mb-6">П/С/О: <strong>{pso}</strong></p>
            <InsightographMap pso={pso} blocks={blocks} />
            {tension.length > 0 && (
              <div className="mt-6 p-4 bg-[#f9f8e8] rounded-[12px]">
                <div className="text-sm font-medium mb-2">Зоны напряжения</div>
                <ul className="m-0 pl-4 text-sm space-y-1">
                  {tension.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <AiReportView text={analysis} loading={loading} emailSent={emailSent} userEmail={userEmail} />
          {sessionId && (
            <p className="text-xs text-muted text-center mt-4">
              ID сессии: {sessionId}
            </p>
          )}
        </div>
      ) : (
        <div className="tool-card max-w-2xl mx-auto">
          <p className="text-sm text-muted m-0 mb-2">
            Шаг {step + 1} из {totalSteps}
          </p>

          {step === 0 && (
            <>
              <h3 className="font-heading text-xl m-0 mb-2">Ввод темы</h3>
              <p className="text-sm text-muted m-0 mb-4">
                Выберите исследуемое понятие, состояние или обстоятельство (П/С/О)
              </p>
              <input
                value={pso}
                onChange={(e) => setPso(e.target.value)}
                placeholder="деньги, любовь, успех, безопасность..."
                className="tool-input mb-4"
              />
              <label className="block text-sm font-medium mb-2">Почему именно эту тему вы хотите исследовать сейчас?</label>
              <textarea
                value={why}
                onChange={(e) => setWhy(e.target.value)}
                rows={3}
                className="tool-input resize-y"
                placeholder="Ваш ответ..."
              />
            </>
          )}

          {blockStep >= 0 && blockStep < INSIGHTOGRAPH_BLOCKS.length && (
            <>
              {(() => {
                const block = INSIGHTOGRAPH_BLOCKS[blockStep];
                return (
                  <>
                    <h3 className="font-heading text-xl m-0 mb-2">Блок «{block.title}»</h3>
                    <p className="text-sm text-[#774bd9] m-0 mb-2">{block.formula}</p>
                    <p className="text-xs text-muted m-0 mb-4">Подсказки: {block.hints.join(", ")}</p>
                    <DynamicFields
                      values={blocks[block.id]}
                      onChange={(v) => updateBlock(block.id, v)}
                      placeholder="Ответ"
                    />
                  </>
                );
              })()}
            </>
          )}

          {isTensionStep && (
            <>
              <h3 className="font-heading text-xl m-0 mb-2">Маркировка напряжения</h3>
              <p className="text-sm text-muted m-0 mb-4">
                Выберите от 1 до 5 формулировок, которые вызывают наибольший внутренний резонанс
              </p>
              <div className="flex flex-col gap-2">
                {allFormulations.map((item) => (
                  <label key={item} className="tool-check-row">
                    <input
                      type="checkbox"
                      checked={tension.includes(item)}
                      onChange={() => toggleTension(item)}
                    />
                    <span className="text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button type="button" className="btn btn-outline" onClick={() => setStep((s) => s - 1)}>
                Назад
              </button>
            )}
            <button type="button" className="btn btn-primary" disabled={!canProceed()} onClick={handleNext}>
              {isTensionStep ? "Получить карту и ИИ-разбор" : "Далее →"}
            </button>
          </div>
        </div>
      )}
    </ToolAccessGate>
  );
}
