import { PageShell, createPageMetadata } from "@/components/ui/PageShell";
import { SITE } from "@/lib/constants";

export const metadata = createPageMetadata("Сведения об образовательной организации");

export default function InfoPage() {
  return (
    <PageShell
      title="Сведения об образовательной организации"
      description={`${SITE.fullName}. Лицензия ${SITE.license}.`}
      breadcrumbs={[{ label: "Сведения об организации" }]}
    >
      <div className="card space-y-4">
        <p><strong>Наименование:</strong> {SITE.fullName}</p>
        <p><strong>Лицензия:</strong> {SITE.license}</p>
        <p><strong>Телефон:</strong> {SITE.phoneAlt}</p>
        <p><strong>Email:</strong> {SITE.email}</p>
      </div>
    </PageShell>
  );
}
