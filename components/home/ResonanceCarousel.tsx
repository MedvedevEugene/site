"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { RESONANCE_CARDS } from "@/lib/site-data";

export function ResonanceCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: -1 | 1) {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  return (
    <section className="section bg-white overflow-hidden">
      <div className="container-site">
        <h2 className="section-title">Что вам откликается сейчас?</h2>
        <div className="relative">
          <button
            type="button"
            aria-label="Назад"
            onClick={() => scroll(-1)}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-xl bg-primary/90 text-white items-center justify-center border-0"
          >
            ‹
          </button>
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {RESONANCE_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="relative shrink-0 w-[280px] sm:w-[300px] h-[420px] rounded-[28px] overflow-hidden snap-start group"
              >
                <Image src={card.image} alt="" fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="300px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute inset-0 p-7 flex flex-col items-center text-center text-white">
                  <p className="font-heading text-xl font-medium mt-8 mb-auto leading-snug">{card.title}</p>
                  <span className="btn-glass mt-6">Откликается</span>
                </div>
              </Link>
            ))}
          </div>
          <button
            type="button"
            aria-label="Вперёд"
            onClick={() => scroll(1)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-xl bg-primary/90 text-white items-center justify-center border-0"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
