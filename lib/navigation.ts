import { EDUCATION_LINKS } from "./constants";

export const HELP_LINKS = [
  { label: "Обзор раздела", href: "/psychological-help" },
  { label: "Индивидуальные консультации", href: "/individual-consultations" },
  {
    label: "Индивидуальные расстановки",
    href: "/individual-consultations#methods",
  },
  { label: "Расстановочные группы", href: "/rasstanovochnye-gruppy" },
  { label: "Телесная терапия", href: "/telese-terapiya" },
];
export const TOOL_LINKS = [
  { label: "Все онлайн-сервисы", href: "/psychological-help#online-tools" },
  { label: "16 ассоциаций", href: "/16-associations" },
  { label: "Пирамида НЛУ", href: "/nlu" },
  { label: "Инсайтограф", href: "/ptichno-rybko" },
];
export const ABOUT_LINKS = [
  { label: "Об институте", href: "/#institute" },
  { label: "Специалисты", href: "/psychological-help#specialists" },
  { label: "Лицензия и документы", href: "/#institute" },
];
export const NAVIGATION = [
  { label: "Обучение", links: EDUCATION_LINKS },
  { label: "Психологическая помощь", links: HELP_LINKS },
  { label: "Онлайн-сервисы", links: TOOL_LINKS },
  { label: "Мероприятия", href: "/timetable" },
  { label: "Специалисты", href: "/psychological-help#specialists" },
  { label: "Об институте", links: ABOUT_LINKS },
];
