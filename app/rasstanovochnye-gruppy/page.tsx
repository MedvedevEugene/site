import Link from "next/link";
import { PageShell, createPageMetadata } from "@/components/ui/PageShell";
import { FAQ } from "@/components/ui/FAQ";
import { ContactForm } from "@/components/forms/CallbackPopup";

export const metadata = createPageMetadata("Расстановочные группы");

const SECTIONS = [
  { title: "Что такое расстановочная группа", text: "Глубинный формат системной работы с личными и семейными запросами в группе." },
  { title: "Личная работа и участие заместителем", text: "Можно прийти с личным запросом или участвовать как заместитель." },
  { title: "Очные и онлайн-группы", text: "Форматы на выбор — очные встречи или онлайн." },
  { title: "С какими запросами можно прийти", text: "Отношения, семья, деньги, карьера, внутренние конфликты." },
  { title: "Как проходит очный день", text: "Структурированный день с расстановками и перерывами." },
  { title: "Ближайшие даты", text: "Смотрите в разделе расписания или оставьте заявку." },
];

const FAQ_ITEMS = [
  { question: "Нужен ли опыт?", answer: "Нет, можно прийти впервые. Мы поможем с форматом участия." },
  { question: "Онлайн или очно?", answer: "Доступны оба формата — выберите удобный." },
];

export default function GroupsPage() {
  return (
    <>
      <PageShell
        title="Расстановочные группы"
        description="Очные и онлайн-группы для глубинной работы с личными и системными запросами."
        breadcrumbs={[{ label: "Расстановочные группы" }]}
      >
        <div className="grid gap-5 mb-12">
          {SECTIONS.map((s) => (
            <div key={s.title} className="card">
              <h3 className="font-heading text-lg font-medium m-0 mb-2">{s.title}</h3>
              <p className="text-muted m-0">{s.text}</p>
            </div>
          ))}
        </div>
        <FAQ items={FAQ_ITEMS} />
      </PageShell>
      <section className="section-cream">
        <div className="container-site">
          <div className="bg-gradient-to-br from-primary to-[#5a5478] rounded-[20px] p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 text-white">
            <div>
              <h2 className="font-heading text-[28px] m-0 mb-3">Записаться в группу</h2>
              <p className="opacity-90 m-0">Оставьте контакты — расскажем о формате и ближайших датах.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
