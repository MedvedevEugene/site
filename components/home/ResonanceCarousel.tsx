"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { RESONANCE_CARDS } from "@/lib/site-data";

export function ResonanceCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: -1 | 1) {
    trackRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  }

  return (
    <section className="section bg-white overflow-hidden">
      <div className="container-site">
        <h2 className="section-title">Что вам откликается сейчас?</h2>
        <div className="relative mt-10">
          <button
            type="button"
            aria-label="Назад"
            onClick={() => scroll(-1)}
            className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-xl bg-primary/90 text-white items-center justify-center border-0"
          >
            ‹
          </button>
          <div
            ref={trackRef}
            className="flex gap-5 md:gap-10 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {RESONANCE_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="relative shrink-0 w-[280px] sm:w-[320px] md:w-[360px] aspect-[3/4] rounded-[28px] overflow-hidden snap-start group"
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="360px"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(39, 35, 68, 0.4) 0%, rgba(39, 35, 68, 0) 100%)",
                  }}
                />
                <div className="absolute inset-0 px-[30px] py-5 flex flex-col items-center text-center text-white">
                  <p className="font-body text-[20px] md:text-[26px] font-normal mb-auto leading-snug">
                    {card.title}
                  </p>
                  <div className="resonance-card__btn-wrapper">
                    <span className="btn-resonance">Откликается</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <button
            type="button"
            aria-label="Вперёд"
            onClick={() => scroll(1)}
            className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-xl bg-primary/90 text-white items-center justify-center border-0"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
