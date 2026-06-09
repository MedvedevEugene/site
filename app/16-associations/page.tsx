import Link from "next/link";
import type { Metadata } from "next";
import { ToolWizard } from "@/components/tools/ToolWizard";

export const metadata: Metadata = { title: "16 ассоциаций" };

const STEPS = [
  "Какие первые ассоциации возникают с этой темой?",
  "Какие чувства сопровождают эту тему?",
  "Что изменится, если эта тема станет ресурсом?",
  "Какой образ или метафора описывает вашу тему?",
];

export default function SixteenAssociationsPage() {
  return (
    <section className="py-8 md:py-12">
      <div className="container-site">
        <div className="text-sm text-muted mb-6">
          <Link href="/">Главная</Link> / <Link href="/psychological-help">Психологическая помощь</Link> / 16 ассоциаций
        </div>
        <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium m-0 mb-4">16 ассоциаций</h1>
        <p className="text-lg text-muted max-w-[640px] m-0 mb-10">
          Инструмент для исследования скрытых ассоциаций, внутренних смыслов и неочевидных связей вокруг важной темы или запроса.
        </p>
        <ToolWizard toolName="16 ассоциаций" steps={STEPS} />
      </div>
    </section>
  );
}
