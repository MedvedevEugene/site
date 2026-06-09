import Link from "next/link";
import { PageShell, createPageMetadata } from "@/components/ui/PageShell";
import { ContactForm } from "@/components/forms/CallbackPopup";

export const metadata = createPageMetadata("Базовый курс по расстановкам");

const TARIFFS = [
  {
    name: "Тариф 1",
    desc: "Базовая программа обучения семейным расстановкам. Тексты и детали — по согласованию с заказчиком.",
    features: ["777 часов", "10 месяцев", "Диплом о переподготовке", "Практика с первых дней"],
  },
  {
    name: "Тариф 2",
    desc: "Расширенная программа с дополнительным сопровождением. Тексты — по согласованию с заказчиком.",
    features: ["777 часов", "10 месяцев", "Сонаставники", "Центр продаж"],
  },
];

export default function BaseCoursePage() {
  return (
    <>
      <PageShell
        title="Базовый курс обучения семейным расстановкам"
        description="Профессиональная переподготовка по методу ИЖСИЗ. 777 часов, 10 месяцев. Обучение по государственной лицензии."
        breadcrumbs={[{ label: "Базовый курс" }]}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {TARIFFS.map((t) => (
            <div key={t.name} className="card">
              <h3 className="font-heading text-xl font-medium m-0 mb-3">{t.name}</h3>
              <p className="text-muted text-[15px] m-0 mb-4">{t.desc}</p>
              <ul className="text-sm m-0 pl-5 mb-6 space-y-1">
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link href="#contact" className="btn btn-primary">Записаться</Link>
            </div>
          ))}
        </div>

        <h2 className="section-title text-left mb-8">Преподаватели</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {["Ася Быковская", "Светлана Елистратова", "Регина Каримулина"].map((name) => (
            <Link key={name} href={`/teachers/${name.toLowerCase().replace(/\s/g, "-")}`} className="card hover:border-primary">
              <h3 className="font-heading text-base font-medium m-0 mb-2">{name}</h3>
              <span className="text-sm text-muted">Подробнее →</span>
            </Link>
          ))}
        </div>
      </PageShell>

      <section className="section-cream" id="contact">
        <div className="container-site">
          <div className="bg-gradient-to-br from-primary to-[#5a5478] rounded-[20px] p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center text-white">
            <div>
              <h2 className="font-heading text-[28px] m-0 mb-3">Записаться на базовый курс</h2>
              <p className="opacity-90 m-0">Оставьте заявку — мы свяжемся и расскажем о ближайшем наборе.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
