"use client";

import { useEffect, useRef, useState } from "react";
import { VIDEO_TABS } from "@/lib/site-data";

export function VideoTabs() {
  const [active, setActive] = useState<(typeof VIDEO_TABS)[number]["id"]>(VIDEO_TABS[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const activeTab = VIDEO_TABS.find((tab) => tab.id === active) ?? VIDEO_TABS[0];

  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <section className="video-section">
      <div className="container-site video-section__intro">
        <h2 className="video-section__title">Как это выглядит на деле</h2>
        <p className="video-section__subtitle">Короткие отрывки из живых расстановок и групп.</p>
      </div>

      <div className="container-site">
        <div className="video-tabs" role="tablist" aria-label="Формат видео">
          {VIDEO_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => setActive(tab.id)}
              className={`video-tab${active === tab.id ? " video-tab--active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="video-mobile" ref={menuRef}>
          <button
            type="button"
            className={`video-mobile__trigger${menuOpen ? " video-mobile__trigger--open" : ""}`}
            aria-expanded={menuOpen}
            aria-haspopup="listbox"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{activeTab.label}</span>
            <span
              className={`video-mobile__caret${menuOpen ? " video-mobile__caret--open" : ""}`}
              aria-hidden
            />
          </button>

          <div className={`video-player video-player--mobile${menuOpen ? " video-player--menu-open" : ""}`}>
            {menuOpen ? (
              <ul className="video-mobile__menu" role="listbox" aria-label="Формат видео">
                {VIDEO_TABS.map((tab) => (
                  <li key={tab.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active === tab.id}
                      className={`video-mobile__option${
                        active === tab.id ? " video-mobile__option--active" : ""
                      }`}
                      onClick={() => {
                        setActive(tab.id);
                        setMenuOpen(false);
                      }}
                    >
                      {active === tab.id ? <span aria-hidden>✓</span> : <span aria-hidden />}
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            {VIDEO_TABS.map((tab) => (
              <div
                key={tab.id}
                className={`video-frame${active === tab.id ? " video-frame--active" : ""}`}
                role="tabpanel"
                aria-hidden={active !== tab.id}
                aria-label={tab.label}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${tab.youtubeId}?enablejsapi=1`}
                  title={tab.label}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="video-player video-player--desktop">
          {VIDEO_TABS.map((tab) => (
            <div
              key={tab.id}
              className={`video-frame${active === tab.id ? " video-frame--active" : ""}`}
              role="tabpanel"
              aria-hidden={active !== tab.id}
              aria-label={tab.label}
            >
              <iframe
                src={`https://www.youtube.com/embed/${tab.youtubeId}?enablejsapi=1`}
                title={tab.label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
