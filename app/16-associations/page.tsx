import type { Metadata } from "next";
import { SixteenAssociationsExperience } from "@/components/tools/SixteenAssociationsExperience";
export const metadata: Metadata = { title: "16 ассоциаций" };
export default function SixteenAssociationsPage() {
  return <SixteenAssociationsExperience />;
}
