import type { Metadata } from "next";
import { IndividualConsultationsSection } from "@/components/individual-consultations/IndividualConsultationsSection";
import { getSpecialistDisplayRecords } from "@/lib/content";
import { resolveSpecialistsForCarousel } from "@/lib/specialists-display";

export const metadata: Metadata = {
  title: "Индивидуальные консультации",
};

export const dynamic = "force-dynamic";

export default async function IndividualConsultationsPage() {
  const specialists = resolveSpecialistsForCarousel(await getSpecialistDisplayRecords());
  return <IndividualConsultationsSection specialists={specialists} />;
}
