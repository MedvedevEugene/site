export type SearchResult = {
  title: string;
  href: string;
  description?: string;
};

export const SEARCHABLE_PAGES: SearchResult[] = [
  {
    title: "Базовый курс обучения семейным расстановкам",
    href: "/base-cource",
    description: "Профессиональная переподготовка, 10 мес. / 777 часов",
  },
  {
    title: "Курс обучения бизнес-расстановкам",
    href: "/business-cource",
    description: "Профессиональная переподготовка, 6 мес.",
  },
  {
    title: "Телесно-ориентированная терапия",
    href: "/telese-terapiya",
    description: "Внутренний курс и телесные практики",
  },
  {
    title: "Индивидуальные консультации",
    href: "/individual-consultations",
    description: "Психологическая помощь онлайн и офлайн",
  },
  {
    title: "Расстановочные группы",
    href: "/rasstanovochnye-gruppy",
    description: "Очные и онлайн группы",
  },
  {
    title: "Маркет развивающих товаров",
    href: "/market",
    description: "Магазин института",
  },
  {
    title: "Расписание",
    href: "/timetable",
    description: "Мероприятия и анонсы событий",
  },
  {
    title: "Статьи",
    href: "/blog",
    description: "Материалы и публикации",
  },
  {
    title: "16 ассоциаций",
    href: "/16-associations",
    description: "Цифровой НЛП/НЛУ-инструмент",
  },
  {
    title: "НЛУ",
    href: "/nlu",
    description: "Исследование уровней запроса",
  },
  {
    title: "Инсайтограф",
    href: "/ptichno-rybko",
    description: "Карта убеждений и смыслов",
  },
];

export function searchSite(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return SEARCHABLE_PAGES.filter((page) => {
    const haystack = `${page.title} ${page.description || ""} ${page.href}`.toLowerCase();
    return haystack.includes(q);
  });
}
