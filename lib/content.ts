import { prisma } from "@/lib/db";

export async function getMediaUrl(key: string, fallback: string) {
  try {
    const item = await prisma.mediaItem.findUnique({ where: { key } });
    return item?.url || fallback;
  } catch {
    return fallback;
  }
}

/** Загружает несколько ключей медиа за один запрос (для страниц с несколькими фото). */
export async function getMediaMap(fallbacks: Record<string, string>) {
  const keys = Object.keys(fallbacks);
  const result = { ...fallbacks };
  try {
    const items = await prisma.mediaItem.findMany({
      where: { key: { in: keys } },
    });
    for (const item of items) {
      result[item.key] = item.url;
    }
  } catch {
    /* БД недоступна — используем fallbacks */
  }
  return result;
}

export async function getPublishedTariffs(group: string) {
  try {
    return prisma.tariff.findMany({
      where: { published: true, group },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getPublishedNews() {
  try {
    return prisma.newsPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getPublishedSpecialists() {
  try {
    return prisma.specialist.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getSpecialistBySlug(slug: string) {
  try {
    return prisma.specialist.findFirst({
      where: { slug, published: true },
    });
  } catch {
    return null;
  }
}
