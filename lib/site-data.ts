const CDN = "https://static.tildacdn.com";

export const IMAGES = {
  /** Портрет в hero (как на lifeinstitute.ru) */
  heroPortrait: "/images/hero/portraits/gennadiy.png?v=5",
  /** Кавычки в hero-цитате (как на lifeinstitute.ru) */
  quoteIcon: `${CDN}/tild3765-6635-4265-b734-613031326165/Ellipse_3.svg`,
  logoCircle: `${CDN}/tild3633-3262-4161-a430-353230613533/logo-circle.svg`,
  logoWhite: `${CDN}/tild3934-3966-4163-a230-616634613964/logo-white.svg`,
  /** Иконки соцсетей в футере (rec1359663041) */
  footerSocialVk: `${CDN}/tild6131-3963-4562-a538-303632663636/color.svg`,
  footerSocialTg: `${CDN}/tild6161-6231-4365-b061-653139623038/color.svg`,
  footerSocialMax: "/images/forms/contact-methods/max.svg",
  /** Декор на карточке «Базовый курс» — завитушка, не фото */
  catalogDecor: `${CDN}/tild3738-6362-4233-b064-633765623561/Vector.svg`,
  spiral: `${CDN}/tild3738-6362-4233-b064-633765623561/Vector.svg`,
  /** Сонаставники / поддержка — кадры из Figma */
  featureCompass: "/images/features/compass.png",
  featureAtom: "/images/features/atom.png",
  featureMixer: "/images/features/mixer.png",
  featureWork: "/images/features/work.png?v=1",
  featureCommunity: "/images/features/community.png?v=1",
  featureLife: "/images/features/life.png?v=1",
  supportMentors: "/images/support/mentors.png?v=2",
  supportSales: "/images/support/sales.png?v=1",
  supportPractice: "/images/support/practice.png?v=1",
  supportChat: "/images/support/chat.png?v=3",
  /** Фон блока дипломов */
  diplomaBg: "/images/diplomas/bg.png",
  diploma: "/images/diplomas/diploma.jpg",
  certificate: "/images/diplomas/certificate.png",
  pathCloud: `${CDN}/tild6336-3530-4139-b964-313032653332/2334f0c3-5471-4549-9.png`,
  /** 3D-шапка на облаке — блок «Ваш путь в ИРЖ» */
  pathGradCap: `${CDN}/tild6439-3761-4838-b130-303234303536/2d6688fa-356a-47ed-9.png`,
  pathGrad: `${CDN}/tild6263-3362-4234-b739-363836656135/Ellipse_3.svg`,
  /** Hero страницы консультаций */
  consultHero: `${CDN}/tild6639-3137-4664-a163-613334333333/Frame_133.png`,
  /** Фон квиза «Подберём специалиста» */
  quizCover: `${CDN}/tild6366-6338-4565-a237-326139383261/Frame_137.png`,
  methodIcon1: `${CDN}/tild6238-3634-4230-b434-643963376437/Vector_6.svg`,
  methodIcon2: `${CDN}/tild6631-6464-4137-b766-373432616262/Vector_6.svg`,
  methodIcon3: `${CDN}/tild3833-3365-4832-b439-313839326666/Vector_6.svg`,
  methodIcon4: `${CDN}/tild6366-6239-4665-b330-353432306138/Vector_6.svg`,
  methodIcon5: `${CDN}/tild6530-3633-4430-a230-366336663936/10.png`,
  methodIcon6: `${CDN}/tild3233-3435-4833-b932-653365333737/Vector_6.svg`,
  methodIcon7: `${CDN}/tild3535-6631-4934-b261-393030323063/7.png`,
  resonance1: "/images/resonance/1.png",
  resonance2: "/images/resonance/2.png",
  resonance3: "/images/resonance/3.png",
  resonance4: "/images/resonance/4.png",
  resonance5: "/images/resonance/5.png",
  topic1: `${CDN}/tild6433-6434-4538-b932-306265666464/1.png`,
  topic2: `${CDN}/tild3631-3166-4738-a237-616561316665/2.png`,
  topic3: `${CDN}/tild3966-3965-4662-b464-626135343363/3.png`,
  topic4: `${CDN}/tild3864-6164-4531-b730-623830333762/4.png`,
  topic5: `${CDN}/tild6463-3466-4462-a532-356134316639/5.png`,
  topic6: `${CDN}/tild3766-3730-4565-b862-366638656461/6.png`,
  price1: `${CDN}/tild3962-6464-4636-b632-636136303736/5.png`,
  price2: `${CDN}/tild6433-3661-4864-a333-376238313063/2.png`,
  price3: `${CDN}/tild6262-3038-4862-a239-366633633236/3.png`,
  price4: `${CDN}/tild6437-6437-4364-b761-653463393464/8.png`,
} as const;

