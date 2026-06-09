import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FAQ } from "@/components/ui/FAQ";
import { ContactForm } from "@/components/forms/CallbackPopup";

export const metadata: Metadata = {
  title: "Индивидуальные консультации",
};

const FEATURES = [
  { label: "продолжительность встречи", value: "от 60 минут" },
  { label: "формат", value: "Онлайн" },
  { label: "специалист", value: "Выбор под запрос" },
  { label: "работа", value: "Разовая или серия" },
];

const TOPICS = [
  { title: "Отношения и семья", text: "Когда в отношениях много напряжения, обид, непонимания или повторяющихся конфликтов." },
  { title: "Тревога, стресс, выгорание", text: "Когда становится трудно справляться с нагрузкой и возвращать себе спокойствие." },
  { title: "Границы и самоценность", text: "Когда сложно говорить о своих потребностях и чувствовать собственную ценность." },
  { title: "Деньги, карьера, бизнес", text: "Когда вы стоите перед важным решением или повторяющимися трудностями в работе." },
  { title: "Родовые истории", text: "Когда в жизни снова и снова повторяются похожие ситуации." },
  { title: "Телесные симптомы", text: "Когда внутреннее напряжение отражается на теле и хочется посмотреть шире." },
];

const PRICING = [
  { title: "Диагностическая сессия 30 мин.", desc: "Познакомиться с форматом, сформулировать запрос.", cta: "Записаться", outline: false },
  { title: "Разовая консультация до 2ч.", desc: "Глубже разобрать ситуацию, получить ясность.", cta: "Записаться", outline: false },
  { title: "Пакет 10 сессий", desc: "Для последовательной работы и устойчивых изменений.", cta: "Записаться", outline: false },
  { title: "Сопровождение после пакета", desc: "Поддержка после основной работы.", cta: "Узнать больше", outline: true },
];

const STEPS = [
  { title: "Знакомство и уточнение запроса", text: "После записи мы связываемся с вами и помогаем с выбором формата." },
  { title: "Подбор специалиста", text: "Диагностика, разовая консультация или серия встреч — под ваш запрос." },
  { title: "Первая встреча", text: "Вы рассказываете о ситуации, специалист помогает структурировать запрос." },
  { title: "Дальнейшая работа", text: "Становится понятнее, достаточно ли одной консультации или нужна серия." },
  { title: "Поддержка", text: "Работа продолжается в комфортном темпе, возможно сопровождение." },
  { title: "Конфиденциальность", text: "Безопасное пространство без давления и спешки." },
];

const SPECIALISTS = [
  { name: "Ася Быковская", role: "Руководитель института, преподаватель", photo: "https://static.tildacdn.com/tild3962-6236-4536-a463-663630633963/8B7A2059_1.png" },
  { name: "Екатерина Скулоченко", role: "Зам. телесного направления", photo: "https://static.tildacdn.com/tild3039-3963-4365-b732-613738356331/image_31.png" },
  { name: "Светлана Елистратова", role: "Зам. учебной части", photo: "https://static.tildacdn.com/tild3465-3034-4232-b531-666636393961/c_1.jpg" },
  { name: "Регина Каримулина", role: "Расстановщик, терапевт", photo: "https://static.tildacdn.com/tild6165-3236-4831-a536-613231653133/jonathan-borba-RTHwe.jpg" },
  { name: "Тамара Ралькова", role: "Расстановщик, терапевт", photo: "https://static.tildacdn.com/tild3962-6236-4536-a463-663630633963/8B7A2059_1.png" },
];

const FAQ_ITEMS = [
  { question: "С каким запросом можно обратиться?", answer: "Вы можете обратиться с личным, семейным или жизненным запросом: отношения, тревога, стресс, границы, деньги, выбор. Если сложно сформулировать — это нормально." },
  { question: "Как понять, какой формат мне подходит?", answer: "Можно начать с диагностики, разовой консультации или серии встреч — мы поможем выбрать." },
  { question: "Онлайн-консультация — это полноценный формат?", answer: "Да, онлайн — полноценный формат. Нужны спокойное пространство, интернет и время для себя." },
  { question: "Сохраняется ли конфиденциальность?", answer: "Да. Всё обсуждаемое остаётся в рамках профессионального и бережного взаимодействия." },
];

