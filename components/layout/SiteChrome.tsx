"use client";

import { useState } from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  SITE,
  LOGO,
  BURGER_ICON,
  NAV_LINKS,
  EDUCATION_LINKS,
  MORE_LINKS,
} from "@/lib/constants";

interface HeaderProps {
  onCallbackClick: () => void;
}

export function TopBar({ onCallbackClick }: HeaderProps) {
  return (
    <div className="bg-white pt-[18px]">
      <div className="container-site flex items-center justify-between gap-4 flex-wrap">
        <form className="search-shell hidden sm:flex" onSubmit={(e) => e.preventDefault()}>
          <span className="text-muted text-sm">🔍</span>
          <input type="search" placeholder="Поиск" className="border-0 bg-transparent outline-none text-sm w-full min-w-[100px]" />
          <button type="submit" className="text-sm text-muted bg-light rounded-lg px-3 py-1 border-0">Найти</button>
        </form>
        <div className="flex items-center gap-4 flex-wrap ml-auto">
          <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-base underline">
            {SITE.phoneDisplay}
          </a>
          <span className="text-base hidden md:inline">{SITE.hours}</span>
          <button type="button" onClick={onCallbackClick} className="btn btn-primary-solid">
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm pb-5 pt-3">
      <div className="container-site">
        <div className="nav-shell">
          <div className="flex items-center gap-4 lg:gap-5 min-w-0">
            <Link href="/" className="shrink-0 max-w-[220px]">
              <SafeImage src={LOGO} alt={SITE.name} width={220} height={42} className="h-[42px] w-auto max-w-full" priority />
            </Link>

            <div className="relative hidden lg:block">
              <button
                type="button"
                className="nav-edu-btn"
                onMouseEnter={() => setEduOpen(true)}
                onMouseLeave={() => setEduOpen(false)}
              >
                Обучение ▾
              </button>
              {eduOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-[320px] bg-white rounded-[10px] border border-border shadow-[0_5px_15px_rgba(0,0,0,0.05)] p-2 z-50"
                  onMouseEnter={() => setEduOpen(true)}
                  onMouseLeave={() => setEduOpen(false)}
                >
                  {EDUCATION_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex gap-4 p-3 rounded-[10px] hover:bg-cream-bg transition-colors"
                    >
                      <SafeImage src={item.icon} alt="" width={40} height={40} />
                      <div>
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className="text-xs text-muted">{item.meta}</div>
                      </div>
                    </Link>
                  ))}
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
            <button type="button" className="btn btn-primary mt-2" onClick={() => { setMobileOpen(false); onCallbackClick(); }}>
              Заказать звонок
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
