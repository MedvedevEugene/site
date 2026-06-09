import Link from "next/link";
import { PageShell, createPageMetadata } from "@/components/ui/PageShell";
import { ContactForm } from "@/components/forms/CallbackPopup";

export const metadata = createPageMetadata("Телесно-ориентированная терапия");

const SECTIONS = [
  "С какими состояниями и запросами можно прийти",
  "Основные направления телесной работы",
  "Добаюкивание (детское, семейное, полный цикл)",
  "Пеленание",
  "Телесные правки",
  "Телесно-ориентированная терапия и консультация",
  "Как проходит встреча",
  "Специалист / ведущий практик",
  "Стоимость и запись",
];

export default function BodyTherapyPage() {
  return (
    <>
      <PageShell
        title="Телесно-ориентированная терапия"
        description="Практики, направленные на работу с телом, напряжением, внутренним состоянием и восстановлением ресурса."
        breadcrumbs={[{ label: "Телесная терапия" }]}
      >
        <div className="grid gap-4 mb-10">
          {SECTIONS.map((title) => (
            <div key={title} className="card py-5">
              <h3 className="font-heading text-base font-medium m-0">{title}</h3>
            </div>
          ))}
        </div>
        <Link href="#contact" className="btn btn-primary">Записаться</Link>
      </PageShell>
      <section className="section-cream" id="contact">
        <div className="container-site">
          <div className="bg-gradient-to-br from-primary to-[#5a5478] rounded-[20px] p-12 max-w-xl text-white">
            <ContactForm title="Запись на телесную практику" />
          </div>
        </div>
      </section>
    </>
  );
}
