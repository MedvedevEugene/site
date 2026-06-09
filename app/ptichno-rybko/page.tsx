import Link from "next/link";
import type { Metadata } from "next";
import { ToolWizard } from "@/components/tools/ToolWizard";

export const metadata: Metadata = { title: "Инсайтограф" };

const STEPS = [
  "Если [причина A], то что происходит с вашей темой?",
  "Если ваша тема есть, то какие последствия?",
  "Из каких частей складывается это понятие/состояние?",
  "По каким критериям вы поймёте, что тема присутствует?",
  "Что такое же важное и ценное, как и ваша тема?",
];

export default function InsightographPage() {
  return (
    <section className="py-8 md:py-12">
      <div className="container-site">
        <div className="text-sm text-muted mb-6">
          <Link href="/">Главная</Link> / <Link href="/psychological-help">Психологическая помощь</Link> / Инсайтограф
        </div>
        <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium m-0 mb-4">Инсайтограф</h1>
        <p className="text-lg text-muted max-w-[640px] m-0 mb-10">
          Авторский инструмент для выявления внутренних ограничений, связей, причин, последствий и скрытых убеждений вокруг выбранной темы.
        </p>
        <ToolWizard toolName="Инсайтограф" steps={STEPS} />
      </div>
    </section>
  );
}
