export type CallbackPopupVariantId = "default" | "advanced-course" | "constellation-groups";

export interface CallbackPopupVariant {
  id: CallbackPopupVariantId;
  title: string;
  ariaLabel: string;
  submitLabel: string;
  formType: string;
  paragraphs: string[];
}

export const CALLBACK_POPUP_VARIANTS: Record<CallbackPopupVariantId, CallbackPopupVariant> = {
  default: {
    id: "default",
    title: "Задайте нам вопрос",
    ariaLabel: "Задайте нам вопрос",
    submitLabel: "Заказать обратный звонок",
    formType: "callback",
    paragraphs: [],
  },
  "advanced-course": {
    id: "advanced-course",
    title: "Продолжите развитие в профессии",
    ariaLabel: "Продолжите развитие в профессии",
    submitLabel: "Получить информацию",
    formType: "advanced-course",
    paragraphs: [
      "Мы формируем следующий поток для специалистов, которые хотят углубить практику системных расстановок, работать со сложными запросами и расширить профессиональный инструментарий.",
      "Оставьте заявку, чтобы получить подробности и приглашение на ближайший набор.",
    ],
  },
  "constellation-groups": {
    id: "constellation-groups",
    title: "Узнайте о ближайших расстановочных группах",
    ariaLabel: "Узнайте о ближайших расстановочных группах",
    submitLabel: "Узнать подробности",
    formType: "constellation-groups",
    paragraphs: [
      "Расстановочные группы проходят в течение всего года в очном и онлайн-формате. Количество мест в каждой группе ограничено, оставьте контакты, и мы свяжемся с вами, расскажем о формате участия и ответим на ваши вопросы.",
    ],
  },
};

export const DEFAULT_CALLBACK_POPUP_VARIANT = CALLBACK_POPUP_VARIANTS.default;