export default function IndividualConsultationsPage() {
  return (
    <>
      <section className="py-8 md:py-12">
        <div className="container-site">
          <div className="text-sm text-muted mb-6">
            <Link href="/">Главная</Link> / Индивидуальные консультации
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium leading-tight m-0 mb-5">
                Индивидуальные консультации онлайн — чтобы лучше понять свою ситуацию и найти опору
              </h1>
              <p className="text-lg text-muted m-0 mb-7">
                Спокойно разбираем личные и жизненные запросы, помогаем увидеть суть происходящего.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="#specialists" className="btn btn-primary">Выбрать специалиста</Link>
                <Link href="#contact" className="btn btn-outline">Получить консультацию</Link>
              </div>
            </div>
            <div className="relative rounded-[20px] overflow-hidden aspect-[4/3] bg-cream-bg">
              <Image src="https://static.tildacdn.com/tild6366-6338-4565-a237-326139383261/Frame_137.png" alt="" fill className="object-cover" />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {FEATURES.map((f) => (
              <div key={f.label} className="bg-cream-bg border border-border rounded-[20px] p-5 text-center">
                <div className="text-[13px] text-muted mb-1.5">{f.label}</div>
                <div className="font-heading text-[15px] font-medium">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className="container-site">
          <h2 className="section-title">Когда это помогает?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOPICS.map((t) => (
              <div key={t.title} className="card">
                <h3 className="font-heading text-lg font-medium m-0 mb-2.5">{t.title}</h3>
                <p className="text-muted text-[15px] m-0">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <h2 className="section-title">Форматы и стоимость</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRICING.map((p) => (
              <div key={p.title} className="card flex flex-col">
                <h3 className="font-heading text-base font-medium m-0 mb-3 min-h-[48px]">{p.title}</h3>
                <p className="text-sm text-muted flex-1 m-0 mb-5">{p.desc}</p>
                <Link href="#contact" className={`btn w-full text-[11px] uppercase tracking-wide ${p.outline ? "btn-outline" : "btn-primary"}`}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className="container-site">
          <h2 className="section-title">Как проходит работа?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STEPS.map((s, i) => (
              <div key={s.title} className="card">
                <div className="font-heading text-[32px] font-bold text-cream mb-3" style={{ WebkitTextStroke: "1px #3b3758" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-semibold m-0 mb-2">{s.title}</h3>
                <p className="text-sm text-muted m-0">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="specialists">
        <div className="container-site">
          <h2 className="section-title">Наши специалисты</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SPECIALISTS.map((s) => (
              <div key={s.name} className="text-center">
                <Image src={s.photo} alt={s.name} width={200} height={260} className="w-full aspect-[3/4] object-cover rounded-[20px] mb-3 bg-light" />
                <p className="font-semibold text-sm m-0 mb-1">{s.name}</p>
                <p className="text-xs text-muted m-0 mb-3 leading-snug">{s.role}</p>
                <div className="flex flex-col gap-1.5">
                  <Link href="#contact" className="btn btn-primary text-[11px] py-2">Запись</Link>
                  <Link href="#" className="btn btn-outline text-[11px] py-2">О специалисте</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container-site">
          <h2 className="section-title">Ответы на вопросы</h2>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      <section className="section-cream" id="contact">
        <div className="container-site">
          <div className="bg-gradient-to-br from-primary to-[#5a5478] rounded-[20px] p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center text-white">
            <div>
              <h2 className="font-heading text-[28px] m-0 mb-3">Нужна опора, терапия или обучение?</h2>
              <p className="opacity-90 m-0">Оставьте контакты — ответим в течение дня.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
