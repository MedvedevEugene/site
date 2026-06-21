const DB_TIMEOUT_MS = 4000;

export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

/** Не даём Prisma зависать на минуты, если БД недоступна (Vercel / Neon sleep). */
export async function withDbTimeout<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasDatabaseUrl()) return fallback;

  try {
    return await Promise.race([
      query(),
      new Promise<T>((_, reject) => {
        setTimeout(() => reject(new Error("Database query timeout")), DB_TIMEOUT_MS);
      }),
    ]);
  } catch {
    return fallback;
  }
}
