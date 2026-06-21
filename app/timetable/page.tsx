import type { Metadata } from "next";
import { TimetablePageSection } from "@/components/calendar/TimetablePageSection";

export const metadata: Metadata = {
  title: "Расписание",
};

export default function TimetablePage() {
  return <TimetablePageSection />;
};
