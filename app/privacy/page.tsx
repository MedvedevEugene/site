import { PageShell, createPageMetadata } from "@/components/ui/PageShell";

export const metadata = createPageMetadata("Политика конфиденциальности");

export default function PrivacyPage() {
  return (
    <PageShell title="Политика конфиденциальности" description="Обработка персональных данных на сайте ИЖСИЗ.">
      <div className="card prose max-w-none">
        <p className="text-muted">Текст политики будет перенесён с текущего сайта lifeinstitute.ru.</p>
      </div>
    </PageShell>
  );
}
