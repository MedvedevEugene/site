import Link from "next/link";
import Image from "next/image";

export interface SpecialistCardData {
  slug: string;
  name: string;
  role: string;
  photoUrl: string;
}

export function SpecialistCard({ specialist }: { specialist: SpecialistCardData }) {
  return (
    <div className="specialist-card">
      <div className="relative aspect-[3/4]">
        <Image
          src={specialist.photoUrl}
          alt={specialist.name}
          fill
          className="object-cover object-top"
          sizes="240px"
        />
      </div>
      <div className="p-5 -mt-8 relative z-10 mx-3 mb-3 bg-white rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <p className="font-semibold text-sm m-0 mb-1">{specialist.name}</p>
        <p className="text-xs text-muted m-0 mb-4 leading-snug min-h-[48px]">{specialist.role}</p>
        <div className="flex flex-col gap-2">
          <Link href="/individual-consultations#quiz" className="btn btn-primary-solid text-[10px] py-2.5 w-full justify-center">
            Запись
          </Link>
          <Link href={`/teachers/${specialist.slug}`} className="btn btn-outline text-[10px] py-2.5 w-full justify-center">
            О специалисте
          </Link>
        </div>
      </div>
    </div>
  );
}
