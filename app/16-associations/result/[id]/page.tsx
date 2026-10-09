import Link from "next/link";
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
    <section className="py-8 md:py-12">
      <div className="container-site">
        <nav className="text-sm text-muted mb-6" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link> /{" "}
          <Link href="/16-associations">16 ассоциаций</Link> / Результат
        </nav>
        <AssociationResultView sessionId={id} />
      </div>
    </section>
  );
}
