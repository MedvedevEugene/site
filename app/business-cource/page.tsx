import Link from "next/link";
import { PageShell, createPageMetadata } from "@/components/ui/PageShell";
import { ContactForm } from "@/components/forms/CallbackPopup";

export const metadata = createPageMetadata("Курс бизнес-расстановок");

export default function BusinessCoursePage() {
  return (
    <>
      <PageShell
        title="Курс обучения бизнес-расстановкам"
        description="6 месяцев, 400 часов. Для предпринимателей, специалистов и руководителей."
        breadcrumbs={[{ label: "Бизнес-курс" }]}
      >
        <Link href="#contact" className="btn btn-primary">Получить информацию</Link>
      </PageShell>
      <section className="section-cream" id="contact">
        <div className="container-site">
          <div className="bg-gradient-to-br from-primary to-[#5a5478] rounded-[20px] p-12 max-w-xl text-white">
            <ContactForm title="Заявка на бизнес-курс" />
          </div>
        </div>
      </section>
    </>
  );
}
