const CYRILLIC = /[А-Яа-яЁё]/;
const RUSSIAN_HEADING = /^##\s+[А-Яа-яЁё]/;
const LATIN_WORD = /\b[a-zA-Z][a-zA-Z'-]{1,}\b/g;

/** Частые английские вкрапления в ответах free-моделей. */
const EN_TO_RU: Record<string, string> = {
  and: "и",
  or: "или",
  the: "",
  a: "",
  an: "",
  is: "",
  are: "",
  was: "",
  were: "",
  be: "",
  been: "",
  being: "",
  have: "",
  has: "",
  had: "",
  do: "",
  does: "",
  did: "",
  will: "",
  would: "",
  could: "",
  should: "",
  may: "",
  might: "",
  must: "",
  can: "",
  need: "",
  to: "",
  of: "",
  in: "",
  for: "",
  on: "",
  with: "",
  at: "",
  by: "",
  from: "",
  as: "",
  into: "",
  through: "",
  during: "",
  before: "",
  after: "",
  between: "между",
  under: "под",
  again: "снова",
  then: "тогда",
  once: "однажды",
  not: "не",
  no: "нет",
  yes: "",
  all: "все",
  any: "любой",
  some: "некоторые",
  more: "больше",
  most: "",
  other: "другой",
  such: "такой",
  only: "только",
  own: "собственный",
  same: "тот же",
  than: "чем",
  too: "тоже",
  very: "очень",
  just: "просто",
  also: "также",
  about: "о",
  like: "как",
  make: "делать",
  made: "сделанный",
  take: "брать",
  get: "получать",
  go: "идти",
  come: "приходить",
  see: "",
  know: "знать",
  think: "думать",
  want: "хотеть",
  use: "использовать",
  find: "находить",
  give: "",
  tell: "говорить",
  work: "работа",
  call: "",
  try: "пробовать",
  ask: "спрашивать",
  feel: "чувствовать",
  leave: "оставлять",
  put: "",
  mean: "означать",
  keep: "сохранять",
  let: "",
  begin: "начинать",
  seem: "казаться",
  help: "помогать",
  show: "показывать",
  hear: "слышать",
  play: "",
  run: "",
  move: "двигаться",
  live: "жить",
  believe: "верить",
  hold: "держать",
  bring: "приносить",
  happen: "происходить",
  write: "писать",
  provide: "обеспечивать",
  sit: "",
  stand: "",
  lose: "терять",
  pay: "платить",
  meet: "встречать",
  include: "включать",
  continue: "продолжать",
  set: "",
  learn: "учиться",
  change: "менять",
  lead: "вести",
  understand: "понимать",
  watch: "наблюдать",
  follow: "следовать",
  stop: "останавливаться",
  create: "создавать",
  speak: "говорить",
  read: "читать",
  allow: "позволять",
  add: "добавлять",
  spend: "тратить",
  grow: "расти",
  open: "открывать",
  walk: "ходить",
  win: "побеждать",
  offer: "предлагать",
  remember: "помнить",
  love: "любить",
  consider: "рассматривать",
  appear: "появляться",
  buy: "покупать",
  wait: "ждать",
  serve: "служить",
  die: "",
  send: "отправлять",
  expect: "ожидать",
  build: "строить",
  stay: "оставаться",
  fall: "падать",
  cut: "резать",
  reach: "достигать",
  kill: "",
  remain: "оставаться",
  suggest: "предлагать",
  raise: "поднимать",
  pass: "проходить",
  sell: "продавать",
  require: "требовать",
  report: "сообщать",
  decide: "решать",
  pull: "тянуть",
  maybe: "возможно",
  perhaps: "возможно",
  however: "однако",
  therefore: "поэтому",
  because: "потому что",
  although: "хотя",
  while: "пока",
  when: "когда",
  where: "где",
  which: "который",
  who: "кто",
  what: "что",
  how: "как",
  why: "почему",
  here: "здесь",
  there: "там",
  now: "сейчас",
  today: "сегодня",
  always: "всегда",
  never: "никогда",
  often: "часто",
  sometimes: "иногда",
  usually: "обычно",
  already: "уже",
  still: "всё ещё",
  yet: "ещё",
  even: "даже",
  well: "хорошо",
  back: "назад",
  down: "вниз",
  up: "вверх",
  out: "",
  over: "над",
  off: "",
  away: "прочь",
  level: "уровень",
  levels: "уровни",
  topic: "тема",
  success: "успех",
  resource: "ресурс",
  resources: "ресурсы",
  hypothesis: "гипотеза",
  hypotheses: "гипотезы",
  strategy: "стратегия",
  strategies: "стратегии",
  behavior: "поведение",
  beliefs: "убеждения",
  belief: "убеждение",
  values: "ценности",
  value: "ценность",
  identity: "идентичность",
  balance: "баланс",
  definitive: "окончательными",
  definitely: "определённо",
  important: "важный",
  possible: "возможный",
  internal: "внутренний",
  external: "внешний",
  emotional: "эмоциональный",
  physical: "физический",
  mental: "ментальный",
  personal: "личный",
  professional: "профессиональный",
  relationship: "отношения",
  relationships: "отношения",
  conflict: "конфликт",
  conflicts: "конфликты",
  pattern: "паттерн",
  patterns: "паттерны",
  insight: "инсайт",
  insights: "инсайты",
  self: "самость",
  exploration: "исследование",
  duels: "дуэлями",
  duel: "дуэлью",
  rest: "отдыхом",
  competition: "соревнованием",
  competitions: "соревнованиями",
  achievement: "достижением",
  achievements: "достижениями",
  victory: "победой",
  victories: "победами",
  prize: "призом",
  prizes: "призами",
  pain: "болью",
  joy: "радостью",
};

const ALLOWED_LATIN = new Set(["nlu", "nlp", "izhsiz", "irzh"]);

export type ReportSection = {
  title: string;
  body: string;
};

/** Убирает блоки «размышлений» из ответа reasoning-моделей. */
export function stripReasoningBlocks(text: string) {
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, "")
    .trim();
}

