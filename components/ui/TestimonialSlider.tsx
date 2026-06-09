"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const t = TESTIMONIALS[current];

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-cream-bg rounded-[20px] p-10 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-center mt-10">
      <Image
        src={t.photo}
        alt={t.author}
        width={180}
        height={180}
        className="w-[180px] h-[180px] rounded-full object-cover border-4 border-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] mx-auto md:mx-0"
      />
      <div className="text-center md:text-left">
        <p className="text-xl italic m-0 mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
        <div className="font-semibold">{t.author}</div>
        <div className="text-sm text-muted">{t.role}</div>
        <div className="flex gap-2 mt-5 justify-center md:justify-start">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Отзыв ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full border-0 p-0 ${i === current ? "bg-primary" : "bg-[#d0cfe0]"}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
