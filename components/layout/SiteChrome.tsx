"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SafeImage } from "@/components/ui/SafeImage";
import { SITE, LOGO } from "@/lib/constants";
import { NAVIGATION } from "@/lib/navigation";
import { searchSite } from "@/lib/site-search";
import { HeaderAccountLink } from "./HeaderAccountLink";
import styles from "./SiteChrome.module.css";

type HeaderProps = { onCallbackClick: () => void };

function Search({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const matches = mobile && query.trim() ? searchSite(query).slice(0, 5) : [];
  return (
    <div className={styles.searchWrap}>
      <form
        action="/search"
        className={styles.search}
        onSubmit={onNavigate}
        role="search"
      >
        <label className={styles.searchField}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="6" stroke="currentColor" />
            <path d="m14.5 14.5 6 6" stroke="currentColor" />
          </svg>
          <input
            name="q"
            type="search"
            aria-label="Поиск по сайту"
            placeholder="Поиск"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </label>
        {!mobile && <button type="submit">Найти</button>}
      </form>
      {mobile && query.trim() && (
        <div className={styles.results}>
          {matches.length ? (
            matches.map((item) => (
              <Link key={item.href} href={item.href} onClick={onNavigate}>
                {item.title}
              </Link>
            ))
          ) : (
            <p>Ничего не найдено</p>
          )}
        </div>
      )}
    </div>
  );
}

export function TopBar({ onCallbackClick }: HeaderProps) {
  return (
    <div className={styles.topbar}>
      <div className={`container-site ${styles.topbarInner}`}>
        <Search />
        <a
          className={styles.phone}
          href={`tel:${SITE.phone.replace(/[\s()-]/g, "")}`}
        >
          {SITE.phoneDisplay}
        </a>
        <span>{SITE.hours}</span>
        <HeaderAccountLink />
        <button
          type="button"
          className={styles.callback}
          onClick={onCallbackClick}
        >
          Заказать звонок
        </button>
      </div>
    </div>
  );
}

export function Header({ onCallbackClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [accessible, setAccessible] = useState(false);
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (mobileOpen) dialog.showModal();
    else if (dialog.open) dialog.close();
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);
  useEffect(() => {
    function outside(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  useEffect(() => {
    const value = localStorage.getItem("izhsiz-accessible") === "true";
    setAccessible(value);
    document.documentElement.classList.toggle("accessible-view", value);
  }, []);
  function toggleAccessible() {
    const value = !accessible;
    setAccessible(value);
    document.documentElement.classList.toggle("accessible-view", value);
    localStorage.setItem("izhsiz-accessible", String(value));
  }
  const close = () => setMobileOpen(false);
  return (
    <header className={styles.header}>
      <div className={`container-site ${styles.shell}`}>
        <Link
          href="/"
          className={styles.logo}
          aria-label={`${SITE.name} — главная`}
        >
          <SafeImage
            src={LOGO}
            alt={SITE.name}
            width={171}
            height={42}
            priority
          />
        </Link>
        <nav
          ref={navRef}
          className={styles.desktopNav}
          aria-label="Основная навигация"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpenMenu(null);
              (e.target as HTMLElement)
                .closest("div")
                ?.querySelector("button")
                ?.focus();
            }
          }}
        >
          {NAVIGATION.map((item, index) =>
            item.links ? (
              <div
                key={item.label}
                className={styles.menuGroup}
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget))
                    setOpenMenu(null);
                }}
              >
                <button
                  type="button"
                  className={index === 0 ? styles.education : styles.menuButton}
                  aria-expanded={openMenu === item.label}
                  aria-controls={`desktop-menu-${index}`}
                  onClick={() =>
                    setOpenMenu(openMenu === item.label ? null : item.label)
                  }
                >
                  {item.label}
                  <span aria-hidden="true">▾</span>
                </button>
                {openMenu === item.label && (
                  <div className={styles.dropdown} id={`desktop-menu-${index}`}>
                    {item.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setOpenMenu(null)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.label} href={item.href!}>
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className={styles.mobileActions}>
          <button
            type="button"
            onClick={onCallbackClick}
            aria-label="Заказать звонок"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 3H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            ref={triggerRef}
            type="button"
            aria-label="Открыть меню"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(true)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </button>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className={styles.mobileDialog}
        aria-label="Меню сайта"
        onCancel={close}
        onClose={() => {
          setMobileOpen(false);
          triggerRef.current?.focus();
        }}
      >
        <div className={styles.mobileHeading}>
          <Link href="/" onClick={close}>
            <SafeImage src={LOGO} alt={SITE.name} width={171} height={42} />
          </Link>
          <button type="button" aria-label="Закрыть меню" onClick={close}>
            ×
          </button>
        </div>
        <Search mobile onNavigate={close} />
        <nav className={styles.mobileNav} aria-label="Мобильная навигация">
          {NAVIGATION.map((item) =>
            item.links ? (
              <details key={item.label}>
                <summary>
                  {item.label}
                  <span aria-hidden="true">⌄</span>
                </summary>
                <div>
                  {item.links.map((link) => (
                    <Link key={link.label} href={link.href} onClick={close}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link key={item.label} href={item.href!} onClick={close}>
                {item.label}
              </Link>
            ),
          )}
          <Link href="/market" onClick={close}>
            Маркет развивающих товаров
          </Link>
          <Link href="/blog" onClick={close}>
            Блог
          </Link>
          <div onClick={close}>
            <HeaderAccountLink />
          </div>
          <button
            type="button"
            aria-pressed={accessible}
            onClick={toggleAccessible}
          >
            {accessible ? "Обычная версия сайта" : "Версия для слабовидящих"}
          </button>
        </nav>
        <div className={styles.mobileContacts}>
          <div>
            <small>Звоните нам</small>
            <a href={`tel:${SITE.phone.replace(/[\s()-]/g, "")}`}>
              {SITE.phoneDisplay}
            </a>
          </div>
          <div>
            <small>Пишите нам</small>
            <a
              href="https://t.me/katrinskul"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram ↗
            </a>
          </div>
          <p>{SITE.hours}</p>
        </div>
      </dialog>
    </header>
  );
}
