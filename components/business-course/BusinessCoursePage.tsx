"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BusinessCoursePopup } from "./BusinessCoursePopup";
import { BusinessCourseLeadForm } from "./BusinessCourseLeadForm";
import {
  BUSINESS_COURSE_MODULES,
  BUSINESS_COURSE_IMAGES,
  type BusinessCoursePopupKind,
} from "@/lib/business-course-data";
import { BUSINESS_DESIGN as content } from "@/lib/business-course-design";
import { SITE } from "@/lib/constants";
import styles from "./BusinessCoursePage.module.css";

const authorImage = BUSINESS_COURSE_IMAGES.authorFrame;
const navigation = [
  ["О методе", "method"],
  ["Для кого", "audience"],
  ["Программа", "program"],
  ["Обучение", "format"],
  ["Стоимость", "tariffs"],
] as const;
const faq = [
  {
    q: "Нужен ли опыт в расстановках?",
    a: "Программа выстроена от фундамента к самостоятельной практике. На консультации поможем соотнести ваш опыт и задачи с программой обучения.",
  },
  {
    q: "Нужно ли психологическое образование?",
    a: "Курс рассчитан на специалистов разных направлений. Требования к поступлению и документам об образовании можно уточнить у куратора программы.",
  },
  {
    q: "Подойдёт ли курс собственнику бизнеса?",
    a: "Программа рассчитана в том числе на собственников и руководителей, которые хотят исследовать системные причины бизнес-задач и применять метод в своей работе.",
  },
  {
    q: "Нужен ли опыт работы с бизнесом?",
    a: "В программе есть основы системного понимания бизнеса. На консультации обсудим ваш профессиональный опыт и задачи, чтобы оценить, подходит ли вам обучение.",
  },
  {
    q: "Чем бизнес-расстановки отличаются от классических?",
    a: "В центре внимания — организация: её структура, роли, команда, управление и бизнес-процессы. Программа посвящена применению системного подхода к этим задачам.",
  },
  {
    q: "Как проходит практика?",
    a: "В программу включены демонстрации, работа с кейсами и самостоятельная практика с обратной связью.",
  },
  {
    q: "Какой документ я получу?",
    a: "По окончании программы выпускник получает диплом о профессиональной переподготовке установленного образца. Условия выдачи документа уточняйте при поступлении.",
  },
  {
    q: "Есть ли рассрочка?",
    a: "Да, доступна рассрочка. Подробные условия расскажем на консультации.",
  },
];
function Heading({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.heading}>
      <span className={styles.label}>{label}</span>
      <h2>{children}</h2>
    </div>
  );
}
function Cards({
  items,
  className = "",
}: {
  items: ReadonlyArray<{ title: string; text: string }>;
  className?: string;
}) {
  return (
    <div className={`${styles.cards} ${className}`}>
      {items.map((item, index) => (
        <article key={item.title}>
          <span className={styles.number}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
export function BusinessCoursePage() {
  const [popup, setPopup] = useState<BusinessCoursePopupKind | null>(null);
  const programButton = (
    <button className={styles.button} onClick={() => setPopup("program")}>
      Получить программу курса
    </button>
  );
  const consultationButton = (
    <button className={styles.button} onClick={() => setPopup("consultation")}>
      Записаться на консультацию
    </button>
  );
  return (
    <>
      <div className={styles.page} id="business-top">
        <section className={styles.hero} aria-labelledby="business-title">
          <header className={`${styles.container} ${styles.header}`}>
            <Link href="/" aria-label="ИЖСИЗ — на главную">
              <Image
                src="/images/site/tild3934-3966-4163-a230-616634613964__logo-white.svg"
                alt={SITE.fullName}
                width={210}
                height={53}
                priority
              />
            </Link>
            <nav aria-label="Навигация по бизнес-курсу">
              {navigation.map(([label, id]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
            </nav>
          </header>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div>
              <span className={styles.badge}>
                Диплом о профессиональной переподготовке
              </span>
              <h1 id="business-title">Бизнес-расстановки</h1>
              <p className={styles.heroDescription}>
                Профессиональное обучение бизнес-расстановкам для работы с
                запросами собственников, руководителей и команд: деньги,
                партнёрство, структура, управление, конфликты, стратегия и
                масштабирование.
              </p>
              <p className={styles.muted}>
                Освойте новую специализацию и расширьте практику работой с
                бизнес-запросами.
              </p>
              <p className={styles.gift}>
                <span aria-hidden="true">◇</span> Персональный продающий сайт
                выпускника входит в программу
              </p>
              <div className={styles.actions}>
                {programButton}
                <button
                  className={`${styles.button} ${styles.outline}`}
                  onClick={() => setPopup("consultation")}
                >
                  Записаться на консультацию
                </button>
              </div>
              <ul className={styles.stats}>
                {[
                  "6 месяцев",
                  "126 часов",
                  "Онлайн",
                  "Диплом",
                  "Рассрочка",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <Image
              className={styles.heroPhoto}
              src={authorImage}
              alt="Анастасия Быковская — автор программы"
              width={560}
              height={692}
              priority
              sizes="(max-width: 767px) 90vw, 490px"
            />
          </div>
        </section>
        <section className={styles.light}>
          <div className={styles.container}>
            <Heading label="Системный взгляд">
              Когда бизнес-задача оказывается глубже, чем кажется
            </Heading>
            <p className={styles.intro}>
              В работе с бизнесом часто встречаются ситуации, где причина
              находится не там, где проявляется проблема.
            </p>
            <div className={styles.situations}>
              {content.situations.map((item) => (
                <article key={item}>
                  <span className={styles.square} aria-hidden="true" />
                  <h3>{item}</h3>
                </article>
              ))}
            </div>
            <blockquote>
              Иногда недостаточно анализировать отдельные элементы — важно
              увидеть систему целиком.
            </blockquote>
          </div>
        </section>
        <section id="method" className={styles.dark}>
          <div className={styles.container}>
            <Heading label="О методе">Что такое бизнес-расстановки?</Heading>
            <p className={styles.intro}>
              Метод системной работы с бизнес-запросами, который помогает
              увидеть связи между элементами системы и сформировать новые
              гипотезы о происходящем.
            </p>
            <div className={styles.methodGrid}>
              <Image
                src={BUSINESS_COURSE_IMAGES.methodImage}
                alt="Связи между элементами бизнес-системы"
                width={420}
                height={588}
                sizes="(max-width: 767px) 90vw, 460px"
              />
              <Cards items={content.method} />
            </div>
            <p className={styles.methodNote}>
              Бизнес-расстановки не заменяют бизнес-аналитику — они дополняют её
              системным взглядом.
            </p>
          </div>
        </section>
        <section id="audience" className={styles.deeper}>
          <div className={styles.container}>
            <Heading label="Аудитория">Для кого этот курс</Heading>
            <Cards items={content.audience} className={styles.audienceCards} />
            <div className={styles.topics}>
              <h3>С какими запросами вы сможете работать</h3>
              <ul>
                {content.topics.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className={styles.light}>
          <div className={`${styles.container} ${styles.resultGrid}`}>
            <Heading label="Результат">
              После курса вы сможете самостоятельно работать с бизнес-запросами
            </Heading>
            <ul className={styles.resultList}>
              {content.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
        <section id="program" className={styles.dark}>
          <div className={styles.container}>
            <Heading label="Программа">
              6 модулей — от системного понимания бизнеса к самостоятельной
              практике
            </Heading>
            <p className={styles.intro}>126 часов обучения · 6 месяцев</p>
            <div className={styles.accordions}>
              {BUSINESS_COURSE_MODULES.map((item) => (
                <details key={item.num}>
                  <summary>
                    <span className={styles.number}>{item.num}</span>
                    {item.title}
                    <span className={styles.plus} aria-hidden="true" />
                  </summary>
                  <ul>
                    {item.results.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
            <div className={styles.centerAction}>{programButton}</div>
          </div>
        </section>
        <section id="format" className={styles.light}>
          <div className={styles.container}>
            <Heading label="Формат">Как проходит обучение</Heading>
            <Cards items={content.format} className={styles.formatCards} />
          </div>
        </section>
        <section className={`${styles.dark} ${styles.practice}`}>
          <div className={styles.container}>
            <div className={styles.practiceContent}>
              <Heading label="После обучения">
                Мы помогаем не только обучиться, но и выйти в практику
              </Heading>
              <p className={styles.intro}>
                Выпускникам бизнес-курса мы создаём персональный сайт
                специалиста, чтобы после обучения не пришлось начинать
                профессиональную упаковку с нуля.
              </p>
              <ol>
                {content.practice.map((item, i) => (
                  <li key={item.title}>
                    <span className={styles.number}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
        <section id="author" className={styles.light}>
          <div className={`${styles.container} ${styles.authorGrid}`}>
            <Image
              src={authorImage}
              alt="Анастасия Быковская"
              width={560}
              height={692}
              sizes="(max-width: 767px) 90vw, 460px"
            />
            <div>
              <Heading label="Автор и ведущая программы">
                Анастасия Быковская
              </Heading>
              <p className={styles.intro}>
                Системный расстановщик, преподаватель, основатель ИЖСИЗ
              </p>
              <p>
                Анастасия работает на стыке системного подхода,
                предпринимательства и консультативной практики. Она знает бизнес
                не только как основатель образовательного проекта, но и как
                бывший руководитель юридического подразделения крупной
                корпорации.
              </p>
              <div className={styles.authorStats}>
                <div>
                  <strong>12+ лет</strong>
                  <span>системной и расстановочной практики</span>
                </div>
                <div>
                  <strong>800+</strong>
                  <span>проведённых расстановочных сессий</span>
                </div>
                <div>
                  <strong>150+</strong>
                  <span>выпускников образовательных программ</span>
                </div>
                <div>
                  <strong>Бизнес</strong>
                  <span>юридический и корпоративный опыт</span>
                </div>
              </div>
              <p>
                До создания ИЖСИЗ Анастасия много лет работала в юридической и
                корпоративной среде, в том числе директором юридического отдела
                крупной компании. Она знакома с бизнесом изнутри — с
                управленческой ответственностью, иерархией, рисками,
                конфликтами, взаимодействием подразделений и процессами принятия
                решений.
              </p>
              <p>
                Поэтому в программе бизнес рассматривается одновременно как
                система человеческих отношений и как реальная организационная
                структура — с людьми, ролями, деньгами, процессами,
                ответственностью и стратегией.
              </p>
              <p className={styles.authorNote}>
                Системный подход + реальный корпоративный опыт
              </p>
            </div>
          </div>
        </section>
        <section className={styles.deeper}>
          <div className={`${styles.container} ${styles.diplomaGrid}`}>
            <div>
              <Heading label="Образование">
                Диплом о профессиональной переподготовке
              </Heading>
              <p className={styles.intro}>
                По окончании программы выпускник получает диплом о
                профессиональной переподготовке установленного образца.
              </p>
              <p className={styles.license}>
                <small>Образовательная лицензия</small>№ {SITE.license}
              </p>
            </div>
            <div className={styles.diploma} aria-label="Иллюстрация диплома">
              <div>
                <span>ИЖСИЗ</span>
                <strong>Диплом</strong>
              </div>
              <div>
                <strong>
                  Диплом
                  <br />о профессиональной
                  <br />
                  переподготовке
                </strong>
                <span className={styles.seal} aria-hidden="true" />
                <span>ИЖСИЗ</span>
              </div>
            </div>
          </div>
        </section>
        <section id="tariffs" className={styles.light}>
          <div className={styles.container}>
            <Heading label="Стоимость обучения">
              Всё необходимое для обучения и выхода в практику — в одной
              программе
            </Heading>
            <div className={styles.priceCard}>
              <div className={styles.price}>
                <span className={styles.label}>Полная программа</span>
                <strong>180 000 ₽</strong>
                <p>6 месяцев · 126 часов · 6 модулей</p>
                <p className={styles.gift}>
                  Персональный сайт выпускника входит в стоимость
                </p>
              </div>
              <div className={styles.priceDetails}>
                <h3>В стоимость входит</h3>
                <ul>
                  {content.included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className={styles.installment}>
                  Доступна рассрочка. Подробные условия — на консультации.
                </p>
                {consultationButton}
              </div>
            </div>
          </div>
        </section>
        <section className={styles.dark}>
          <div className={styles.container}>
            <Heading label="Вопросы">Часто задаваемые вопросы</Heading>
            <div className={styles.accordions}>
              {faq.map((item) => (
                <details key={item.q}>
                  <summary>
                    {item.q}
                    <span className={styles.plus} aria-hidden="true" />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className={`${styles.dark} ${styles.final}`}>
          <div className={`${styles.container} ${styles.finalGrid}`}>
            <div>
              <Heading label="Следующий шаг">
                Хотите понять, подойдёт ли бизнес-курс под ваши задачи?
              </Heading>
              <p className={styles.intro}>
                Оставьте заявку на консультацию. Мы расскажем о программе,
                формате обучения и ответим на вопросы.
              </p>
            </div>
            <BusinessCourseLeadForm />
          </div>
        </section>
        <footer className={styles.footer}>
          <div className={`${styles.container} ${styles.footerColumns}`}>
            <div>
              <Link href="/">ИЖСИЗ</Link>
              <p>{SITE.fullName}</p>
              <a href={`tel:${SITE.phone.replace(/[\s()-]/g, "")}`}>
                {SITE.phoneDisplay}
              </a>
            </div>
            <nav aria-label="Помощь">
              <h3>Помощь</h3>
              <Link href="/psychological-help">Форматы помощи</Link>
              <Link href="/psychological-help#specialists">Специалисты</Link>
              <Link href="/timetable">Мероприятия</Link>
            </nav>
            <nav aria-label="Исследовать и учиться">
              <h3>Исследовать и учиться</h3>
              <Link href="/psychological-help#online-tools">
                Онлайн-сервисы
              </Link>
              <Link href="/base-cource">Базовый курс</Link>
              <Link href="/business-cource">Бизнес-курс</Link>
            </nav>
          </div>
          <div className={`${styles.container} ${styles.footerBottom}`}>
            <span>© АНО «ИЖСИЗ», {new Date().getFullYear()}</span>
            <Link href="/privacy">Политика конфиденциальности</Link>
            <a href="#business-top">Наверх ↑</a>
          </div>
        </footer>
      </div>
      <BusinessCoursePopup kind={popup} onClose={() => setPopup(null)} />
    </>
  );
}
