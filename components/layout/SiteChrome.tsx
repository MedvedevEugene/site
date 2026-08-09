"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  SITE,
  LOGO,
  BURGER_ICON,
  NAV_LINKS,
  EDUCATION_LINKS,
  MORE_LINKS,
} from "@/lib/constants";
import { HeaderAccountLink } from "@/components/layout/HeaderAccountLink";

interface HeaderProps {
  onCallbackClick: () => void;
}

function SearchIcon() {
  return (
    <svg
      className="site-search__icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 88 88"
      aria-hidden
    >
      <path
        fill="#b6b6b6"
        d="M85 31.1c-.5-8.7-4.4-16.6-10.9-22.3C67.6 3 59.3 0 50.6.6c-8.7.5-16.7 4.4-22.5 11-11.2 12.7-10.7 31.7.6 43.9l-5.3 6.1-2.5-2.2-17.8 20 9 8.1 17.8-20.2-2.1-1.8 5.3-6.1c5.8 4.2 12.6 6.3 19.3 6.3 9 0 18-3.7 24.4-10.9 5.9-6.6 8.8-15 8.2-23.7zM72.4 50.8c-9.7 10.9-26.5 11.9-37.6 2.3-10.9-9.8-11.9-26.6-2.3-37.6 4.7-5.4 11.3-8.5 18.4-8.9h1.6c6.5 0 12.7 2.4 17.6 6.8 5.3 4.7 8.5 11.1 8.9 18.2.5 7-1.9 13.8-6.6 19.2z"
      />
    </svg>
  );
}

export function TopBar({ onCallbackClick }: HeaderProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <div className="site-topbar">
      <div className="container-site site-topbar__inner">
        <form className="site-search hidden sm:flex" onSubmit={handleSearch}>
          <div className="site-search__field">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск"
              className="site-search__input"
              aria-label="Поиск"
            />
            <SearchIcon />
          </div>
          <button type="submit" className="site-search__submit">
            Найти
          </button>
        </form>
        <div className="site-topbar__contacts">
          <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="site-topbar__phone">
            {SITE.phoneDisplay}
          </a>
          <span className="site-topbar__hours hidden md:inline">{SITE.hours}</span>
          <button type="button" onClick={onCallbackClick} className="btn btn-primary-solid site-topbar__callback">
            Заказать звонок
          </button>
        </div>
      </div>
    </div>
  );
}

export function Header({ onCallbackClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eduOpen, setEduOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="pb-3 pt-3">
      <div className="container-site">
        <div className="nav-shell">
          <div className="flex items-center gap-4 lg:gap-5 min-w-0">
            <Link href="/" className="shrink-0 max-w-[220px]">
              <SafeImage src={LOGO} alt={SITE.name} width={220} height={42} className="h-[42px] w-auto max-w-full" priority />
            </Link>

            <div
              className="relative hidden lg:block"
              onMouseEnter={() => setEduOpen(true)}
              onMouseLeave={() => setEduOpen(false)}
            >
              <button type="button" className="nav-edu-btn">
                Обучение ▾
              </button>
              {eduOpen && (
                <div className="absolute top-full left-0 pt-[15px] z-50">
                  <div className="nav-edu-menu">
                    {EDUCATION_LINKS.map((item) => (
                      <Link key={item.href} href={item.href} className="nav-edu-menu__item">
                        <SafeImage
                          src={item.icon}
                          alt=""
                          width={40}
                          height={40}
                          className="nav-edu-menu__icon"
                        />
                        <div className="nav-edu-menu__text">
                          <div className="nav-edu-menu__title">
                            {item.titleLines[0]}
                            <br />
                            {item.titleLines[1]}
                          </div>
                          <div className="nav-edu-menu__meta">{item.meta}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-base shrink-0">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:opacity-70 whitespace-nowrap">
                {link.label}
              </Link>
            ))}
            <HeaderAccountLink />
            <div className="relative">
              <button
                type="button"
                className="hover:opacity-70 whitespace-nowrap"
                onMouseEnter={() => setMoreOpen(true)}
                onMouseLeave={() => setMoreOpen(false)}
              >
                Ещё ▾
              </button>
              {moreOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-[280px] bg-white rounded-[10px] border border-border shadow-[0_5px_15px_rgba(0,0,0,0.05)] p-2 z-50"
                  onMouseEnter={() => setMoreOpen(true)}
                  onMouseLeave={() => setMoreOpen(false)}
                >
                  {MORE_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2.5 rounded-[10px] hover:bg-cream-bg text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <button
            type="button"
            className="lg:hidden p-1"
            aria-label="Меню"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <SafeImage src={BURGER_ICON} alt="" width={32} height={32} />
          </button>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden mt-4 p-4 bg-cream-bg rounded-[20px] border border-border flex flex-col gap-3">
            {EDUCATION_LINKS.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            {MORE_LINKS.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/account" onClick={() => setMobileOpen(false)}>
              Мой аккаунт
            </Link>
            <button type="button" className="btn btn-primary mt-2" onClick={() => { setMobileOpen(false); onCallbackClick(); }}>
              Заказать звонок
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
