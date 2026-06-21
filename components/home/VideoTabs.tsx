"use client";

import { useState } from "react";
import { VIDEO_TABS } from "@/lib/site-data";

export function VideoTabs() {
  const [active, setActive] = useState<(typeof VIDEO_TABS)[number]["id"]>(VIDEO_TABS[0].id);

  return (
    <section className="video-section">
      <div className="container-site video-section__intro">
        <h2 className="video-section__title">Как это выглядит на деле</h2>
        <p className="video-section__subtitle">Короткие отрывки из живых расстановок и групп.</p>
      </div>

      <div className="container-site">
        <div className="video-tabs">
          {VIDEO_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`video-tab${active === tab.id ? " video-tab--active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="video-frame" aria-label={VIDEO_TABS.find((tab) => tab.id === active)?.label} />
      </div>
    </section>
  );
}
