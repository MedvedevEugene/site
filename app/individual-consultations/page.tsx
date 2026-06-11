import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FAQ } from "@/components/ui/FAQ";
import { IMAGES } from "@/lib/site-data";
import { getPublishedTariffs, getMediaUrl, getPublishedSpecialists } from "@/lib/content";
import { SpecialistCard } from "@/components/specialists/SpecialistCard";

export const metadata: Metadata = {
  title: "Индивидуальные консультации",
};

export const dynamic = "force-dynamic";

const FEATURES = [
  { value: "от 60 минут", label: "продолжительность встречи" },
  { value: "Онлайн", label: "спокойный формат из любой точки" },
  { value: "Выбор специалиста", label: "можно подобрать специалиста под ваш запрос" },
  { value: "Разный формат работы", label: "разовая консультация или серия встреч" },
];

const TOPICS = [
  {
    title: "Отношения и семья",
    text: "когда в отношениях много напряжения, обид, непонимания или повторяющихся конфликтов и хочется яснее увидеть ситуацию",
    image: IMAGES.topic1,
  },
  {
    title: "Тревога, стресс, выгорание",
    text: "когда становится трудно справляться с нагрузкой, сохранять внутреннюю опору и возвращать себе спокойствие",
    image: IMAGES.topic2,
  },
  {
    title: "Границы и самоценность",
    text: "когда сложно говорить о своих потребностях, отстаивать себя и чувствовать собственную ценность без вины и напряжения",
    image: IMAGES.topic3,
  },
  {
    title: "Деньги, карьера, бизнес",
    text: "когда вы стоите перед важным решением, не понимаете, куда двигаться дальше, или сталкиваетесь с повторяющимися трудностями в работе и деньгах",
    image: IMAGES.topic4,
  },
  {
    title: "Родовые истории, повторяющиеся сценарии",
    text: "когда в жизни словно снова и снова повторяются похожие ситуации, и важно глубже понять их причины",
    image: IMAGES.topic5,
  },
  {
    title: "Телесные симптомы",
    text: "когда внутреннее напряжение отражается на теле, и хочется посмотреть на ситуацию шире, через связь состояния, эмоций и жизненного контекста",
    image: IMAGES.topic6,
  },
];

const PRICING_FALLBACK = [
  { title: "Диагностическая сессия 30 мин.", description: "познакомиться с форматом, сформулировать запрос и понять следующий шаг", price: null as string | null, ctaText: "Записаться", ctaLink: null as string | null, iconUrl: IMAGES.price1, outline: false },
  { title: "Разовая консультация до 2ч.", description: "глубже разобрать ситуацию, получить ясность и рекомендации по дальнейшей работе", price: null, ctaText: "Записаться", ctaLink: null, iconUrl: IMAGES.price2, outline: false },
  { title: "Пакет 10 сессий", description: "для более глубокой и последовательной работы, когда важны устойчивые изменения и сопровождение в процессе", price: null, ctaText: "Записаться", ctaLink: null, iconUrl: IMAGES.price3, outline: false },
  { title: "Сопровождение после пакета сессий", description: "поддерживаем после основной работы, чтобы помочь сохранить результат и двигаться дальше", price: null, ctaText: "Узнать больше", ctaLink: null, iconUrl: IMAGES.price4, outline: true },
];

const STEPS = [
  "Знакомство и уточнение запроса",
  "Подбор специалиста и формата",
  "Первая встреча",
  "Дальнейшая работа",
  "Поддержка и сопровождение",
  "Конфиденциальность и этика",
];

const METHODS = [
  { title: "Клиент-центрированный подход", text: "бережная работа, в которой внимание уделяется вашему запросу, состоянию и внутреннему темпу" },
  { title: "Системная семейная терапия", text: "рассматривает ситуацию шире – через связи, отношения и влияние семейной системы на текущую жизнь" },
  { title: "Транзактный анализ", text: "позволяет лучше понять внутренние роли, способы общения и повторяющиеся сценарии в отношениях и жизни" },
  { title: "Гештальт-терапия", text: "помогает замечать чувства и потребности здесь и сейчас, возвращая контакт с собой" },
  { title: "Когнитивно-поведенческий подход", text: "работает с мыслями и поведением, которые поддерживают сложные состояния" },
  { title: "Телесно-ориентированная терапия", text: "учитывает связь эмоций, тела и жизненного опыта" },
];

const SPECIALISTS_FALLBACK = [
  { slug: "asya-bykovskaya", name: "Ася Быковская", role: "Руководитель института, преподаватель, расстановщик, терапевт", photoUrl: "https://static.tildacdn.com/tild3962-6236-4536-a463-663630633963/8B7A2059_1.png" },
];

const FAQ_ITEMS = [
  { question: "С каким запросом можно обратиться?", answer: "Вы можете обратиться с личным, семейным или жизненным запросом: отношения, тревога, стресс, границы, деньги, выбор. Если сложно сформулировать — это нормально." },
  { question: "Как понять, какой формат мне подходит?", answer: "Можно начать с диагностики, разовой консультации или серии встреч — мы поможем выбрать." },
  { question: "Как проходит первая консультация?", answer: "Вы рассказываете о ситуации, специалист помогает структурировать запрос и предложить следующий шаг." },
  { question: "Что делать, если мне сложно сформулировать запрос?", answer: "На первой встрече мы поможем сформулировать запрос — можно прийти с ощущением «что-то не так»." },
  { question: "Как выбрать специалиста?", answer: "Можно выбрать самостоятельно или пройти короткий квиз — мы подберём специалиста под ваш запрос." },
  { question: "Онлайн-консультация – это полноценный формат?", answer: "Да, онлайн — полноценный формат. Нужны спокойное пространство, интернет и время для себя." },
  { question: "Сколько встреч может понадобиться?", answer: "Зависит от запроса: кому-то достаточно одной встречи, кому-то нужна серия или сопровождение." },
  { question: "Сохраняется ли конфиденциальность?", answer: "Да. Всё обсуждаемое остаётся в рамках профессионального и бережного взаимодействия." },
];

