"use client";

import { useState } from "react";
import Image from "next/image";
import { SUPPORT_TABS } from "@/lib/site-data";

export function SupportTabs() {
  const [active, setActive] = useState<(typeof SUPPORT_TABS)[number]["id"]>(SUPPORT_TABS[0].id);
  const tab = SUPPORT_TABS.find((t) => t.id === active) ?? SUPPORT_TABS[0];

  return (
    <section className="bg-white pb-[70px]">
      <div className="container-site section-heading-band">
        <h2 className="section-title">Поддерживаем и помогаем прийти к результату</h2>
      </div>
      <div className="container-site">
        <div className="bg-cream-bg rounded-[40px] p-6 md:p-10 border border-border">
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {SUPPORT_TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                className={`pill-tab ${active === t.id ? "pill-tab-active" : "bg-white"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-heading text-[clamp(20px,2.5vw,28px)] font-medium m-0 mb-4 leading-snug">{tab.title}</h3>
              <p className="text-muted m-0 leading-relaxed">{tab.text}</p>
            </div>
            <div className="relative rounded-[20px] overflow-hidden border border-border bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] aspect-[630/310] max-h-[310px]">
              <Image src={tab.image} alt="" fill className="object-contain object-top" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
