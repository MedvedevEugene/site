const CYRILLIC = /[А-Яа-яЁё]/;
const RUSSIAN_HEADING = /^##\s+[А-Яа-яЁё]/;

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

export function normalizeAiReport(text: string) {
  return trimPreambleBeforeReport(stripReasoningBlocks(text)).trim();
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
  return filled.length >= minSectionsWithBody;
}

/** Для UI: показываем только разделы с текстом; если таких нет — все. */
export function filterDisplaySections(text: string): ReportSection[] {
  const sections = parseReportSections(text);
  const withBody = sections.filter((section) => section.body.length > 0);
  return withBody.length > 0 ? withBody : sections;
}
