import type { Metadata } from "next";
import { TeleseTerapiyaSection } from "@/components/telese-terapiya/TeleseTerapiyaSection";

export const metadata: Metadata = {
  title: "Телесно-ориентированная терапия",
  description: "Практики добаюкивания, пеленания и телесных правок для работы с телом и внутренним состоянием.",
};

export default function BodyTherapyPage() {
  return <TeleseTerapiyaSection />;
}
