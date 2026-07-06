import type { Metadata } from "next";
import { RasstanovochnyeGruppySection } from "@/components/rasstanovochnye-gruppy/RasstanovochnyeGruppySection";

export const metadata: Metadata = {
  title: "Расстановочные группы",
  description: "Очные и онлайн-группы для глубинной работы с личными и системными запросами.",
};

export default function GroupsPage() {
  return <RasstanovochnyeGruppySection />;
}
