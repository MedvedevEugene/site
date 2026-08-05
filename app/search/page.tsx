import type { Metadata } from "next";
import Link from "next/link";
import { searchSite } from "@/lib/site-search";

export const metadata: Metadata = {
  title: "Поиск",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = searchSite(query);

  return (
    <section className="py-8 md:py-12">
      <div className="container-site">
        <div className="text-sm text-muted mb-6">
          <Link href="/">Главная</Link> / Поиск
        </div>
        <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium m-0 mb-4">Поиск</h1>
        <form action="/search" method="get" className="site-search mb-8 max-w-xl">
          <div className="site-search__field">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Поиск"
              className="site-search__input"
              aria-label="Поиск"
            />
          </div>
          <button type="submit" className="site-search__submit">
            Найти
          </button>
        </form>

        {!query ? (
          <p className="text-muted m-0">Введите запрос, чтобы найти страницы сайта.</p>
        ) : results.length === 0 ? (
          <p className="text-muted m-0">
            По запросу «{query}» ничего не найдено. Попробуйте другое слово.
          </p>
        ) : (
          <ul className="m-0 p-0 list-none flex flex-col gap-4">
            {results.map((item) => (
              <li key={item.href} className="tool-card">
                <Link href={item.href} className="font-heading text-lg font-medium no-underline text-[#272344]">
                  {item.title}
                </Link>
                {item.description ? <p className="text-sm text-muted m-0 mt-2">{item.description}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