export default async function IndividualConsultationsPage() {
  const [dbTariffs, consultHero, quizTeam, dbSpecialists] = await Promise.all([
    getPublishedTariffs("consultations"),
    getMediaUrl("consult-hero", IMAGES.consultHero),
    getMediaUrl("quiz-team", IMAGES.quizTeam),
    getPublishedSpecialists(),
  ]);
  const pricing =
    dbTariffs.length > 0
      ? dbTariffs.map((t) => ({
          title: t.title,
          description: t.description,
          price: t.price,
          ctaText: t.ctaText,
          ctaLink: t.ctaLink,
          iconUrl: t.iconUrl,
          outline: t.outline,
        }))
      : PRICING_FALLBACK;

  const specialists =
    dbSpecialists.length > 0
      ? dbSpecialists.map((s) => ({
          slug: s.slug,
          name: s.name,
          role: s.role,
          photoUrl: s.photoUrl,
        }))
      : SPECIALISTS_FALLBACK;

  return (
    <>
      <section className="py-8 md:py-12 bg-cream-bg">
        <div className="container-site">
          <div className="text-sm text-muted mb-6">
            <Link href="/">Главная</Link> / Индивидуальные консультации
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium leading-tight m-0 mb-5">
                Индивидуальные консультации онлайн – чтобы лучше понять свою ситуацию и найти опору
              </h1>
              <p className="text-lg text-muted m-0 mb-7 max-w-[560px]">
                Спокойно разбираем личные и жизненные запросы, помогаем увидеть суть происходящего и подобрать подходящий формат дальнейшей работы.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="#specialists" className="btn btn-primary-solid">Выбрать специалиста</Link>
                <Link href="#quiz" className="btn btn-outline uppercase text-[11px] tracking-wide">Получить консультацию</Link>
              </div>
            </div>
            <div className="relative min-h-[360px]">
              <Image src={consultHero} alt="" fill className="object-contain object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {FEATURES.map((f) => (
              <div key={f.label}>
                <div className="font-heading text-lg font-medium mb-1">• {f.value}</div>
                <div className="text-sm text-muted">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#fdfbf4]">
        <div className="container-site">
          <h2 className="section-title">Когда это помогает?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOPICS.map((t) => (
              <div key={t.title} className="topic-card group">
                <Image src={t.image} alt="" fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d3447]/95 via-[#3d3447]/50 to-[#c4b4a6]/30" />
                <div className="relative z-10">
                  <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-primary mb-auto mb-6">›</div>
                  <h3 className="font-heading text-xl font-medium m-0 mb-2">{t.title}</h3>
                  <p className="text-sm text-white/90 m-0 leading-relaxed">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site">
          <h2 className="section-title">Форматы и стоимость</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pricing.map((p) => (
              <div key={p.title} className="price-card-tilda relative">
                {p.iconUrl && (
                  <div className="absolute right-5 top-5 w-20 h-20">
                    <Image src={p.iconUrl} alt="" fill className="object-contain" sizes="80px" />
                  </div>
                )}
                <h3 className="font-heading text-xl font-medium m-0 mb-3 max-w-[70%]">{p.title}</h3>
                {p.price && <div className="font-medium text-primary mb-2">{p.price}</div>}
                <p className="text-sm text-muted flex-1 m-0 mb-6 max-w-[75%]">{p.description}</p>
                <Link href={p.ctaLink || "#quiz"} className={`btn self-start uppercase text-[11px] tracking-wide ${p.outline ? "btn-outline" : "btn-primary-solid"}`}>
                  {p.ctaText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className="container-site max-w-[800px]">
          <div className="flex flex-col gap-4">
            {STEPS.map((step, i) => (
              <div key={step} className="accordion-item">
                <span>{i + 1}. {step}</span>
                <span className="text-2xl font-light">+</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[70px] bg-primary-footer">
        <div className="container-site">
          <h2 className="section-title text-white mb-10">Методы работы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {METHODS.map((m) => (
              <div key={m.title} className="methods-card">
                <div className="w-16 h-16 rounded-full bg-[#ebe4f8] mb-6" />
                <h3 className="font-heading text-lg font-medium m-0 mb-3">{m.title}</h3>
                <p className="text-sm text-muted m-0 leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white" id="quiz">
        <div className="container-site">
          <h2 className="section-title">Подберем вам специалиста</h2>
          <div className="relative rounded-[28px] overflow-hidden min-h-[360px] flex items-center justify-center text-center text-white p-8">
            <Image src={quizTeam} alt="" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 max-w-[640px]">
              <h3 className="font-heading text-[clamp(22px,3vw,32px)] font-medium m-0 mb-4">
                Ответьте на несколько вопросов и мы подберем вам специалиста
              </h3>
              <p className="m-0 mb-6 text-white/90">
                Квиз займёт 1–2 минуты. По вашим ответам мы предложим подходящий формат работы и поможем выбрать специалиста под ваш запрос.
              </p>
              <button type="button" className="btn btn-accent rounded-full px-8">Начать →</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white" id="specialists">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <h2 className="section-title m-0">Наши специалисты</h2>
            <Link href="/specialists" className="btn btn-outline text-sm">Все специалисты</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {specialists.map((s) => (
              <SpecialistCard key={s.slug} specialist={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white pb-24">
        <div className="container-site">
          <h2 className="section-title">Ответы на вопросы</h2>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>
    </>
  );
}
