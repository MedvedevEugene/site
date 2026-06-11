import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell, createPageMetadata } from "@/components/ui/PageShell";
import { ContactForm } from "@/components/forms/CallbackPopup";
import { getSpecialistBySlug } from "@/lib/content";

const FALLBACK: Record<string, { name: string; role: string; photo: string; bio: string; services: string[] }> = {
  "asya-bykovskaya": {
    name: "Ася Быковская",
    role: "Руководитель института, преподаватель, расстановщик, терапевт",
    photo: "https://static.tildacdn.com/tild3962-6236-4536-a463-663630633963/8B7A2059_1.png",
    bio: "Руководитель института. Ведёт обучение расстановкам и личную практику.",
    services: ["Обучение расстановкам", "Психологическое консультирование", "Телесные практики"],
  },
  "svetlana-elistratova": {
    name: "Светлана Елистратова",
    role: "Заместитель учебной части, преподаватель",
    photo: "https://static.tildacdn.com/tild3465-3034-4232-b531-666636393961/c_1.jpg",
    bio: "Преподаватель базового курса, расстановщик.",
    services: ["Обучение расстановкам", "Психологическое консультирование"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = await getSpecialistBySlug(slug);
  const fallback = FALLBACK[slug];
  return createPageMetadata(db?.name || fallback?.name || "Специалист");
}

export default async function TeacherPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = await getSpecialistBySlug(slug);
  const fallback = FALLBACK[slug];

  const teacher = db
    ? {
        name: db.name,
        role: db.role,
        photo: db.photoUrl,
        bio: db.bio || "",
        services: db.services,
      }
    : fallback;

  if (!teacher) notFound();

  return (
    <>
      <PageShell
        title={teacher.name}
        description={teacher.role}
        breadcrumbs={[{ label: "Специалисты", href: "/specialists" }, { label: teacher.name }]}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          <Image src={teacher.photo} alt={teacher.name} width={280} height={360} className="w-full rounded-[20px] object-cover aspect-[3/4]" />
          <div>
            {teacher.bio && <p className="text-muted mb-6">{teacher.bio}</p>}
            {teacher.services.length > 0 && (
              <>
                <h3 className="font-heading text-lg font-medium mb-3">С чем и как работает</h3>
                <ul className="mb-6 pl-5 space-y-1">
                  {teacher.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </>
            )}
            <Link href="#contact" className="btn btn-primary">Записаться к специалисту</Link>
          </div>
        </div>
      </PageShell>
      <section className="section-cream" id="contact">
        <div className="container-site max-w-xl">
          <div className="bg-gradient-to-br from-primary to-[#5a5478] rounded-[20px] p-10 text-white">
            <ContactForm title={`Запись к ${teacher.name}`} />
          </div>
        </div>
      </section>
    </>
  );
}
