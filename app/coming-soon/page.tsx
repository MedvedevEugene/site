import { PageShell, createPageMetadata } from "@/components/ui/PageShell";

export const metadata = createPageMetadata("Информация");

export default function ComingSoonPage() {
  return (
    <PageShell
      title="Информация"
      description="Данные будут добавлены позже. Спасибо за понимание."
    />
  );
}
