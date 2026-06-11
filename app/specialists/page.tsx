import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedSpecialists } from "@/lib/content";
import { SpecialistCard } from "@/components/specialists/SpecialistCard";

export const metadata: Metadata = {
  title: "Специалисты ИЖСИЗ",
  description: "Наши специалисты — расстановщики и терапевты института",
};

export const dynamic = "force-dynamic";

const FALLBACK = [
  {
    slug: "asya-bykovskaya",
    name: "Ася Быковская",
    role: "Руководитель института, преподаватель, расстановщик, терапевт",
    photoUrl: "https://static.tildacdn.com/tild3962-6236-4536-a463-663630633963/8B7A2059_1.png",
  },
];

export default async function SpecialistsPage() {
  const dbSpecialists = await getPublishedSpecialists();
  const specialists =
    dbSpecialists.length > 0
      ? dbSpecialists.map((s) => ({
          slug: s.slug,
          name: s.name,
          role: s.role,
          photoUrl: s.photoUrl,
        }))
      : FALLBACK;

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container-site">
        <div className="text-sm text-muted mb-6">
          <Link href="/">Главная</Link> / Специалисты
        </div>
        <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium m-0 mb-4">
          Специалисты ИЖСИЗ
        </h1>
        <p className="text-lg text-muted max-w-[720px] m-0 mb-10">
          Расстановщики и терапевты института. Выберите специалиста под ваш запрос или пройдите короткий квиз на странице консультаций.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {specialists.map((s) => (
            <SpecialistCard key={s.slug} specialist={s} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/individual-consultations#quiz" className="btn btn-primary-solid">
            Подобрать специалиста
          </Link>
        </div>
      </div>
    </section>
  );
}
