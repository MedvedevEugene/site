"use client";

import { useState } from "react";
import { VIDEO_TABS } from "@/lib/site-data";

export function VideoTabs() {
  const [active, setActive] = useState<(typeof VIDEO_TABS)[number]["id"]>(VIDEO_TABS[0].id);

  return (
    <section className="bg-white pb-[70px]">
      <div className="container-site section-heading-band">
        <h2 className="section-title">Как это выглядит на деле</h2>
      </div>
      <div className="container-site">
        <p className="section-subtitle">Короткие отрывки из живых расстановок и групп.</p>

        <div className="video-tab-bar">
          {VIDEO_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={`video-tab ${active === t.id ? "video-tab-active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative rounded-[20px] overflow-hidden bg-[#111] aspect-video max-w-[980px] mx-auto min-h-[320px] md:min-h-[480px] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2a2640] to-[#111]" />
          <div className="relative z-10 flex flex-col items-center gap-4 text-white/70">
            <div className="w-16 h-12 bg-[#ff0033] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl ml-1">▶</span>
            </div>
            <span className="text-sm">{VIDEO_TABS.find((t) => t.id === active)?.label}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
