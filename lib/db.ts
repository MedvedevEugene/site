import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return url;
  if (/connect_timeout=/i.test(url)) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}connect_timeout=5`;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    ...(getDatabaseUrl()
      ? {
          datasources: {
            db: { url: getDatabaseUrl() },
          },
        }
      : {}),
  });

globalForPrisma.prisma = prisma;
