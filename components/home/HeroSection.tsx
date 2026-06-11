"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SafeImage } from "@/components/ui/SafeImage";
import { TESTIMONIALS } from "@/lib/constants";
import { HERO_TAG_ROWS, IMAGES } from "@/lib/site-data";

type HeroSectionProps = {
  heroPortrait?: string;
};

export function HeroSection({ heroPortrait = IMAGES.heroPortrait }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const t = TESTIMONIALS[current];

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-8 md:py-12 bg-cream-bg/40">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-center">
          <div className="z-10">
            <h1 className="font-heading text-[clamp(28px,4vw,44px)] font-medium leading-[1.15] m-0 mb-5">
              Найди опору, ясность и новый вектор жизни в&nbsp;ИЖСИЗ
            </h1>
            <p className="text-lg text-muted m-0 mb-6 max-w-[520px]">
              Обучение и расстановки, которые помогают обрести устойчивость в жизни, отношениях и бизнесе
            </p>
            <div className="flex flex-col gap-2.5 mb-7">
              {HERO_TAG_ROWS.map((row) => (
                <div key={row.join("-")} className="flex flex-wrap gap-2.5">
                  {row.map((tag) => (
                    <span key={tag} className="tag-white">{tag}</span>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mb-7">
              <Link href="/catalog" className="btn btn-primary-solid inline-flex">
                <SafeImage src={IMAGES.logoCircle} alt="" width={22} height={22} className="w-[22px] h-[22px]" />
                Подобрать программу
              </Link>
              <Link href="/psychological-help" className="btn btn-outline uppercase text-[11px] tracking-wide">
                Пройти онлайн-инструмент
              </Link>
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[520px]">
            <Image
              src={heroPortrait}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain object-bottom"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
              <div className="testimonial-card">
                <SafeImage src={IMAGES.quoteIcon} alt="" width={32} height={32} className="w-8 h-8 mb-4" />
                <p className="text-[15px] leading-relaxed m-0 mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="font-semibold text-sm">{t.author}</div>
                <div className="text-xs text-muted">{t.role}</div>
                <div className="flex gap-2 mt-4">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Отзыв ${i + 1}`}
                      className={`w-2 h-2 rounded-full border-0 p-0 ${i === current ? "bg-primary" : "bg-[#d0cfe0]"}`}
                      onClick={() => setCurrent(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
