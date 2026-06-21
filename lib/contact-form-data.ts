export type ContactMethod = "phone" | "telegram" | "whatsapp" | "max";

export const CONTACT_METHODS: { id: ContactMethod; label: string; icon: string }[] = [
  { id: "phone", label: "Телефон", icon: "/images/forms/contact-methods/phone.svg" },
  { id: "telegram", label: "Telegram", icon: "/images/forms/contact-methods/telegram.svg" },
  { id: "whatsapp", label: "WhatsApp", icon: "/images/forms/contact-methods/whatsapp.svg" },
  { id: "max", label: "Max", icon: "/images/forms/contact-methods/max.svg" },
];

export const CONTACT_METHOD_PLACEHOLDERS: Record<ContactMethod, string | null> = {
  phone: null,
  telegram: "Username или номер телефона",
  whatsapp: null,
  max: "Ссылка или телефон",
};
