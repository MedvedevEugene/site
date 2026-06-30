"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { BASE_COURSE_REVIEWS } from "@/lib/base-course-data";

function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const path = direction === "prev" ? "M23 13L15.5 20L23 27" : "M17 13L24.5 20L17 27";

  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Предыдущий отзыв" : "Следующий отзыв"}
      onClick={onClick}
      className={`bc-reviews-carousel__arrow bc-reviews-carousel__arrow--${direction}`}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d={path} stroke="#3b3758" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </button>
  );
}

export function BaseCourseReviewsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = BASE_COURSE_REVIEWS.length;

  const goPrev = useCallback(() => {
    setActiveIndex((index) => (index - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % total);
  }, [total]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  return (
    <div className="bc-reviews-carousel">
      <CarouselArrow direction="prev" onClick={goPrev} />
      <div className="bc-reviews-carousel__viewport" aria-live="polite">
        <ul className="bc-reviews-carousel__track">
          {BASE_COURSE_REVIEWS.map((src, index) => {
            const offset = index - activeIndex;
            let position = offset;
            if (position > total / 2) position -= total;
            if (position < -total / 2) position += total;

            const isActive = index === activeIndex;

            return (
              <li
                key={src}
                className={`bc-reviews-carousel__slide${isActive ? " is-active" : ""}`}
                style={{ "--bc-slide-offset": position } as CSSProperties}
                aria-hidden={!isActive}
              >
                <Image
                  src={src}
                  alt={`Отзыв ${index + 1}`}
                  width={361}
                  height={570}
                  className="bc-reviews-carousel__image"
                  sizes="361px"
                />
              </li>
            );
          })}
        </ul>
      </div>
      <CarouselArrow direction="next" onClick={goNext} />
    </div>
  );
}
