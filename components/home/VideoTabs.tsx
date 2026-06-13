"use client";

import { useState } from "react";
import Image from "next/image";
import { VIDEO_TABS } from "@/lib/site-data";

export function VideoTabs() {
  const [active, setActive] = useState<(typeof VIDEO_TABS)[number]["id"]>(VIDEO_TABS[0].id);
  const tab = VIDEO_TABS.find((t) => t.id === active) ?? VIDEO_TABS[0];

  return (
    <section className="section bg-white">
      <div className="container-site">
        <h2 className="section-title">Как это выглядит на деле</h2>
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

        <div className="relative rounded-[20px] overflow-hidden bg-[#1a1a1a] aspect-video max-w-[980px] mx-auto min-h-[320px] md:min-h-[420px]">
          <Image src={tab.poster} alt="" fill className="object-cover opacity-80" sizes="980px" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-16 h-12 bg-[#ff0033] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl ml-1">▶</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
