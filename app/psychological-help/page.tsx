import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Психологическая помощь",
};

const TOPICS = [
  "Отношения и семья",
  "Личные кризисы",
  "Тревога и стресс",
  "Жизненные сценарии",
  "Деньги и реализация",
  "Тело и состояние",
];

const TOOLS = [
  {
    id: "16-associations",
    badge: "Инструмент 1",
    title: "16 ассоциаций",
    description: "Исследование скрытых ассоциаций, внутренних смыслов и неочевидных связей вокруг важной темы.",
    href: "/16-associations",
  },
  {
    id: "nlu",
    badge: "Инструмент 2",
    title: "НЛУ",
    description: "Исследование уровней восприятия, убеждений, поведения, ценностей и внутренней структуры запроса.",
    href: "/nlu",
  },
  {
    id: "insightograph",
    badge: "Инструмент 3",
    title: "Инсайтограф",
    description: "Выявление внутренних ограничений, связей, причин, последствий и скрытых убеждений.",
    href: "/ptichno-rybko",
  },
];

export default function PsychologicalHelpPage() {
  return (
    <>
      <section className="py-8 md:py-12">
        <div className="container-site">
          <div className="text-sm text-muted mb-6">
            <Link href="/">Главная</Link> / Психологическая помощь
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium leading-tight m-0 mb-5">
                Психологическая помощь онлайн и офлайн
              </h1>
              <p className="text-lg text-muted m-0 mb-7">
                Консультации, расстановки, телесно-ориентированные практики и цифровые инструменты для исследования внутренних запросов.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#formats" className="btn btn-primary">Выбрать формат помощи</a>
                <a href="#tools" className="btn btn-outline">Пройти онлайн-инструмент</a>
                <Link href="/individual-consultations" className="btn btn-outline">Записаться на консультацию</Link>
              </div>
            </div>
            <div className="relative rounded-[20px] overflow-hidden aspect-[4/3] bg-cream-bg">
              <Image src="https://static.tildacdn.com/tild6433-6434-4538-b932-306265666464/1.png" alt="" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className="container-site">
          <h2 className="section-title">С чем мы можем помочь</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOPICS.map((topic) => (
              <div key={topic} className="card">
                <h3 className="font-heading text-lg font-medium m-0">{topic}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="tools">
        <div className="container-site">
          <h2 className="section-title">Цифровые НЛП/НЛУ-инструменты</h2>
          <p className="section-subtitle">
            Самостоятельное исследование → карта ответов → бесплатный ИИ-разбор (тестовый режим)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOOLS.map((tool) => (
              <div key={tool.id} className="bg-white rounded-[20px] border-2 border-primary p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#774bd9] to-primary" />
                <span className="inline-block bg-cream rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide mb-4">{tool.badge}</span>
                <h3 className="font-heading text-lg font-medium m-0 mb-2.5">{tool.title}</h3>
                <p className="text-muted text-[15px] m-0 mb-5">{tool.description}</p>
                <div className="flex flex-col gap-2.5">
                  <Link href={tool.href} className="btn btn-primary">Пройти {tool.title}</Link>
                  <Link href={tool.href} className="btn btn-outline">Подробнее об инструменте</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-cream" id="formats">
        <div className="container-site">
          <h2 className="section-title">Другие форматы помощи</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="card">
              <h3 className="font-heading text-lg font-medium m-0 mb-2.5">Психологические консультации</h3>
              <p className="text-muted text-[15px] m-0 mb-5">Индивидуальный формат работы с личным запросом.</p>
              <Link href="/individual-consultations" className="btn btn-outline">Записаться</Link>
            </div>
            <div className="card">
              <h3 className="font-heading text-lg font-medium m-0 mb-2.5">Расстановки</h3>
              <p className="text-muted text-[15px] m-0 mb-5">Глубинный формат системной работы с запросами.</p>
              <Link href="/rasstanovochnye-gruppy" className="btn btn-outline">Узнать о расстановках</Link>
            </div>
            <div className="card">
              <h3 className="font-heading text-lg font-medium m-0 mb-2.5">Телесная терапия</h3>
              <p className="text-muted text-[15px] m-0 mb-5">Работа с телом, напряжением и восстановлением ресурса.</p>
              <Link href="/telese-terapiya" className="btn btn-outline">Посмотреть практики</Link>
            </div>
            <div className="card">
              <h3 className="font-heading text-lg font-medium m-0 mb-2.5">Базовый курс</h3>
              <p className="text-muted text-[15px] m-0 mb-5">Обучение системному подходу и расстановкам.</p>
              <Link href="/base-cource" className="btn btn-outline">Подробнее о курсе</Link>
            </div>
            <div className="card">
              <h3 className="font-heading text-lg font-medium m-0 mb-2.5">Бизнес-курс</h3>
              <p className="text-muted text-[15px] m-0 mb-5">Для предпринимателей и руководителей.</p>
              <Link href="/business-cource" className="btn btn-outline">Подробнее о курсе</Link>
            </div>
            <div className="card card-accent">
              <h3 className="font-heading text-lg font-medium m-0 mb-2.5">Путь клиента</h3>
              <p className="text-white/85 text-[15px] m-0">Инструмент → ИИ-разбор → консультация со специалистом.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
