import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { SixteenAssociationsWizard } from "@/components/tools/SixteenAssociationsWizard";

export const metadata: Metadata = { title: "16 ассоциаций" };

export default function SixteenAssociationsPage() {
  return (
    <ToolShell
      title="16 ассоциаций"
      description="Постройте ассоциативную цепочку от 16 слов до одного ключевого смысла. Сохраните результат по ссылке и получите ИИ-разбор — бесплатно на этапе тестирования."
    >
      <SixteenAssociationsWizard />
    </ToolShell>
  );
}
