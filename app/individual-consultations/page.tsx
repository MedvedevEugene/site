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
  { question: "1. Знакомство и уточнение запроса", answer: "На первом этапе мы внимательно выслушиваем вас, помогаем сформулировать запрос и понять, с чем вы пришли." },
  { question: "2. Подбор специалиста и формата", answer: "Подбираем специалиста и формат работы под ваш запрос — разовую консультацию или серию встреч." },
  { question: "3. Первая встреча", answer: "Вы рассказываете о ситуации, специалист помогает увидеть суть происходящего и предложить следующий шаг." },
  { question: "4. Дальнейшая работа", answer: "При необходимости продолжаем работу в выбранном формате — с регулярными встречами и поддержкой." },
  { question: "5. Поддержка и сопровождение", answer: "После основной работы можем предложить сопровождение, чтобы закрепить результат." },
  { question: "6. Конфиденциальность и этика", answer: "Всё обсуждаемое остаётся в рамках профессионального и бережного взаимодействия." },
];

const METHODS = [
  { title: "Клиент-центрированный подход", text: "бережная работа, в которой внимание уделяется вашему запросу, состоянию и внутреннему темпу", icon: IMAGES.methodIcon1 },
  { title: "Системная семейная терапия", text: "рассматривает ситуацию шире – через связи, отношения и влияние семейной системы на текущую жизнь", icon: IMAGES.methodIcon2 },
  { title: "Транзактный анализ", text: "позволяет лучше понять внутренние роли, способы общения и повторяющиеся сценарии в отношениях и жизни", icon: IMAGES.methodIcon3 },
  { title: "Гештальт-терапия", text: "помогает замечать чувства и потребности здесь и сейчас, возвращая контакт с собой", icon: IMAGES.methodIcon4 },
  { title: "Когнитивно-поведенческий подход", text: "работает с мыслями и поведением, которые поддерживают сложные состояния", icon: IMAGES.methodIcon5 },
  { title: "Телесно-ориентированная терапия", text: "учитывает связь эмоций, тела и жизненного опыта", icon: IMAGES.methodIcon6 },
  { title: "Авторская методология ИРЖ", text: "целостный подход института, соединяющий разные методы для более глубокой и многослойной работы с запросом", icon: IMAGES.methodIcon7 },
];

const SPECIALISTS_FALLBACK = [
  { slug: "asya-bykovskaya", name: "Ася Быковская", role: "Руководитель института, преподаватель, расстановщик, терапевт", photoUrl: "https://static.tildacdn.com/tild3962-6236-4536-a463-663630633963/8B7A2059_1.png" },
  { slug: "ekaterina-skulochenko", name: "Екатерина Скулоченко", role: "Заместитель телесного направления, расстановщик, терапевт", photoUrl: "https://static.tildacdn.com/tild6363-3539-4761-a332-386339353837/telegram-cloud-photo.png" },
  { slug: "svetlana-elistratova", name: "Светлана Елистратова", role: "Заместитель учебной части, преподаватель, расстановщик, терапевт", photoUrl: "https://static.tildacdn.com/tild3039-3963-4365-b732-613738356331/image_31.png" },
  { slug: "regina-karimulina", name: "Регина Каримулина", role: "Расстановщик, преподаватель, терапевт", photoUrl: "https://static.tildacdn.com/tild3465-3034-4232-b531-666636393961/c_1.jpg" },
  { slug: "tamara-ralkova", name: "Тамара Ралькова", role: "Расстановщик, преподаватель, терапевт", photoUrl: "https://static.tildacdn.com/tild3465-3034-4232-b531-666636393961/c_1.jpg" },
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
  const [dbTariffs, consultHero, quizCover, dbSpecialists] = await Promise.all([
    getPublishedTariffs("consultations"),
    getMediaUrl("consult-hero", IMAGES.consultHero),
    getMediaUrl("quiz-cover", IMAGES.quizCover),
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
      <section className="py-8 md:py-12 bg-[#f9f8e8]">
        <div className="container-site">
          <div className="text-sm text-muted mb-6">
            <Link href="/">Главная</Link> / Индивидуальные консультации
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,520px)] gap-8 lg:gap-10 items-start">
            <div className="max-w-[596px]">
              <h1 className="font-body text-[clamp(28px,3.4vw,34px)] font-semibold leading-[1.2] m-0 mb-5 text-primary">
                Индивидуальные консультации онлайн – чтобы лучше понять свою ситуацию и найти опору
              </h1>
              <p className="text-xl text-muted m-0 mb-8 max-w-[540px] leading-relaxed">
                Спокойно разбираем личные и жизненные запросы, помогаем увидеть суть происходящего и подобрать подходящий формат дальнейшей работы.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="#specialists" className="btn btn-primary-solid normal-case text-sm px-6">Выбрать специалиста</Link>
                <Link href="#quiz" className="btn btn-outline normal-case text-sm px-6">Получить консультацию</Link>
              </div>
            </div>
            <div className="relative min-h-[320px] sm:min-h-[400px] lg:min-h-[436px] lg:-mr-6">
              <Image src={consultHero} alt="" fill className="object-contain object-right-top scale-[1.05] origin-top-right" sizes="(max-width: 1024px) 100vw, 520px" priority />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mt-14 pt-8 border-t border-border/60">
            {FEATURES.map((f) => (
              <div key={f.label} className="flex gap-3 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <div>
                  <div className="font-body text-2xl font-medium mb-1 text-primary leading-tight">{f.value}</div>
                  <div className="text-base text-muted">{f.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#fdfbf4]">
        <div className="container-site">
          <h2 className="section-title">Когда это помогает?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {TOPICS.map((t) => (
              <div key={t.title} className="topic-card group">
                <Image src={t.image} alt="" fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#272344]/95 via-[#272344]/45 to-transparent" />
                <div className="relative z-10 min-h-[320px] flex flex-col">
                  <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-primary mb-auto text-lg leading-none">›</div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
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
          <FAQ items={STEPS} />
        </div>
      </section>

      <section className="py-[70px] bg-primary-footer">
        <div className="container-site">
          <h2 className="section-title text-white mb-10">Методы работы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {METHODS.map((m) => (
              <div key={m.title} className="methods-card">
                <div className="relative w-16 h-16 rounded-full bg-[#ebe4f8] mb-6 flex items-center justify-center">
                  <Image src={m.icon} alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                </div>
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
          <div className="relative rounded-[28px] overflow-hidden min-h-[420px] md:min-h-[500px] flex items-center justify-center text-center text-white p-8 mt-10">
            <Image src={quizCover} alt="" fill className="object-cover object-center" sizes="100vw" priority />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 max-w-[640px]">
              <h3 className="font-heading text-[clamp(22px,3vw,32px)] font-medium m-0 mb-4">
                Ответьте на несколько вопросов и мы подберем вам специалиста
              </h3>
              <p className="m-0 mb-6 text-white/90 text-lg">
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
