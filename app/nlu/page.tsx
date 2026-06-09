import Link from "next/link";
import type { Metadata } from "next";
import { ToolWizard } from "@/components/tools/ToolWizard";

export const metadata: Metadata = { title: "НЛУ" };

const STEPS = [
  "Как вы воспринимаете эту тему на уровне ощущений?",
  "Какие убеждения связаны с этой темой?",
  "Как вы действуете, когда сталкиваетесь с этой темой?",
  "Какие ценности стоят за этой темой?",
];

export default function NluPage() {
  return (
    <section className="py-8 md:py-12">
      <div className="container-site">
        <div className="text-sm text-muted mb-6">
          <Link href="/">Главная</Link> / <Link href="/psychological-help">Психологическая помощь</Link> / НЛУ
        </div>
        <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium m-0 mb-4">НЛУ</h1>
        <p className="text-lg text-muted max-w-[640px] m-0 mb-10">
          Инструмент для исследования уровней восприятия, убеждений, поведения, ценностей и внутренней структуры запроса.
        </p>
        <ToolWizard toolName="НЛУ" steps={STEPS} />
      </div>
    </section>
  );
}
