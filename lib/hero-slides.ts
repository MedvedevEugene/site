/** Портреты — экспорты узлов Figma «1440 #1»–«#7», высота 516 */
export type HeroSlide = {
  id: string;
  firstName: string;
  storyLabel: string;
  portrait: string;
  quote: string;
  author: string;
  role: string;
};

/** Слайды hero по Figma — меняются портрет и цитата */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "gennadiy",
    firstName: "Геннадия",
    storyLabel: "История Геннадия",
    portrait: "/images/hero/portraits/gennadiy.png?v=4",
    quote:
      "Я перестал играть роль жертвы и стал увереннее. Это изменило мой доход и отношения.",
    author: "Геннадий Шепелин",
    role: "Выпускник программы по системным расстановкам",
  },
  {
    id: "svetlana-elistratova",
    firstName: "Светланы",
    storyLabel: "История Светланы",
    portrait: "/images/hero/portraits/svetlana-elistratova.png?v=4",
    quote:
      "Я разобралась в своей жизни и получила мощный инструмент по работе с другими людьми.",
    author: "Светлана Елистратова",
    role: "Выпускник программы по системным расстановкам",
  },
  {
    id: "anna",
    firstName: "Анны",
    storyLabel: "История Анны",
    portrait: "/images/hero/portraits/anna-lykova.png?v=4",
    quote:
      "Я приобрела веру в себя, научилась слышать себя, своё тело, понимать чувства. Притом я открыла новое направление деятельности.",
    author: "Анна Лыкова",
    role: "Выпускник программы по системным расстановкам",
  },
  {
    id: "tamara",
    firstName: "Тамары",
    storyLabel: "История Тамары",
    portrait: "/images/hero/portraits/tamara-ralkova.png?v=4",
    quote:
      "Я открыла свои лидерские качества. Это помогло мне увереннее проявляться при общении с людьми и создало внутреннюю устойчивость и опорность.",
    author: "Тамара Ралькова",
    role: "Выпускник программы по системным расстановкам",
  },
  {
    id: "regina",
    firstName: "Регины",
    storyLabel: "История Регины",
    portrait: "/images/hero/portraits/regina-karimulina.png?v=4",
    quote:
      "На курсе я приобрела важные и уникальные в своей применимости знания и новые инструменты в работе с людьми.",
    author: "Регина Каримулина",
    role: "Выпускник программы по системным расстановкам",
  },
  {
    id: "ekaterina",
    firstName: "Екатерины",
    storyLabel: "История Екатерины",
    portrait: "/images/hero/portraits/ekaterina-skulochenko.png?v=4",
    quote:
      "Я перестала искать опору вовне и нашла её внутри себя. Это дало мне свободу в отношениях и ясность в деле всей моей жизни.",
    author: "Екатерина Скулоченко",
    role: "Выпускник программы по системным расстановкам",
  },
  {
    id: "svetlana-lazarenko",
    firstName: "Светланы",
    storyLabel: "История Светланы",
    portrait: "/images/hero/portraits/svetlana-lazarenko.png?v=4",
    quote:
      "Я спокойнее прохожу через свои страхи и чувствую опору внутри себя! А также стала лучше понимать свои чувства и других людей.",
    author: "Светлана Лазаренко",
    role: "Выпускник программы по системным расстановкам",
  },
];

export const HERO_SLIDE_INTERVAL_MS = 7000;
