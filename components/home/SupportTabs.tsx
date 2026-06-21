"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SUPPORT_TABS } from "@/lib/site-data";

export function SupportTabs() {
  const [active, setActive] = useState<(typeof SUPPORT_TABS)[number]["id"]>(SUPPORT_TABS[0].id);
  const panelRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToPanel = useCallback((id: (typeof SUPPORT_TABS)[number]["id"]) => {
    setActive(id);
    panelRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = visible.target.getAttribute("data-support-id");
        if (id) setActive(id as (typeof SUPPORT_TABS)[number]["id"]);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    SUPPORT_TABS.forEach((tab) => {
      const node = panelRefs.current[tab.id];
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="support-section">
      <div className="container-site section-heading-band">
        <h2 className="section-title">
          Поддерживаем и помогаем
          <br />
          прийти к результату
        </h2>
      </div>

      <div className="container-site">
        <div className="support-stack">
          <div className="support-tabs-head">
            <div className="support-tabs-rail">
              {SUPPORT_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollToPanel(tab.id)}
                  className={`support-tab${active === tab.id ? " support-tab--active" : ""}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="support-panels">
            {SUPPORT_TABS.map((tab) => (
              <article
                key={tab.id}
                id={`support-${tab.id}`}
                data-support-id={tab.id}
                ref={(node) => {
                  panelRefs.current[tab.id] = node;
                }}
                className="support-panel scroll-mt-28"
              >
                <div className="support-panel__grid">
                  <div className="support-panel__copy">
                    <h3 className="support-panel__title">{tab.title}</h3>
                    <p className="support-panel__text">{tab.text}</p>
                  </div>
                  <div className="support-panel__media">
                    {tab.image ? (
                      <Image
                        src={tab.image}
                        alt=""
                        fill
                        className="object-contain object-top"
                        sizes="(max-width: 1024px) 100vw, 630px"
                      />
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
