import { IC_SPECIALISTS } from "@/lib/individual-consultations-data";

export type SpecialistCarouselItem = {
  slug: string;
  name: string;
  role: string;
  photo: string;
};

export function resolveSpecialistsForCarousel(
  db: { slug: string; name: string; role: string; photoUrl: string }[]
): SpecialistCarouselItem[] {
  if (db.length > 0) {
    return db.map((s) => ({
      slug: s.slug,
      name: s.name,
      role: s.role,
      photo: s.photoUrl,
    }));
  }

  return IC_SPECIALISTS.map((s) => ({ ...s }));
}
