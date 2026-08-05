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

        <label className="sr-only" htmlFor="video-tabs-select">
          Формат видео
        </label>
        <select
          id="video-tabs-select"
          className="video-tabs-select"
          value={active}
          onChange={(e) => setActive(e.target.value as (typeof VIDEO_TABS)[number]["id"])}
        >
          {VIDEO_TABS.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>

        <div className="video-player">
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
