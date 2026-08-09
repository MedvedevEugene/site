"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { HeroProgramCta } from "@/components/home/HeroProgramCta";
import { HERO_TAGS } from "@/lib/constants";
import { HERO_SLIDE_INTERVAL_MS, HERO_SLIDES, type HeroSlide } from "@/lib/hero-slides";

type HeroSectionProps = {
  heroPortrait?: string;
};

const TAG_ICONS: Record<string, string> = {
  Отношения: "/images/hero/tags/otnosheniya.png",
  "Личные границы": "/images/hero/tags/granicy.png",
  Деньги: "/images/hero/tags/dengi.png",
  Карьера: "/images/hero/tags/karera.png",
  Бизнес: "/images/hero/tags/biznes.png",
  Семья: "/images/hero/tags/otnosheniya.png",
  "Тревога и стресс": "/images/hero/tags/trevoga.png",
};

function HeroQuoteMark() {
  return (
    <svg
      className="testimonial-card__quote-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M16 8C16 6.41775 15.5308 4.87103 14.6518 3.55544C13.7727 2.23984 12.5233 1.21446 11.0615 0.608964C9.59966 0.00346267 7.99113 -0.154964 6.43928 0.153718C4.88743 0.4624 3.46197 1.22433 2.34315 2.34315C1.22433 3.46197 0.4624 4.88743 0.153718 6.43928C-0.154964 7.99113 0.00346269 9.59966 0.608964 11.0615C1.21446 12.5233 2.23984 13.7727 3.55544 14.6518C4.87103 15.5308 6.41775 16 8 16L8 8H16Z"
        fill="#272344"
      />
    </svg>
  );
}

function HeroTestimonialCard({ slide }: { slide: HeroSlide }) {
  return (
    <div className="testimonial-card testimonial-card--hero" key={slide.id}>
      <div className="testimonial-card__quote-marks" aria-hidden>
        <HeroQuoteMark />
        <HeroQuoteMark />
      </div>
      <p className="testimonial-card__quote-text">{slide.quote}</p>
      <div className="mt-auto pt-3">
        <div className="font-semibold text-[14px] text-[#3b3758] leading-none">{slide.author}</div>
        <div className="text-[11px] text-[#3b3758] leading-[1.35] mt-1.5">
          Выпускник программы
          <br />
          по&nbsp;системным расстановкам
        </div>
      </div>
    </div>
  );
}

function HeroTags() {
  return (
    <div className="hero-tilda__tags">
      {HERO_TAGS.map((tag) => (
        <span key={tag} className="hero-tilda__tag">
          <span className="hero-tilda__tag-icon" aria-hidden>
            <Image
              src={TAG_ICONS[tag] ?? TAG_ICONS.Отношения}
              alt=""
              width={16}
              height={16}
              className="size-4"
            />
          </span>
          {tag}
        </span>
      ))}
    </div>
  );
}

function resolveSlides(_heroPortrait?: string): HeroSlide[] {
  return HERO_SLIDES;
}

export function HeroSection({ heroPortrait }: HeroSectionProps) {
  const slides = resolveSlides(heroPortrait);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const slide = slides[index] ?? slides[0];
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
      setStoryOpen(false);
    },
    [count],
  );

  useEffect(() => {
    if (paused || storyOpen || count < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, HERO_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, storyOpen, count]);

  useEffect(() => {
    if (!storyOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setStoryOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [storyOpen]);

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    goTo(index + (delta < 0 ? 1 : -1));
  };

  return (
    <section
      className="hero-tilda"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-tilda__band">
        <div className="container-site">
          <div
            className="hero-tilda__stage"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="hero-tilda__intro">
              <h1 className="hero-tilda__title">
                Освойте системные расстановки и&nbsp;найдите внутреннюю опору
              </h1>
              <p className="hero-tilda__subtitle">
                Обучение расстановкам, психологическая помощь и&nbsp;расстановочные группы
                очно и&nbsp;онлайн.
              </p>
            </div>

            <div className="hero-tilda__media">
              <Image
                src="/images/hero/cloud-bg.png"
                alt=""
                width={650}
                height={289}
                className="hero-tilda__cloud"
                aria-hidden
              />
              {slides.map((item, slideIndex) => (
                <div
                  key={item.id}
                  className={`hero-tilda__portrait-slot${
                    slideIndex === index ? " hero-tilda__portrait-slot--active" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.portrait}
                    alt={item.author}
                    className="hero-tilda__portrait"
                    decoding="async"
                    fetchPriority={slideIndex === 0 ? "high" : "auto"}
                  />
                </div>
              ))}
              <button
                type="button"
                className="hero-tilda__story"
                aria-expanded={storyOpen}
                aria-controls="hero-story-sheet"
                onClick={() => setStoryOpen(true)}
              >
                {slide.storyLabel}
                <span className="hero-tilda__story-info" aria-hidden>
                  i
                </span>
              </button>
            </div>

            <div className="hero-tilda__quote">
              <HeroTestimonialCard slide={slide} />
            </div>

            <div className="hero-tilda__dots" role="tablist" aria-label="Истории выпускников">
              {slides.map((item, slideIndex) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={slideIndex === index}
                  aria-label={`${item.storyLabel}, слайд ${slideIndex + 1} из ${count}`}
                  className={`hero-tilda__dot${
                    slideIndex === index ? " hero-tilda__dot--active" : ""
                  }`}
                  onClick={() => goTo(slideIndex)}
                />
              ))}
            </div>

            <div className="hero-tilda__actions">
              <HeroProgramCta />
              <HeroTags />
            </div>
          </div>
        </div>
      </div>

      {storyOpen ? (
        <div className="hero-story-sheet" role="presentation">
          <button
            type="button"
            className="hero-story-sheet__backdrop"
            aria-label="Закрыть историю"
            onClick={() => setStoryOpen(false)}
          />
          <div
            id="hero-story-sheet"
            className="hero-story-sheet__panel"
            role="dialog"
            aria-modal="true"
            aria-label={slide.storyLabel}
          >
            <button
              type="button"
              className="hero-story-sheet__close"
              aria-label="Закрыть"
              onClick={() => setStoryOpen(false)}
            >
              <span className="hero-story-sheet__close-icon" aria-hidden />
            </button>
            <div className="hero-story-sheet__content">
              <HeroTestimonialCard slide={slide} />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
