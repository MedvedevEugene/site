import Link from "next/link";
import { PageShell, createPageMetadata } from "@/components/ui/PageShell";
import { SafeImage } from "@/components/ui/SafeImage";
import { PROGRAMS } from "@/lib/constants";

export const metadata = createPageMetadata("Каталог услуг");

export default function CatalogPage() {
  return (
    <PageShell
      title="Каталог психологических услуг"
      description="Все форматы помощи и обучения в одном месте."
      breadcrumbs={[{ label: "Каталог" }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PROGRAMS.map((p) => (
          <Link key={p.href} href={p.href} className="card flex gap-5 items-start hover:border-primary">
            <SafeImage src={p.icon} alt="" width={80} height={80} className="w-20 h-20 rounded-xl object-cover shrink-0" />
            <div>
              <div className="text-[13px] text-muted mb-1">{p.meta}</div>
              <h3 className="font-heading text-base font-medium m-0">{p.title}</h3>
            </div>
          </Link>
        ))}
        <Link href="/telese-terapiya" className="card hover:border-primary">
          <h3 className="font-heading text-base font-medium m-0 mb-2">Телесно-ориентированная терапия</h3>
          <p className="text-sm text-muted m-0">Заменяет «Продвинутый курс» в навигации</p>
        </Link>
      </div>
    </PageShell>
  );
}