/** Отрезает английский преамбул перед первым русским заголовком ##. */
export function trimPreambleBeforeReport(text: string) {
  const lines = text.split("\n");
  const startIdx = lines.findIndex((line) => RUSSIAN_HEADING.test(line.trim()));
  if (startIdx <= 0) return text;
  return lines.slice(startIdx).join("\n");
}

function cleanupSpacing(text: string) {
  return text
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/([(\[])\s+/g, "$1")
    .replace(/\s+([)\]])/g, "$1")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Заменяет или убирает латинские слова из русского текста. */
export function stripLatinWords(text: string) {
  return cleanupSpacing(
    text.replace(LATIN_WORD, (word) => {
      const key = word.toLowerCase();
      if (ALLOWED_LATIN.has(key)) return word;
      if (EN_TO_RU[key] !== undefined) return EN_TO_RU[key];
      return "";
    })
  );
}

export function hasResidualLatin(text: string) {
  const matches = text.match(LATIN_WORD) || [];
  return matches.some((word) => !ALLOWED_LATIN.has(word.toLowerCase()));
}

export function normalizeAiReport(text: string) {
  return stripLatinWords(trimPreambleBeforeReport(stripReasoningBlocks(text)));
}

export function parseReportSections(text: string): ReportSection[] {
  return text
    .split(/(?=^##\s+)/m)
    .filter(Boolean)
    .map((section) => {
      const lines = section.trim().split("\n");
      const title = lines[0]?.replace(/^##\s+/, "").trim() || "";
      const body = lines.slice(1).join("\n").trim();
      return { title, body };
    });
}

/** Разбор считается валидным, если есть несколько разделов с русским текстом. */
export function isValidAiReport(text: string, minSectionsWithBody = 3) {
  const sections = parseReportSections(text);
  if (sections.length === 0) return false;

  const filled = sections.filter(
    (section) => section.body.length >= 40 && CYRILLIC.test(section.body)
  );
  return filled.length >= minSectionsWithBody && !hasResidualLatin(text);
}

/** Для UI: показываем только разделы с текстом; если таких нет — все. */
export function filterDisplaySections(text: string): ReportSection[] {
  const sections = parseReportSections(text);
  const withBody = sections.filter((section) => section.body.length > 0);
  return withBody.length > 0 ? withBody : sections;
}
