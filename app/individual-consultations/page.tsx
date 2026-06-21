import type { Metadata } from "next";
import { IndividualConsultationsSection } from "@/components/individual-consultations/IndividualConsultationsSection";

export const metadata: Metadata = {
  title: "Индивидуальные консультации",
};

export default function IndividualConsultationsPage() {
  return <IndividualConsultationsSection />;
}
