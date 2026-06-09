import Link from "next/link";
import type { Metadata } from "next";
import { CALENDAR_EMBED_MONTH } from "@/lib/site-data";

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
        <div className="rounded-[20px] border border-border overflow-hidden bg-white h-[600px]">
          <iframe
            title="Календарь ИЖСИЗ"
            src={CALENDAR_EMBED_MONTH}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