export const CALENDAR_EMBED_MONTH =
  "https://calendar.google.com/calendar/embed?src=c_9481efcc388485ed3906e8a504f872266ae1fa7cabd23d868a88eb8388d9258f%40group.calendar.google.com&ctz=Europe%2FMoscow&mode=MONTH&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&lang=ru";

export const HERO_TAG_ROWS = [
  ["Отношения", "Личные границы", "Деньги"],
  ["Карьера", "Бизнес", "Семья", "Тревога и стресс"],
] as const;

/** Декоры карточек — экспорты из Figma блок «каталог услуг» / 1440 */
export type CatalogDecor = "base" | "business" | "body" | "consult" | "groups" | "market";

export const CATALOG_PROGRAMS = [
  {
    href: "/base-cource",
    featured: true,
    tone: "featured" as const,
    decor: "base" as const,
    tag: "Профессиональная переподготовка",
    badge: "Программа 2026",
    title: "Базовый курс обучения семейным расстановкам",
    titleLines: ["Базовый курс обучения", "семейным расстановкам"],
    meta: "10 мес. / 700 часов",
  },
  {
    href: "/business-cource",
    tone: "cream" as const,
    decor: "business" as const,
    tag: "Профессиональная переподготовка",
    title: "Курс обучения бизнес расстановкам",
    titleLines: ["Курс обучения", "бизнес", "расстановкам"],
    meta: "6 мес. / 400 часов",
  },
  {
    href: "/telese-terapiya",
    tone: "cream" as const,
    decor: "body" as const,
    tag: "Телесные практики",
    title: "Телесно-ориентированная терапия",
    titleLines: ["Телесно-", "ориентированная", "терапия"],
    meta: "Индивидуально / очно",
    callbackVariant: "advanced-course" as const,
  },
  {
    href: "/individual-consultations",
    wide: true,
    tone: "cream" as const,
    decor: "consult" as const,
    tag: "Психологическая помощь",
    title: "Индивидуальные консультации",
    titleLines: ["Индивидуальные", "консультации"],
    meta: "от 30 минут",
  },
  {
    href: "/rasstanovochnye-gruppy",
    tone: "cream" as const,
    decor: "groups" as const,
    tag: "Мероприятия",
    title: "Расстановочные группы",
    titleLines: ["Расстановочные", "группы"],
    meta: "Очно / онлайн",
    callbackVariant: "constellation-groups" as const,
  },
  {
    href: "/market",
    tone: "cream" as const,
    decor: "market" as const,
    tag: "Магазин",
    title: "Маркет развивающих товаров",
    titleLines: ["Маркет", "развивающих", "товаров"],
    meta: "Круглосуточно",
  },
] as const;

export const RESONANCE_CARDS = [
  {
    titleLines: ["Стать", "расстановщиком"],
    image: IMAGES.resonance1,
    href: "/base-cource",
  },
  {
    titleLines: ["Личная терапия", "в безопасном", "формате"],
    image: IMAGES.resonance2,
    href: "/individual-consultations",
  },
  {
    titleLines: ["Наладить отношения", "в семье"],
    image: IMAGES.resonance3,
    href: "/individual-consultations",
  },
  {
    titleLines: ["Снять тревогу", "и вернуть энергию"],
    image: IMAGES.resonance4,
    href: "/individual-consultations",
  },
  {
    titleLines: ["Деньги и карьерные", "развилки"],
    image: IMAGES.resonance5,
    href: "/business-cource",
  },
] as const;

