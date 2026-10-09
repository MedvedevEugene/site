import { SPECIALIST_PROFILES, getDefaultSpecialist, type SpecialistProfile } from "./specialists-data";
export type SpecialistCarouselItem = SpecialistProfile;
type SpecialistRecord = { slug: string; name: string; role: string; photoUrl: string; bio?: string | null; services?: string[]; published?: boolean };
export function resolveSpecialist(s: SpecialistRecord): SpecialistProfile {
  const fallback = getDefaultSpecialist(s.slug);
  return {
    slug: s.slug,
    name: fallback?.name ?? s.name,
    role: fallback?.role ?? s.role,
    photo: s.photoUrl && !s.photoUrl.startsWith("/images/site/") ? s.photoUrl : fallback?.photo ?? (s.photoUrl || null),
    tags: fallback?.tags ?? s.role.split(/[,;]+/).map(t=>t.trim()).filter(Boolean),
    summary: fallback?.summary ?? s.bio ?? s.role,
    bio: s.bio || fallback?.bio || "",
    services: s.services?.length ? s.services : fallback?.services ?? [],
  };
}
export function resolveSpecialistsForCarousel(db: SpecialistRecord[]): SpecialistCarouselItem[] {
  const bySlug = new Map(db.map(s=>[s.slug,s]));
  const defaults = SPECIALIST_PROFILES.flatMap(s=>{
    const record=bySlug.get(s.slug);
    if(record?.published === false) return [];
    return [record ? resolveSpecialist(record) : s];
  });
  return [...defaults, ...db.filter(s=>s.published !== false && !SPECIALIST_PROFILES.some(p=>p.slug===s.slug)).map(resolveSpecialist)];
}
