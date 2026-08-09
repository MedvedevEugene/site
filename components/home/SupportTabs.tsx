"use client";

import { useState } from "react";
import Image from "next/image";
import { SUPPORT_TABS } from "@/lib/site-data";

export function SupportTabs() {
  const [active, setActive] = useState<(typeof SUPPORT_TABS)[number]["id"]>(SUPPORT_TABS[0].id);
  const tab = SUPPORT_TABS.find((item) => item.id === active) ?? SUPPORT_TABS[0];
  const mediaTone = "mediaTone" in tab ? tab.mediaTone : "light";

  return (
    <section className="support-section">
      <div className="container-site section-heading-band">
        <h2 className="section-title section-title--support">
          Поддерживаем и{"\u00a0"}помогаем
          <br />
          прийти к&nbsp;результату
        </h2>
      </div>

      <div className="container-site">
        <div className="support-card support-card--desktop">
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
            <div className={`support-panel__media support-panel__media--${mediaTone}`}>
              {tab.image ? (
                <Image
                  key={tab.id}
                  src={tab.image}
                  alt=""
                  fill
                  className="support-panel__image"
                  sizes="(max-width: 1024px) 100vw, 630px"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="support-mobile">
        <div className="support-accordion">
          {SUPPORT_TABS.map((item) => {
            const open = active === item.id;
            const tone = "mediaTone" in item ? item.mediaTone : "light";
            return (
              <div
                key={item.id}
                className={`support-accordion__item${open ? " support-accordion__item--open" : ""}`}
              >
                <button
                  type="button"
                  className="support-accordion__trigger"
                  aria-expanded={open}
                  onClick={() => setActive(item.id)}
                >
                  <span>{item.label}</span>
                  <span
                    className={`support-accordion__chevron${open ? " support-accordion__chevron--open" : ""}`}
                    aria-hidden
                  />
                </button>
                {open ? (
                  <div className="support-accordion__body">
                    {item.image ? (
                      <div className={`support-accordion__media support-panel__media--${tone}`}>
                        <Image
                          src={item.image}
                          alt=""
                          width={600}
                          height={296}
                          className="support-accordion__image"
                        />
                      </div>
                    ) : null}
                    <h3 className="support-accordion__title">{item.title}</h3>
                    <p className="support-accordion__text">{item.text}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
