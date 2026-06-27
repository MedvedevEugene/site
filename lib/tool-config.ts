export const INSIGHTOGRAPH_BLOCKS = [
  {
    id: "causes",
    title: "Причины",
    formula: "Если [ввод], то появляется [П/С/О]",
    hints: ["что должно произойти", "условия", "семейные установки"],
  },
  {
    id: "consequences",
    title: "Последствия",
    formula: "Если есть [П/С/О], то [ввод]",
    hints: ["что изменится", "что станет возможным или опасным", "что приобретёте или потеряете"],
  },
  {
    id: "composition",
    title: "Состав",
    formula: "[П/С/О] состоит из [ввод]",
    hints: ["из каких частей складывается", "без чего перестаёт быть собой"],
  },
  {
    id: "criteria",
    title: "Критерии",
    formula: "Я понимаю, что есть [П/С/О], когда [ввод]",
    hints: ["внешние и внутренние признаки", "поведение окружающих"],
  },
  {
    id: "values",
    title: "Ценностные связи",
    formula: "[П/С/О] = / связано с / является частью [значение]",
    hints: ["ради чего это важно", "какие глубинные ценности стоят за этим"],
  },
] as const;

export const NLU_LEVELS = [
  {
    id: "sensory",
    title: "Уровень ощущений",
    question: "Что вы чувствуете в теле и эмоциях, когда думаете об этой теме?",
    hints: ["ощущения в теле", "эмоции", "энергия"],
  },
  {
    id: "beliefs",
    title: "Уровень убеждений",
    question: "Какие мысли и убеждения связаны с этой темой?",
    hints: ["внутренний голос", "установки", "смыслы"],
  },
  {
    id: "behavior",
    title: "Уровень поведения",
    question: "Как вы действуете, когда сталкиваетесь с этой темой?",
    hints: ["привычные реакции", "стратегии", "паттерны"],
  },
  {
    id: "values",
    title: "Уровень ценностей",
    question: "Какие ценности и идентичность стоят за этой темой?",
    hints: ["что для вас важно", "кто вы в этой теме", "к чему стремитесь"],
  },
] as const;

export function emptyFields(n = 3) {
  return Array(n).fill("");
}

export function filledFields(values: string[]) {
  return values.map((v) => v.trim()).filter(Boolean);
}

export function pairWords(words: string[]) {
  const pairs: [string, string][] = [];
  for (let i = 0; i < words.length; i += 2) {
    pairs.push([words[i] || "", words[i + 1] || ""]);
  }
  return pairs;
}