export const SUPPORT_TABS = [
  {
    id: "mentors",
    label: "Опытные сонаставники",
    title: "Даём подробную обратную связь во время обучения и после.",
    text: "Каждое ваше задание проверит сонаставник, даст качественную ОС в рост, подсветит слепые пятна, динамики, которые нужно проработать.",
    image: IMAGES.supportMentors,
    mediaTone: "light" as const,
  },
  {
    id: "sales",
    label: "Центр продаж",
    title: "Помогаем научиться продавать услуги непродавая.",
    text: "Наш опытный эксперт в продажах поможет вам освоить навыки привлечения клиентов и получить первые деньги от продажи ваших услуг.",
    image: IMAGES.supportSales,
    mediaTone: "light" as const,
  },
  {
    id: "practice",
    label: "Опыт и практика",
    title: "Основа обучения — максимум практики",
    text: "Всю теорию вы закрепите с первых дней обучения, проводя диагностики и расстановочные задания. К концу обучения вы будете состоявшимся специалистом, готовым профессионально практиковать как в онлайн, так и в офлайн форматах.",
    image: IMAGES.supportPractice,
    mediaTone: "dark" as const,
  },
  {
    id: "community",
    label: "Сообщество",
    title: "Объединяем осознанных людей",
    text: "Вокруг института сформировалось вдохновляющее сообщество расстановщиков, профессиональных замов и осознанных людей, которые пользуются этим методом для себя. Вы можете стать частью этого сообщества, которое будет поддерживать вас на вашем пути.",
    image: IMAGES.supportChat,
    mediaTone: "lavender" as const,
  },
] as const;

export const FEATURE_PILLARS = [
  {
    titleLines: ["Работа на себя", "и в удовольствие"],
    text: "Освойте профессию, которую можно развивать в своём темпе и подходящем формате.",
    image: IMAGES.featureWork,
    imageWidth: 191,
    imageHeight: 148,
    tint: "cream" as const,
  },
  {
    titleLines: ["Вдохновляющее окружение,", "которое с вами"],
    text: "Общайтесь с единомышленниками, находите поддержку и продолжайте расти после обучения.",
    image: IMAGES.featureCommunity,
    imageWidth: 164,
    imageHeight: 151,
    tint: "cream" as const,
  },
  {
    titleLines: ["Управление жизнью —", "ваш новый навык"],
    text: "Лучше понимайте себя и увереннее принимайте решения.",
    image: IMAGES.featureLife,
    imageWidth: 140,
    imageHeight: 133,
    tint: "dark" as const,
  },
] as const;

export const VIDEO_TABS = [
  { id: "offline", label: "очный формат", youtubeId: "asdasdasd" },
  { id: "online", label: "онлайн практика", youtubeId: "asdasdasd" },
  { id: "lecture", label: "онлайн лекция", youtubeId: "asdasdasd" },
] as const;

export const FOOTER_PLACEHOLDER_HREF = "/coming-soon";

export const FOOTER_COLUMNS = {
  programs: {
    title: "Образовательные программы",
    links: [
      { label: "Базовый курс расстановкам", href: "/base-cource" },
      { label: "Расстановки PRO", href: "/telese-terapiya" },
      { label: "Сонаставнический практикум", href: "/coming-soon" },
    ],
  },
  about: {
    title: "Об ИЖСИЗ",
    links: [
      { label: "О нас", href: "/information-about-the-educational-organization" },
      { label: "Статьи", href: "/blog" },
      { label: "Расписание", href: "/timetable" },
      { label: "Расстановочные группы", href: "/rasstanovochnye-gruppy" },
      { label: "Психологическая помощь", href: "/individual-consultations" },
      { label: "Маркет развивающих товаров", href: "/market" },
      { label: "Индивидуальные расстановки", href: "/individual-consultations" },
      { label: "Вебинары", href: "/video-materials" },
    ],
  },
  extra: {
    title: "Дополнительная информация",
    links: [
      { label: "Политика конфиденциальности", href: "/privacy" },
      { label: "Политика обработки персональных данных", href: "/privacy" },
    ],
  },
} as const;

export const FOOTER_SOCIALS = [
  { label: "VK", href: "https://vk.com/", icon: IMAGES.footerSocialVk },
  { label: "Telegram", href: "https://t.me/", icon: IMAGES.footerSocialTg },
  { label: "Max", href: "#", icon: IMAGES.footerSocialMax },
] as const;
