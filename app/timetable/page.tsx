import Link from "next/link";
import type { Metadata } from "next";
import { TimetableCalendar } from "@/components/calendar/TimetableCalendar";

export const metadata: Metadata = {
  title: "Расписание",
};

export default function TimetablePage() {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container-site">
        <div className="text-sm text-muted mb-6">
          <Link href="/">Главная</Link> / Расписание
        </div>
        <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium m-0 mb-4">Расписание</h1>
        <p className="text-lg text-muted max-w-[640px] m-0 mb-10">
          В этом разделе вы найдёте расписание всех наших программ, занятий и групп — выберите подходящее время, чтобы присоединиться.
        </p>
        <TimetableCalendar />
        <p className="text-sm text-muted mt-6 m-0">
          События добавляются через админ-панель — без программиста.
        </p>
      </div>
    </section>
  );
}
