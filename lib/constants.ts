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
  "https://static.tildacdn.com/tild3136-3665-4739-b062-376538653330/logo.svg";

export const BURGER_ICON =
  "https://static.tildacdn.com/tild3130-6632-4232-b561-323161346563/burger.svg";

export const NAV_LINKS = [
  { label: "Расписание", href: "/timetable" },
  { label: "Психологическая помощь", href: "/individual-consultations" },
  { label: "Статьи", href: "/blog" },
] as const;

export const MORE_LINKS = [
  { label: "Каталог услуг", href: "/catalog" },
  { label: "Специалисты", href: "/specialists" },
  { label: "Расстановочные группы", href: "/rasstanovochnye-gruppy" },
  { label: "Видеоматериалы", href: "/video-materials" },
  { label: "О нас", href: "/information-about-the-educational-organization" },
  { label: "Маркет", href: "/market" },
] as const;

export const EDUCATION_LINKS = [
  {
    label: "Базовый курс по расстановкам",
    href: "/base-cource",
    meta: "777ч. / 10 мес.",
    icon: "https://static.tildacdn.com/tild6532-3836-4639-a337-376536323337/base.svg",
  },
  {
    label: "Курс бизнес расстановок",
    href: "/business-cource",
    meta: "126ч. 6 мес.",
    icon: "https://static.tildacdn.com/tild6533-3437-4239-b366-323565346534/business.svg",
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
    { label: "Психологическая помощь", href: "/psychological-help" },
    { label: "Телесная терапия", href: "/telese-terapiya" },
  ],
  info: [
    { label: "О нас", href: "/information-about-the-educational-organization" },
    { label: "Статьи", href: "/blog" },
    { label: "Расписание", href: "/timetable" },
    { label: "Каталог услуг", href: "/catalog" },
  ],
} as const;

/** Единственная цитата в hero — как на lifeinstitute.ru */
export const HERO_TESTIMONIAL = {
  quote:
    "Я перестал играть роль жертвы и стал увереннее. Это изменило мой доход и отношения.",
  author: "Геннадий Шепелин",
  role: "Выпускник ИРЖ",
} as const;

export const TESTIMONIALS = [
  {
    quote: HERO_TESTIMONIAL.quote,
    author: HERO_TESTIMONIAL.author,
    role: HERO_TESTIMONIAL.role,
    photo:
      "https://static.tildacdn.com/tild6165-3236-4831-a536-613231653133/jonathan-borba-RTHwe.jpg",
  },
  {
    quote:
      "Расстановки помогли увидеть корень семейных конфликтов. Наконец появилась ясность и спокойствие.",
    author: "Марина К.",
    role: "Участница группы",
    photo:
      "https://static.tildacdn.com/tild3465-3034-4232-b531-666636393961/c_1.jpg",
  },
  {
    quote:
      "Обучение в институте дало не только профессию, но и глубокое понимание себя.",
    author: "Алексей Д.",
    role: "Выпускник базового курса",
    photo:
      "https://static.tildacdn.com/tild3962-6236-4536-a463-663630633963/8B7A2059_1.png",
  },
] as const;

export const HERO_TAGS = [
  "Отношения",
  "Границы",
  "Тревога / стресс",
  "Бизнес",
  "Деньги",
  "Карьера",
  "Семья",
] as const;

export const PROGRAMS = [
  {
    href: "/base-cource",
    meta: "10 мес. / 777 часов · Профессиональная переподготовка",
    title: "Базовый курс обучения семейным расстановкам",
    icon: "https://static.tildacdn.com/tild6532-3836-4639-a337-376536323337/base.svg",
  },
  {
    href: "/psychological-help",
    meta: "от 30 минут",
    title: "Психологическая помощь",
    icon: "https://static.tildacdn.com/tild6433-6434-4538-b932-306265666464/1.png",
  },
  {
    href: "/business-cource",
    meta: "6 мес. / 126 часов",
    title: "Курс обучения бизнес-расстановкам",
    icon: "https://static.tildacdn.com/tild6533-3437-4239-b366-323565346534/business.svg",
  },
  {
    href: "/rasstanovochnye-gruppy",
    meta: "Очно / онлайн",
    title: "Расстановочные группы",
    icon: "https://static.tildacdn.com/tild3631-3166-4738-a237-616561316665/2.png",
  },
] as const;
