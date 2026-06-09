import { PageShell, createPageMetadata } from "@/components/ui/PageShell";

export const metadata = createPageMetadata("Видеоматериалы");

export default function VideoPage() {
  return (
    <PageShell title="Видеоматериалы" description="Записи лекций и практик." breadcrumbs={[{ label: "Видеоматериалы" }]}>
      <p className="text-muted">Раздел в разработке — контент будет перенесён с Tilda.</p>
    </PageShell>
  );
}
