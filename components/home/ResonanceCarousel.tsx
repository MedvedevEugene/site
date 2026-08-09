"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RESONANCE_CARDS } from "@/lib/site-data";

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
      aria-label={direction === "prev" ? "Предыдущий слайд" : "Следующий слайд"}
      onClick={onClick}
      className={`resonance-carousel__control resonance-carousel__control--${direction}`}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        className="w-full h-full"
      >
        <path
          d={path}
          stroke="#ffffff"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </button>
  );
}

export function ResonanceCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const [trackCentered, setTrackCentered] = useState(false);

  const syncTrackLayout = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const overflow = track.scrollWidth - track.clientWidth;
    const fits = overflow <= 1;

    setTrackCentered(fits);
    track.classList.toggle("resonance-carousel__track--centered", fits);

    if (fits) {
      track.scrollLeft = 0;
    }
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    syncTrackLayout();

    const observer = new ResizeObserver(syncTrackLayout);
    observer.observe(track);

    window.addEventListener("resize", syncTrackLayout);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncTrackLayout);
    };
  }, [syncTrackLayout]);

  const scrollStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 400;
    const card = track.querySelector<HTMLElement>(".resonance-card");
    if (!card) return 400;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "40");
    return card.offsetWidth + gap;
  }, []);

  function scroll(dir: -1 | 1) {
    trackRef.current?.scrollBy({ left: dir * scrollStep(), behavior: "smooth" });
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track || event.button !== 0 || track.scrollWidth <= track.clientWidth) return;

    dragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
      moved: false,
    };
    setDragging(true);
    track.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track || !dragRef.current.active) return;

    const delta = event.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 4) dragRef.current.moved = true;
    track.scrollLeft = dragRef.current.scrollLeft - delta;
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track || !dragRef.current.active) return;

    dragRef.current.active = false;
    setDragging(false);
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  }

  function onCardClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (dragRef.current.moved) {
      event.preventDefault();
      dragRef.current.moved = false;
    }
  }

  return (
    <section className="resonance-section">
      <div className="container-site section-heading-band">
        <h2 className="section-title">
          Что вам откликается
          <br />
          сейчас?
        </h2>
      </div>

      <div className="resonance-carousel">
        <div
          ref={trackRef}
          className={`resonance-carousel__track${trackCentered ? " resonance-carousel__track--centered" : ""}${dragging ? " resonance-carousel__track--dragging" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={() => {
            dragRef.current.active = false;
            setDragging(false);
          }}
        >
          {RESONANCE_CARDS.map((card) => (
            <Link
              key={card.href + card.titleLines.join("-")}
              href={card.href}
              onClick={onCardClick}
              draggable={false}
              className="resonance-card"
            >
              <Image
                src={card.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 480px) 280px, 360px"
                draggable={false}
                onLoad={syncTrackLayout}
              />
              <div className="resonance-card__filter" />
              <div className="resonance-card__content">
                <p className="resonance-card__title">
                  {card.titleLines.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
                <div className="resonance-card__btn-wrapper">
                  <span className="btn-resonance">Откликается</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="resonance-carousel__controls">
          <CarouselArrow direction="prev" onClick={() => scroll(-1)} />
          <CarouselArrow direction="next" onClick={() => scroll(1)} />
        </div>
      </div>
    </section>
  );
}
