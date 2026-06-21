"use client";

import { useState } from "react";
import Image from "next/image";
import { SUPPORT_TABS } from "@/lib/site-data";

export function SupportTabs() {
  const [active, setActive] = useState<(typeof SUPPORT_TABS)[number]["id"]>(SUPPORT_TABS[0].id);
  const tab = SUPPORT_TABS.find((item) => item.id === active) ?? SUPPORT_TABS[0];

  return (
    <section className="support-section">
      <div className="container-site section-heading-band">
        <h2 className="section-title">
          Поддерживаем и{"\u00a0"}помогаем
          <br />
          прийти к результату
        </h2>
      </div>

      <div className="container-site">
        <div className="support-card">
          <div className="support-tabs-rail">
            {SUPPORT_TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={`support-tab${active === item.id ? " support-tab--active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="support-panel__grid">
            <div className="support-panel__copy">
              <h3 className="support-panel__title">{tab.title}</h3>
              <p className="support-panel__text">{tab.text}</p>
            </div>
            <div className="support-panel__media">
              {tab.image ? (
                <Image
                  key={tab.id}
                  src={tab.image}
                  alt=""
                  fill
                  className="object-contain object-top"
                  sizes="(max-width: 1024px) 100vw, 630px"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
