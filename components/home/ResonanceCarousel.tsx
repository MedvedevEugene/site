"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RESONANCE_CARDS } from "@/lib/site-data";

const INITIAL_SNAP_INDEX = 1;
const MAX_SNAP_INDEX = 3;

function CarouselArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}) {
  const path = direction === "prev" ? "M23 13L15.5 20L23 27" : "M17 13L24.5 20L17 27";

  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Предыдущий слайд" : "Следующий слайд"}
      onClick={onClick}
      disabled={disabled}
      className={`resonance-carousel__control resonance-carousel__control--${direction}${disabled ? " resonance-carousel__control--disabled" : ""}`}
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
  const activeSnapIndexRef = useRef(INITIAL_SNAP_INDEX);
  const [dragging, setDragging] = useState(false);
  const [activeSnapIndex, setActiveSnapIndex] = useState(INITIAL_SNAP_INDEX);

  activeSnapIndexRef.current = activeSnapIndex;

  const getCards = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [];
    return Array.from(track.querySelectorAll<HTMLElement>(".resonance-card"));
  }, []);

  const getScrollLeftForIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const cards = getCards();
      const card = cards[index];
      if (!track || !card) return 0;

      const target = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
      const max = track.scrollWidth - track.clientWidth;
      return Math.max(0, Math.min(target, max));
    },
    [getCards],
  );

  const scrollToSnapIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const track = trackRef.current;
      if (!track) return;

      const clamped = Math.max(INITIAL_SNAP_INDEX, Math.min(index, MAX_SNAP_INDEX));
      const left = getScrollLeftForIndex(clamped);

      if (behavior === "auto" || behavior === "instant") {
        track.scrollLeft = left;
      } else {
        track.scrollTo({ left, behavior });
      }

      setActiveSnapIndex(clamped);
    },
    [getScrollLeftForIndex],
  );

  useLayoutEffect(() => {
    scrollToSnapIndex(INITIAL_SNAP_INDEX, "auto");
  }, [scrollToSnapIndex]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const syncPosition = () => {
      scrollToSnapIndex(activeSnapIndexRef.current, "auto");
    };

    const observer = new ResizeObserver(syncPosition);
    observer.observe(track);
    window.addEventListener("resize", syncPosition);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncPosition);
    };
  }, [scrollToSnapIndex]);

  function scroll(dir: -1 | 1) {
    scrollToSnapIndex(activeSnapIndex + dir);
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track || event.button !== 0) return;

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

    let nearest = activeSnapIndex;
    let minDistance = Infinity;

    for (let index = INITIAL_SNAP_INDEX; index <= MAX_SNAP_INDEX; index += 1) {
      const distance = Math.abs(track.scrollLeft - getScrollLeftForIndex(index));
      if (distance < minDistance) {
        minDistance = distance;
        nearest = index;
      }
    }

    scrollToSnapIndex(nearest);
  }

  function onCardClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (dragRef.current.moved) {
      event.preventDefault();
      dragRef.current.moved = false;
    }
  }

  const canScrollPrev = activeSnapIndex > INITIAL_SNAP_INDEX;
  const canScrollNext = activeSnapIndex < MAX_SNAP_INDEX;

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
          className={`resonance-carousel__track${dragging ? " resonance-carousel__track--dragging" : ""}`}
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
                onLoad={() => scrollToSnapIndex(activeSnapIndexRef.current, "auto")}
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
          <CarouselArrow direction="prev" onClick={() => scroll(-1)} disabled={!canScrollPrev} />
          <CarouselArrow direction="next" onClick={() => scroll(1)} disabled={!canScrollNext} />
        </div>
      </div>
    </section>
  );
}
