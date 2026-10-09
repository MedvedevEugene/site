"use client";
import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { SixteenAssociationsWizard } from "./SixteenAssociationsWizard";
import styles from "./SixteenAssociationsExperience.module.css";
type Session = { id: string; tool: string; createdAt: string; status: string };
export function SixteenAssociationsExperience() {
  const [query, setQuery] = useState("");
  const [started, setStarted] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [historyState, setHistoryState] = useState<
    "loading" | "ready" | "guest" | "error"
  >("loading");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/account/sessions", { signal: controller.signal })
      .then(async (r) => {
        if (r.status === 401) {
          setHistoryState("guest");
          return;
        }
        if (!r.ok) throw new Error("History failed");
        const data = await r.json();
        setSessions(
          (data.sessions || []).filter(
            (s: Session) => s.tool === "sixteen_associations",
          ),
        );
        setHistoryState("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setHistoryState("error");
      });
    return () => controller.abort();
  }, []);
  function start(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.trim().length >= 2) setStarted(true);
  }
  if (started)
    return (
      <>
        <div className={styles.practiceHeader}>
          <Link
            href="/16-associations"
            onClick={(e) => {
              e.preventDefault();
              setStarted(false);
            }}
          >
            ← К началу
          </Link>
          <h1>16 ассоциаций</h1>
        </div>
        <SixteenAssociationsWizard initialQuery={query.trim()} />
      </>
    );
  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
        <Link href="/">Главная</Link> ·{" "}
        <Link href="/psychological-help#online-tools">Онлайн-сервисы</Link> · 16
        ассоциаций
      </nav>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Самостоятельное исследование</p>
          <h1>16 ассоциаций</h1>
          <p>
            Посмотрите на свой запрос через ассоциации. Пройдите путь от 16 слов
            к одному ключевому смыслу и сохраните карту своего исследования.
          </p>
          <div className={styles.links}>
            <a href="#request">Начать исследование ↓</a>
            <a href="#instructions">Как проходить</a>
          </div>
        </div>
        <aside className={styles.route}>
          <p className={styles.eyebrow}>От слов — к смыслу</p>
          <div aria-label="16, 8, 4, 2, 1">
            {[16, 8, 4, 2, 1].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
          <h2>Один запрос — пять шагов</h2>
          <p>
            Запишите первые ассоциации, последовательно объедините их в пары и
            найдите итоговое слово.
          </p>
        </aside>
      </section>
      <section className={styles.start} id="request">
        <form onSubmit={start}>
          <p className={styles.eyebrow}>Ваш запрос</p>
          <h2>С чем вы хотите поработать?</h2>
          <p>Сформулируйте тему одним словом или короткой фразой.</p>
          <label>
            Ваш запрос
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              minLength={2}
              maxLength={120}
              required
              placeholder="Например: деньги, отношения, работа"
            />
          </label>
          <button type="submit" disabled={query.trim().length < 2}>
            Продолжить →
          </button>
        </form>
        <div id="instructions">
          <h2>Как проходить</h2>
          <ol>
            <li>Пишите первые слова, которые приходят в голову.</li>
            <li>Связывайте каждую пару новым словом.</li>
            <li>Не ищите правильный ответ — опирайтесь на свои ассоциации.</li>
          </ol>
          <p>
            Результат помогает исследовать запрос и не заменяет консультацию
            специалиста.
          </p>
        </div>
      </section>
      <section className={styles.history}>
        <h2>Мои исследования</h2>
        {historyState === "loading" ? (
          <p role="status">Загружаем исследования…</p>
        ) : historyState === "guest" ? (
          <p>
            Для доступа к сохранённым исследованиям{" "}
            <Link href="/account">войдите в личный кабинет</Link>.
          </p>
        ) : historyState === "error" ? (
          <p role="alert">
            Не удалось загрузить исследования.{" "}
            <Link href="/account">Открыть личный кабинет →</Link>
          </p>
        ) : sessions.length ? (
          <ul>
            {sessions.map((s) => (
              <li key={s.id}>
                <div>
                  <strong>16 ассоциаций</strong>
                  <span>
                    {new Date(s.createdAt).toLocaleDateString("ru-RU")}
                  </span>
                </div>
                <Link href={`/16-associations/result/${s.id}`}>Открыть →</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Здесь появятся ваши завершённые исследования.</p>
        )}
      </section>
    </div>
  );
}
