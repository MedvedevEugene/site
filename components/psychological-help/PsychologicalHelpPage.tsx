"use client";
import { useRef, useState } from "react";
import { SpecialistCard } from "@/components/specialists/SpecialistCard";
import Link from "next/link";
import Image from "next/image";
import { useCallbackPopup } from "@/components/layout/CallbackPopupContext";
import type { SpecialistCarouselItem } from "@/lib/specialists-display";
import type { CalendarEvent } from "@/components/calendar/TimetableCalendar";
import styles from "./PsychologicalHelpPage.module.css";

const formats = [
  {
    title: "Индивидуальные консультации",
    tag: "Разговор и поддержка",
    description:
      "Работа один на один со специалистом, когда важно разобраться в переживаниях, отношениях, решениях или сложном жизненном периоде.",
    fit: "Вам важно лучше понять происходящее, найти опору и определить, что можно изменить в текущей ситуации.",
    button: "Подробнее о консультациях",
    href: "/individual-consultations",
  },
  {
    title: "Индивидуальные расстановки",
    tag: "Системный взгляд",
    description:
      "Индивидуальный формат системной работы, который помогает исследовать отношения, роли и связи, влияющие на восприятие текущей ситуации.",
    fit: "Привычный анализ не помогает продвинуться дальше и хочется посмотреть на ситуацию с системной точки зрения.",
    button: "Подробнее о расстановках",
    href: "/individual-consultations#methods",
  },
  {
    title: "Расстановочные группы",
    tag: "Групповая работа",
    description:
      "Групповой формат системной работы. Можно исследовать собственный запрос или участвовать в процессах других участников.",
    fit: "Вам интересна живая групповая работа и возможность посмотреть на свой запрос через взаимодействие и новый опыт.",
    button: "Подробнее о группах",
    href: "/rasstanovochnye-gruppy",
  },
  {
    title: "Телесно-ориентированная терапия",
    tag: "Контакт с телом",
    description:
      "Работа с телесными реакциями, напряжением и чувствами, которым трудно подобрать слова.",
    fit: "Стресс и переживания заметно проявляются в теле, сложно расслабиться, почувствовать свои границы или восстановить контакт с собой.",
    button: "Подробнее о телесной терапии",
    href: "/telese-terapiya",
  },
];
const topics = [
  ["Отношения", "otnosheniya"],
  ["Семья", "semya"],
  ["Тревога и стресс", "trevoga"],
  ["Самооценка", "granicy"],
  ["Личные границы", "granicy"],
  ["Деньги", "dengi"],
  ["Карьера", "karera"],
  ["Жизненные кризисы", "trevoga"],
  ["Повторяющиеся сценарии", "semya"],
  ["Бизнес", "biznes"],
];
const tools = [
  {
    title: "16 ассоциаций",
    text: "Исследуйте ассоциации вокруг важной темы и посмотрите, какие новые смысловые связи возникают в процессе.",
    href: "/16-associations",
    icon: "/images/features/community.png",
  },
  {
    title: "Пирамида НЛУ",
    text: "Посмотрите на запрос через несколько уровней: ситуацию, действия, убеждения, ценности и более широкий контекст.",
    href: "/nlu",
    icon: "/images/features/life.png",
  },
  {
    title: "Инсайтограф",
    text: "Разложите сложную ситуацию на составляющие, зафиксируйте важные наблюдения и посмотрите на связи между ними.",
    href: "/ptichno-rybko",
    icon: "/images/features/atom.png",
  },
];
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
export function PsychologicalHelpPage({
  specialists,
  events,
  heroImage,
}: {
  specialists: SpecialistCarouselItem[];
  events: CalendarEvent[];
  heroImage: string;
}) {
  const { openCallbackPopup } = useCallbackPopup();
  const track = useRef<HTMLDivElement>(null);
  const [allSpecialists, setAllSpecialists] = useState(false);
  const scroll = (direction: number) => {
    const element = track.current;
    const card = element?.firstElementChild as HTMLElement | null;
    if (element && card)
      element.scrollBy({
        left: direction * (card.offsetWidth + 40),
        behavior: "smooth",
      });
  };
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Психологическая помощь</p>
            <h1>Найдите формат, который подходит именно вам</h1>
          </div>
          <div className={styles.heroImage}>
            <Image
              src={heroImage}
              alt="Спокойная обстановка для психологической работы"
              fill
              sizes="(max-width: 767px) 100vw, 434px"
              priority
            />
          </div>
          <div className={styles.heroDescription}>
            <p>
              Индивидуальные и групповые форматы работы — от психологической
              консультации до системных расстановок и телесно-ориентированной
              терапии.
            </p>
            <button
              type="button"
              className={styles.primary}
              onClick={() => openCallbackPopup()}
            >
              Подобрать формат
            </button>
          </div>
        </div>
      </section>
      <section className={styles.cream} aria-labelledby="help-topics">
        <div className={styles.inner}>
          <div className={styles.splitHeading}>
            <h2 id="help-topics">
              С какими запросами
              <br />
              мы работаем
            </h2>
            <p>
              Не обязательно заранее точно формулировать проблему. Иногда
              достаточно понимать, что происходящее беспокоит, повторяется или
              привычные способы справляться больше не помогают.
            </p>
          </div>
          <ul className={styles.topics}>
            {topics.map(([title, icon]) => (
              <li key={title}>
                <Image
                  src={`/images/hero/tags/${icon}.png`}
                  alt=""
                  width={28}
                  height={28}
                />
                {title}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="formats" className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.centerHeading}>
            <p className={styles.eyebrow}>Выберите направление</p>
            <h2>Какой формат помощи выбрать?</h2>
            <p>
              Форматы отличаются способом работы. Выберите тот, который ближе
              вашему запросу, или обратитесь к нам — поможем сориентироваться.
            </p>
          </div>
          <div className={styles.formats}>
            {formats.map((format, index) => (
              <article className={styles.format} key={format.title}>
                <div className={styles.formatMeta}>
                  <span>0{index + 1}</span>
                  <span>{format.tag}</span>
                </div>
                <h3>{format.title}</h3>
                <p>{format.description}</p>
                <div className={styles.fit}>
                  <h4>Подходит, если</h4>
                  <p>{format.fit}</p>
                </div>
                <Link
                  href={format.href}
                  className={index === 0 ? styles.primary : styles.outline}
                >
                  {format.button}
                  <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.pick}>
        <div className={`${styles.inner} ${styles.pickInner}`}>
          <div>
            <p className={styles.eyebrow}>Можно не решать в одиночку :)</p>
            <h2>
              Не уверены, какой
              <br />
              формат вам подходит?
            </h2>
          </div>
          <div>
            <p>
              Кратко опишите свою ситуацию. Координатор задаст несколько
              уточняющих вопросов и поможет понять, с какого формата лучше
              начать.
            </p>
            <button
              type="button"
              className={styles.purple}
              onClick={() => openCallbackPopup()}
            >
              Подобрать формат
            </button>
          </div>
        </div>
      </section>
      <section
        id="specialists"
        className={`${styles.cream} ${styles.specialists}`}
      >
        <div className={styles.inner}>
          <div className={styles.centerHeading}>
            <h2>Наши специалисты</h2>
            <p>
              Психологи, расстановщики, преподаватели и ведущие практик
              института
            </p>
          </div>
          <div className={styles.carousel}>
            {!allSpecialists && specialists.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.carouselArrow} ${styles.prev}`}
                  aria-label="Предыдущие специалисты"
                  onClick={() => scroll(-1)}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={`${styles.carouselArrow} ${styles.next}`}
                  aria-label="Следующие специалисты"
                  onClick={() => scroll(1)}
                >
                  ›
                </button>
              </>
            )}
            <div
              ref={track}
              className={allSpecialists ? styles.specialistGrid : styles.track}
            >
              {specialists.map((specialist, index) => (
                <SpecialistCard key={specialist.slug} specialist={specialist} featured={index === 0} className={styles.specialist} />
              ))}
            </div>
          </div>
          <div className={styles.centerAction}>
            <Link href="/specialists" className={styles.outline}>Каталог специалистов ↗</Link>
            <button
              type="button"
              className={styles.outline}
              aria-expanded={allSpecialists}
              onClick={() => setAllSpecialists(!allSpecialists)}
            >
              {allSpecialists ? "Свернуть список" : "Все специалисты"}
            </button>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.splitHeading}>
            <div>
              <p className={styles.eyebrow}>Календарь</p>
              <h2>Ближайшие мероприятия</h2>
            </div>
            <p>
              Группы, открытые встречи и практики, связанные с психологической
              помощью.
            </p>
          </div>
          <div className={styles.events}>
            {events.length ? (
              events.map((event) => {
                const date = new Date(event.startAt);
                const type =
                  (
                    {
                      group: "Расстановочная группа",
                      course: "Курс",
                      consultation: "Консультация",
                      webinar: "Вебинар",
                    } as Record<string, string>
                  )[event.eventType || ""] ||
                  event.eventType ||
                  "Мероприятие";
                const href =
                  event.link && /^(https?:\/\/|\/(?!\/))/.test(event.link)
                    ? event.link
                    : "/timetable";
                return (
                  <article key={event.id} className={styles.event}>
                    <time dateTime={event.startAt}>
                      <strong>
                        {date.toLocaleDateString("ru-RU", {
                          day: "2-digit",
                          timeZone: "Europe/Moscow",
                        })}
                      </strong>
                      <span>
                        {date.toLocaleDateString("ru-RU", {
                          month: "short",
                          timeZone: "Europe/Moscow",
                        })}
                      </span>
                    </time>
                    <div>
                      <p className={styles.eyebrow}>{type}</p>
                      <h3>
                        <Link href={href}>{event.title}</Link>
                      </h3>
                    </div>
                    <div className={styles.eventMeta}>
                      <strong>
                        {date.toLocaleTimeString("ru-RU", {
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "Europe/Moscow",
                        })}
                      </strong>
                      <span>
                        {event.format === "offline" ? "Офлайн" : "Онлайн"}
                      </span>
                      {event.instructor && <span>{event.instructor}</span>}
                    </div>
                    <Link
                      href={href}
                      className={styles.eventArrow}
                      aria-label={`Подробнее: ${event.title}`}
                    >
                      <Arrow />
                    </Link>
                  </article>
                );
              })
            ) : (
              <p className={styles.empty}>
                Новые мероприятия скоро появятся в календаре. Свяжитесь с нами,
                чтобы узнать о ближайших встречах.
              </p>
            )}
          </div>
          <div className={styles.centerAction}>
            <Link href="/timetable" className={styles.outline}>
              Все мероприятия
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.cream} id="online-tools">
        <div className={`${styles.inner} ${styles.toolsGrid}`}>
          <div>
            <p className={styles.eyebrow}>В своём темпе</p>
            <h2>Онлайн-инструменты для самостоятельной работы</h2>
            <p>
              Короткие цифровые практики помогают структурировать запрос,
              посмотреть на ситуацию с другой стороны и зафиксировать важные
              наблюдения.
            </p>
            <p>
              Они не заменяют работу со специалистом, но могут стать первым
              шагом перед консультацией или самостоятельным способом исследовать
              свой запрос.
            </p>
          </div>
          <div className={styles.tools}>
            {tools.map((tool) => (
              <article key={tool.href}>
                <Image src={tool.icon} alt="" width={76} height={76} />
                <div>
                  <h3>{tool.title}</h3>
                  <p>{tool.text}</p>
                  <Link href={tool.href}>
                    Открыть <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.centerHeading}>
            <p className={styles.eyebrow}>Если вас интересует обучение</p>
            <h2>
              Хотите освоить системный
              <br />
              подход глубже?
            </h2>
            <p>
              В институте есть образовательные программы для тех, кто хочет
              освоить системные расстановки профессионально или применять
              системный подход в работе с людьми и организациями.
            </p>
          </div>
          <div className={styles.courses}>
            <article>
              <span>Старт в методе</span>
              <h3>Базовый курс по системным расстановкам</h3>
              <p>
                Профессиональная подготовка по системным расстановкам: теория,
                практика, супервизионная поддержка и развитие навыков работы с
                клиентскими запросами.
              </p>
              <Link href="/base-cource" className={styles.outline}>
                О базовом курсе
                <Arrow />
              </Link>
            </article>
            <article>
              <span>Для практиков и руководителей</span>
              <h3>Бизнес-расстановки</h3>
              <p>
                Системный подход к работе с организациями, командами, ролями,
                управленческими задачами и бизнес-процессами.
              </p>
              <Link href="/business-cource" className={styles.outline}>
                О бизнес курсе
                <Arrow />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
