import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { NluWizard } from "@/components/tools/NluWizard";

export const metadata: Metadata = { title: "НЛУ ИЖСИЗ" };

export default function NluPage() {
  return (
    <ToolShell
      title="НЛУ ИЖСИЗ"
      description="Исследование запроса на уровнях ощущений, убеждений, поведения и ценностей. ИИ-разбор придёт на ваш email."
    >
      <NluWizard />
    </ToolShell>
  );
}
