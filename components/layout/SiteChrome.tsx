"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SITE,
  LOGO,
  BURGER_ICON,
  NAV_LINKS,
  EDUCATION_LINKS,
  FOOTER_LINKS,
} from "@/lib/constants";

interface HeaderProps {
  onCallbackClick: () => void;
}

export function TopBar({ onCallbackClick }: HeaderProps) {
  return (
    <div className="bg-white pt-[18px]">
      <div className="container-site flex items-center justify-between gap-4 flex-wrap">
        <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-base underline">
          {SITE.phoneDisplay}
        </a>
        <span className="text-base hidden md:inline">{SITE.hours}</span>
        <button type="button" onClick={onCallbackClick} className="btn btn-primary text-[11px] uppercase tracking-wide px-5 py-3">
          Заказать звонок
        </button>
      </div>
    </div>
  );
}

export function Header({ onCallbackClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eduOpen, setEduOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm pb-5 pt-3">
      <div className="container-site">
        <div className="nav-shell">
          <Link href="/" className="shrink-0">
            <Image src={LOGO} alt={SITE.name} width={170} height={42} className="h-[42px] w-auto" priority />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-base">
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-1 hover:opacity-70"
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
                      <Image src={item.icon} alt="" width={40} height={40} />
                      <div>
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className="text-xs text-muted">{item.meta}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {NAV_LINKS.filter((l) => !l.hasSubmenu).map((link) => (
              <Link key={link.href} href={link.href} className="hover:opacity-70">
                {link.label}
              </Link>
            ))}
            <Link href="/catalog" className="hover:opacity-70">
              Ещё ▾
            </Link>
          </nav>

          <button
            type="button"
            className="lg:hidden p-1"
            aria-label="Меню"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Image src={BURGER_ICON} alt="" width={32} height={32} />
          </button>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden mt-4 p-4 bg-cream-bg rounded-[20px] border border-border flex flex-col gap-3">
            {EDUCATION_LINKS.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
            {NAV_LINKS.filter((l) => !l.hasSubmenu).map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
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

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-[60px] pb-[30px]">
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <Image
              src={LOGO}
              alt={SITE.name}
              width={170}
              height={40}
              className="h-10 w-auto brightness-0 invert mb-4"
            />
            <p className="text-sm opacity-80 m-0">{SITE.fullName}</p>
            <p className="text-[13px] opacity-60 mt-2">Лицензия {SITE.license}</p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/15 grid place-items-center text-sm font-semibold">TG</a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/15 grid place-items-center text-sm font-semibold">VK</a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/15 grid place-items-center text-sm font-semibold">M</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold opacity-70 m-0 mb-4">Обучение</h4>
            {FOOTER_LINKS.education.map((l) => (
              <Link key={l.href} href={l.href} className="block text-sm opacity-90 mb-2.5 hover:opacity-100">
                {l.label}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="text-sm font-semibold opacity-70 m-0 mb-4">Помощь</h4>
            {FOOTER_LINKS.help.map((l) => (
              <Link key={l.href} href={l.href} className="block text-sm opacity-90 mb-2.5 hover:opacity-100">
                {l.label}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="text-sm font-semibold opacity-70 m-0 mb-4">Контакты</h4>
            <a href={`tel:${SITE.phoneAlt.replace(/[\s()-]/g, "")}`} className="block text-sm opacity-90 mb-2.5">
              {SITE.phoneAlt}
            </a>
            <a href={`mailto:${SITE.email}`} className="block text-sm opacity-90 mb-2.5">
              {SITE.email}
            </a>
          </div>
        </div>
        <div className="border-t border-white/15 pt-6 flex justify-between flex-wrap gap-3 text-[13px] opacity-70">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <Link href="/privacy" className="hover:opacity-100">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
}
