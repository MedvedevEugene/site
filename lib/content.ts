import { prisma } from "@/lib/db";
import { withDbTimeout } from "@/lib/db-timeout";

export async function getMediaUrl(key: string, fallback: string) {
  const item = await withDbTimeout(
    () => prisma.mediaItem.findUnique({ where: { key } }),
    null,
  );
  return item?.url || fallback;
}

/** Загружает несколько ключей медиа за один запрос (для страниц с несколькими фото). */
export async function getMediaMap(fallbacks: Record<string, string>) {
  const keys = Object.keys(fallbacks);
  const result = { ...fallbacks };

  const items = await withDbTimeout(
    () => prisma.mediaItem.findMany({ where: { key: { in: keys } } }),
    [],
  );

  for (const item of items) {
    result[item.key] = item.url;
  }

  return result;
}

export async function getPublishedTariffs(group: string) {
  return withDbTimeout(
    () =>
      prisma.tariff.findMany({
        where: { published: true, group },
        orderBy: { sortOrder: "asc" },
      }),
    [],
  );
}

export async function getPublishedNews() {
  return withDbTimeout(
    () =>
      prisma.newsPost.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
      }),
    [],
  );
}

export async function getPublishedSpecialists() {
  return withDbTimeout(
    () =>
      prisma.specialist.findMany({
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      }),
    [],
  );
}

export async function getSpecialistBySlug(slug: string) {
  return withDbTimeout(
    () => prisma.specialist.findFirst({ where: { slug, published: true } }),
    null,
  );
}
