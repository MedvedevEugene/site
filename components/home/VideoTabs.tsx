"use client";

import { useState } from "react";
import { VIDEO_TABS } from "@/lib/site-data";

export function VideoTabs() {
  const [active, setActive] = useState<(typeof VIDEO_TABS)[number]["id"]>(VIDEO_TABS[0].id);

  return (
    <section className="section bg-white">
      <div className="container-site">
        <h2 className="section-title">Как это выглядит на деле</h2>
        <p className="section-subtitle">Короткие отрывки из живых расстановок и групп.</p>
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {VIDEO_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`pill-tab ${active === tab.id ? "pill-tab-active" : "bg-white"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative rounded-[40px] overflow-hidden bg-black aspect-video max-w-[980px] mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-12 bg-[#ff0033] rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl ml-1">▶</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
