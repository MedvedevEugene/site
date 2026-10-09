"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AssociationsTree } from "@/components/tools/AssociationsTree";
import {
  AiReportView,
  saveToolSession,
  useAiAnalysis,
} from "@/components/tools/AiReportView";
import { ToolAccessGate } from "@/components/tools/ToolAccessGate";
import styles from "./SixteenAssociationsWizard.module.css";
import { pairWords } from "@/lib/tool-config";

export function SixteenAssociationsWizard({
  initialQuery = "",
}: { initialQuery?: string } = {}) {
  const router = useRouter();
  const finishingRef = useRef(false);
  const [finishing, setFinishing] = useState(false);
  const [step, setStep] = useState(initialQuery ? 1 : 0);
  const [query, setQuery] = useState(initialQuery);
  const [level1, setLevel1] = useState(Array(16).fill(""));
  const [level2, setLevel2] = useState(Array(8).fill(""));
  const [level3, setLevel3] = useState(Array(4).fill(""));
  const [level4, setLevel4] = useState(Array(2).fill(""));
  const [finalWord, setFinalWord] = useState("");
  const [done, setDone] = useState(false);
  const { analysis, loading, run, emailSent, userEmail } = useAiAnalysis();

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
    if (finishingRef.current || !canProceed()) return;
    finishingRef.current = true;
    setFinishing(true);
    const payload = {
      query: query.trim(),
      level1: level1.map((w) => w.trim()),
      level2: level2.map((w) => w.trim()),
      level3: level3.map((w) => w.trim()),
      level4: level4.map((w) => w.trim()),
      finalWord: finalWord.trim(),
    };
    let id: string | null = null;
    try {
      id = await saveToolSession("sixteen_associations", payload);
    } catch {
      /* Keep the completed map available when the network fails. */
    }
    if (id) {
      router.push(`/16-associations/result/${id}`);
      return;
    }
    setFinishing(false);
    finishingRef.current = false;
    setDone(true);
    run("sixteen_associations", payload, null);
  }

  return (
    <ToolAccessGate>
      {done ? (
        <div className="max-w-4xl mx-auto">
          <div className="tool-card">
            <h3 className="font-heading text-xl m-0 mb-2">
              Ваша карта ассоциаций
            </h3>
            <p className="text-sm text-muted m-0 mb-6">
              Запрос: <strong>{query.trim()}</strong> → Ключ:{" "}
              <strong>{finalWord.trim()}</strong>
            </p>
            <AssociationsTree
              columns={[
                { title: "16 ассоциаций", words: level1.map((w) => w.trim()) },
                { title: "8 слов", words: level2.map((w) => w.trim()) },
                { title: "4 слова", words: level3.map((w) => w.trim()) },
                { title: "2 направления", words: level4.map((w) => w.trim()) },
                { title: "Ключ", words: [finalWord.trim()] },
              ]}
            />
            <p className="text-xs text-muted m-0 mt-4">
              Не удалось сохранить сессию — разбор показан здесь. Для постоянной
              ссылки пройдите тест снова позже.
            </p>
          </div>
          <AiReportView
            text={analysis}
            loading={loading}
            emailSent={emailSent}
            userEmail={userEmail}
          />
        </div>
      ) : (
        <div className={styles.workspace}>
          <ol className={styles.progress} aria-label="Этапы исследования">
            {["16 слов", "8 слов", "4 слова", "2 слова", "Ключ"].map(
              (label, i) => (
                <li
                  key={label}
                  className={i < step ? styles.active : ""}
                  aria-current={i === step - 1 ? "step" : undefined}
                >
                  {i + 1}. {label}
                </li>
              ),
            )}
          </ol>
          <div className={styles.card}>
            {step > 0 && (
              <p className={styles.query}>
                Ваш запрос: <strong>{query}</strong> · Шаг {step} из 5
              </p>
            )}

            {step === 0 && (
              <>
                <h3 className="font-heading text-xl m-0 mb-4">
                  С чем вы хотите поработать?
                </h3>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  maxLength={120}
                  placeholder="деньги, отношения, страх начать своё дело..."
                  className="tool-input"
                />
                <p className="text-xs text-muted mt-2 m-0">
                  {query.length}/120 символов
                </p>
              </>
            )}

            {step === 1 && (
              <>
                <h3 className="font-heading text-xl m-0 mb-4">
                  16 первичных ассоциаций
                </h3>
                <p className="text-sm text-muted m-0 mb-4">
                  Первые слова, которые приходят в голову. Повторы допустимы.
                </p>
                <div className={styles.words}>
                  {level1.map((val, i) => (
                    <label key={i} className={styles.word}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <input
                        aria-label={`Ассоциация ${i + 1}`}
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
                    </label>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="font-heading text-xl m-0 mb-4">
                  Объединение 16 слов в 8
                </h3>
                <div className={styles.pairs}>
                  {pairs1.map(([a, b], i) => (
                    <div key={i} className={styles.pair}>
                      <span className="text-sm text-muted shrink-0">
                        {a} + {b}
                      </span>
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
                <h3 className="font-heading text-xl m-0 mb-4">
                  Объединение 8 слов в 4
                </h3>
                <div className={styles.pairs}>
                  {pairs2.map(([a, b], i) => (
                    <div key={i} className={styles.pair}>
                      <span className="text-sm text-muted shrink-0">
                        {a} + {b}
                      </span>
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
                <h3 className="font-heading text-xl m-0 mb-4">
                  Объединение 4 слов в 2
                </h3>
                <div className={styles.pairs}>
                  {pairs3.map(([a, b], i) => (
                    <div key={i} className={styles.pair}>
                      <span className="text-sm text-muted shrink-0">
                        {a} + {b}
                      </span>
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
              <div className={styles.final}>
                <h3 className="font-heading text-xl m-0 mb-4">
                  Остался последний шаг
                </h3>
                <p className="text-sm text-muted m-0 mb-4">
                  Объедините: <strong>{level4[0]}</strong> и{" "}
                  <strong>{level4[1]}</strong>
                </p>
                <input
                  value={finalWord}
                  onChange={(e) => setFinalWord(e.target.value)}
                  placeholder="Одно финальное слово"
                  className="tool-input"
                />
              </div>
            )}

            <div className={styles.actions}>
              {step > 0 && (
                <button
                  type="button"
                  className="btn btn-outline"
                  disabled={finishing}
                  onClick={() => setStep((s) => s - 1)}
                >
                  Назад
                </button>
              )}
              <button
                type="button"
                className="btn btn-primary"
                disabled={finishing || !canProceed()}
                onClick={() => (step === 5 ? finish() : setStep((s) => s + 1))}
              >
                {finishing
                  ? "Сохраняем…"
                  : step === 5
                    ? "Получить карту и ИИ-разбор"
                    : "Далее →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ToolAccessGate>
  );
}
