import { PageShell, createPageMetadata } from "@/components/ui/PageShell";

export const metadata = createPageMetadata("Маркет");

export default function MarketPage() {
  return (
    <PageShell title="Маркет развивающих товаров" description="Материалы и товары для развития." breadcrumbs={[{ label: "Маркет" }]}>
      <p className="text-muted">Раздел в разработке — контент будет перенесён с Tilda.</p>
    </PageShell>
  );
}
