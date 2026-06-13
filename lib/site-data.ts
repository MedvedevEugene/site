const CDN = "https://static.tildacdn.com";

export const IMAGES = {
  /** Портрет в hero (как на lifeinstitute.ru) */
  heroPortrait: `${CDN}/tild3865-3764-4963-b439-373761633561/01b0e4cc-d423-4d42-9.png`,
  quoteIcon: `${CDN}/tild3738-6362-4233-b064-633765623561/Vector.svg`,
  logoCircle: `${CDN}/tild3633-3262-4161-a430-353230613533/logo-circle.svg`,
  logoWhite: `${CDN}/tild3934-3966-4163-a230-616634613964/logo-white.svg`,
  /** Декор на карточке «Базовый курс» — завитушка, не фото */
  catalogDecor: `${CDN}/tild3738-6362-4233-b064-633765623561/Vector.svg`,
  spiral: `${CDN}/tild3738-6362-4233-b064-633765623561/Vector.svg`,
  /** Сонаставники — скрин с Tilda */
  supportMentors: `${CDN}/tild6664-3738-4963-a632-303161336434/Frame_90.png`,
  supportChat: `${CDN}/tild3539-6431-4765-a639-383164353762/Frame_56.png`,
  /** Фон блока дипломов */
  diplomaBg: `${CDN}/tild3634-3466-4365-a233-386430663137/Rectangle_71.png`,
  featureCompass: `${CDN}/tild3838-3430-4339-b238-363035623439/image_17.png`,
  featureAtom: `${CDN}/tild3764-3864-4939-b437-303535336566/image_18.png`,
  featureMixer: `${CDN}/tild3764-3333-4532-b031-623163313531/image_19.png`,
  diploma: `${CDN}/tild6266-3664-4961-b563-323138343337/diplom.jpg`,
  certificate: `${CDN}/tild3435-6536-4536-a462-373262326366/telegram-cloud-docum.png`,
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
  resonance1: `${CDN}/tild3438-6436-4930-b338-313839333232/1.png`,
  resonance2: `${CDN}/tild3338-3832-4565-b337-646138363537/2.png`,
  resonance3: `${CDN}/tild6233-6531-4932-a233-346161383565/3.png`,
  resonance4: `${CDN}/tild3934-6166-4835-b633-383837626663/4.png`,
  resonance5: `${CDN}/tild6566-3466-4533-b037-373464633131/5.png`,
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
  ["Отношения", "Семья", "Деньги", "Карьера"],
  ["Бизнес", "Тревога/стресс", "Границы"],
] as const;

export const CATALOG_PROGRAMS = [
  {
    href: "/base-cource",
    featured: true,
    tone: "featured" as const,
    tag: "Профессиональная переподготовка",
    badge: "Программа 2026",
    title: "Базовый курс обучения семейным расстановкам",
    meta: "10 мес. / 777 часов",
  },
  {
    href: "/business-cource",
    tone: "cream" as const,
    tag: "Профессиональная переподготовка",
    title: "Курс обучения бизнес расстановкам",
    meta: "6 мес. / 400 часов",
  },
  {
    href: "/telese-terapiya",
    tone: "white" as const,
    tag: "Внутренний курс",
    title: "Продвинутый курс по расстановкам",
    meta: "10 мес. / 777 часов",
  },
  {
    href: "/individual-consultations",
    wide: true,
    tone: "cream" as const,
    tag: "Психологическая помощь",
    title: "Индивидуальные консультации",
    meta: "от 30 минут",
  },
  {
    href: "/rasstanovochnye-gruppy",
    tone: "cream" as const,
    tag: "Мероприятия",
    title: "Расстановочные группы",
    meta: "Очно / онлайн",
  },
  {
    href: "/market",
    tone: "cream" as const,
    tag: "Магазин",
    title: "Маркет развивающих товаров",
    meta: "Круглосуточно",
  },
] as const;

export const RESONANCE_CARDS = [
  { title: "Стать расстановщиком", image: IMAGES.resonance1, href: "/base-cource" },
  { title: "Личная терапия в безопасном формате", image: IMAGES.resonance2, href: "/individual-consultations" },
  { title: "Наладить отношения в семье", image: IMAGES.resonance3, href: "/individual-consultations" },
  { title: "Снять тревогу и вернуть энергию", image: IMAGES.resonance4, href: "/individual-consultations" },
  { title: "Деньги и карьерные развилки", image: IMAGES.resonance5, href: "/business-cource" },
] as const;

export const SUPPORT_TABS = [
  {
    id: "mentors",
    label: "Опытные сонаставники",
    title: "Даём подробную обратную связь во время обучения и после.",
    text: "Каждое ваше задание проверит сонаставник, даст качественную ОС в рост, подсветит слепые пятна, динамики, которые нужно проработать.",
    image: IMAGES.supportMentors,
  },
  {
    id: "sales",
    label: "Центр продаж",
    title: "Помогаем научиться продавать услуги непродавая.",
    text: "Наш опытный эксперт в продажах поможет вам освоить навыки привлечения клиентов и получить первые деньги от продажи ваших услуг.",
    image: IMAGES.supportChat,
  },
  {
    id: "practice",
    label: "Опыт и практика",
    title: "Основа обучения — максимум практики",
    text: "Всю теорию вы закрепите с первых дней обучения, проводя диагностики и расстановочные задания. К концу обучения вы будете состоявшимся специалистом, готовым профессионально практиковать как в онлайн, так и в офлайн форматах.",
    image: IMAGES.supportChat,
  },
  {
    id: "community",
    label: "Сообщество",
    title: "Объединяем осознанных людей",
    text: "Вокруг института сформировалось вдохновляющее сообщество расстановщиков, профессиональных замов и осознанных людей, которые пользуются этим методом для себя.",
    image: IMAGES.supportChat,
  },
] as const;

export const FEATURE_PILLARS = [
  { title: "Работа на себя и в удовольствие.", image: IMAGES.featureCompass, tint: "cream" },
  { title: "Вдохновляющее окружение, которое с вами.", image: IMAGES.featureAtom, tint: "cream" },
  { title: "Управление жизнью — ваш новый навык.", image: IMAGES.featureMixer, tint: "blue" },
] as const;

export const VIDEO_TABS = [
  { id: "offline", label: "Очный формат" },
  { id: "online", label: "Онлайн практика" },
  { id: "lecture", label: "Онлайн лекция" },
] as const;

export const FOOTER_COLUMNS = {
  programs: {
    title: "Образовательные программы",
    links: [
      { label: "Базовый курс расстановкам", href: "/base-cource" },
      { label: "Расстановки PRO", href: "/business-cource" },
      { label: "Сонаставнический практикум", href: "/base-cource" },
    ],
  },
  about: {
    title: "ОБ ИРЖ",
    links: [
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
