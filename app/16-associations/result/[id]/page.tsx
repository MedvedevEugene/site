import { ToolShell } from "@/components/tools/ToolShell";
import { AssociationResultView } from "@/components/tools/AssociationResultView";
import { createPageMetadata } from "@/components/ui/PageShell";

export const metadata = createPageMetadata("16 ассоциаций — результат");

export default async function AssociationResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <ToolShell
      title="Результат: 16 ассоциаций"
      description="Сохранённая карта ассоциаций и ИИ-разбор."
    >
      <AssociationResultView sessionId={id} />
    </ToolShell>
  );
}
