import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { InsightographWizard } from "@/components/tools/InsightographWizard";

export const metadata: Metadata = { title: "Инсайтограф" };

export default function InsightographPage() {
  return (
    <ToolShell
      title="Инсайтограф"
      description="Интерактивная карта убеждений: причины, последствия, состав, критерии и ценностные связи вокруг выбранной темы. ИИ-разбор — бесплатно на этапе тестирования."
    >
      <InsightographWizard />
    </ToolShell>
  );
}
