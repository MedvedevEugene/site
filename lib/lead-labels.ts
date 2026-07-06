export type LeadStatus = "new" | "in_progress" | "done" | "spam";

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Новая",
  in_progress: "В работе",
  done: "Завершена",
  spam: "Спам",
};

export const LEAD_TYPE_LABELS: Record<string, string> = {
  callback: "Обратный звонок",
  lead: "Заявка с сайта",
  "consultation-quiz": "Квиз консультации",
  "advanced-course": "Продвинутый курс",
  "constellation-groups": "Расстановки",
  "program-selection": "Подбор программы",
  "base-course": "Базовый курс",
  "business-course": "Бизнес-курс",
};

export function leadTypeLabel(type: string) {
  return LEAD_TYPE_LABELS[type] || type;
}
