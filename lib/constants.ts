export const SITE = {
  name: "ИЖСИЗ",
  fullName: "Институт Жизненных Систем и Имплицитного Знания",
  license: "Л035-01298-77/03208353",
  phone: "+7 977 997-92-79",
  phoneDisplay: "+7 977 997-92-79",
  phoneAlt: "+7 (925) 920-20-28",
  email: "anas-mos@yandex.ru",
  hours: "Пн.–Вс. с 09:00 до 21:00 по Москве",
  url: "https://lifeinstitute.ru",
} as const;

export const LOGO =
  "/images/site/tild3136-3665-4739-b062-376538653330__logo.svg";

export const BURGER_ICON =
  "/images/site/tild3130-6632-4232-b561-323161346563__burger.svg";

export const NAV_LINKS = [
  { label: "Расписание", href: "/timetable" },
  { label: "Психологическая помощь", href: "/individual-consultations" },
  { label: "Статьи", href: "/blog" },
] as const;

export const MORE_LINKS = [
  { label: "Расстановочные группы", href: "/rasstanovochnye-gruppy" },
  { label: "Телесная терапия", href: "/telese-terapiya" },
  { label: "Психологическая помощь", href: "/individual-consultations" },
  { label: "Маркет", href: "/market" },
] as const;

export const EDUCATION_LINKS = [
  {
    label: "Базовый курс по расстановкам",
    titleLines: ["Базовый курс", "по расстановкам"],
    href: "/base-cource",
    meta: "777ч. / 10 мес.",
    icon: "/images/site/tild6532-3836-4639-a337-376536323337__base.svg",
  },
  {
    label: "Курс бизнес расстановок",
    titleLines: ["Курс бизнес", "расстановок"],
    href: "/business-cource",
    meta: "126ч. 6 мес.",
    icon: "/images/site/tild6533-3437-4239-b366-323565346534__business.svg",
  },
] as const;

export const FOOTER_LINKS = {
  education: [
    { label: "Базовый курс", href: "/base-cource" },
    { label: "Бизнес-курс", href: "/business-cource" },
    { label: "Расстановочные группы", href: "/rasstanovochnye-gruppy" },
  ],
  help: [
    { label: "Консультации", href: "/individual-consultations" },
    { label: "Психологическая помощь", href: "/individual-consultations" },
    { label: "Телесная терапия", href: "/telese-terapiya" },
  ],
  info: [
    { label: "Статьи", href: "/blog" },
    { label: "Расписание", href: "/timetable" },
  ],
} as const;

/** Единственная цитата в hero — как в макете «Для Жени» */
export const HERO_TESTIMONIAL = {
  quote:
    "Я перестал играть роль жертвы и стал увереннее. Это изменило мой доход и отношения.",
  author: "Геннадий Шепелин",
  role: "Выпускник программы по системным расстановкам",
} as const;

export const TESTIMONIALS = [
  {
    quote: HERO_TESTIMONIAL.quote,
    author: HERO_TESTIMONIAL.author,
    role: HERO_TESTIMONIAL.role,
    photo:
      "/images/site/tild6165-3236-4831-a536-613231653133__jonathan-borba-RTHwe.jpg",
  },
  {
    quote:
      "Расстановки помогли увидеть корень семейных конфликтов. Наконец появилась ясность и спокойствие.",
    author: "Марина К.",
    role: "Участница группы",
    photo:
      "/images/site/tild3465-3034-4232-b531-666636393961__c_1.jpg",
  },
  {
    quote:
      "Обучение в институте дало не только профессию, но и глубокое понимание себя.",
    author: "Алексей Д.",
    role: "Выпускник базового курса",
    photo:
      "/images/site/tild3962-6236-4536-a463-663630633963__8B7A2059_1.png",
  },
] as const;

export const HERO_TAGS = [
  "Отношения",
  "Личные границы",
  "Деньги",
  "Карьера",
  "Бизнес",
  "Семья",
  "Тревога и стресс",
] as const;

export const PROGRAMS = [
  {
    href: "/base-cource",
    meta: "10 мес. / 777 часов · Профессиональная переподготовка",
    title: "Базовый курс обучения семейным расстановкам",
    icon: "/images/site/tild6532-3836-4639-a337-376536323337__base.svg",
  },
  {
    href: "/individual-consultations",
    meta: "от 30 минут",
    title: "Психологическая помощь",
    icon: "/images/site/tild6433-6434-4538-b932-306265666464__1.png",
  },
  {
    href: "/business-cource",
    meta: "6 мес. / 126 часов",
    title: "Курс обучения бизнес-расстановкам",
    icon: "/images/site/tild6533-3437-4239-b366-323565346534__business.svg",
  },
  {
    href: "/rasstanovochnye-gruppy",
    meta: "Очно / онлайн",
    title: "Расстановочные группы",
    icon: "/images/site/tild3631-3166-4738-a237-616561316665__2.png",
  },
] as const;
