"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

type Specialist = {
  slug: string;
  name: string;
  role: string;
  photo: string;
};

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
      className={`ic-specialists-carousel__control ic-specialists-carousel__control--${direction}`}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        className="w-full h-full"
      >
        <path d={path} stroke="#ffffff" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </button>
  );
}

type IcSpecialistsCarouselProps = {
  specialists: readonly Specialist[];
  onBook: () => void;
};

export function IcSpecialistsCarousel({ specialists, onBook }: IcSpecialistsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const initialScrollDone = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [trackCentered, setTrackCentered] = useState(false);

  const syncTrackLayout = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const overflow = track.scrollWidth - track.clientWidth;
    const fits = overflow <= 1;

    setTrackCentered(fits);
    track.classList.toggle("ic-specialists-carousel__track--centered", fits);

    if (fits) {
      track.scrollLeft = 0;
      initialScrollDone.current = false;
      return;
    }

    if (!initialScrollDone.current) {
      track.scrollLeft = 0;
      initialScrollDone.current = true;
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
  }, [syncTrackLayout, specialists.length]);

  const scrollStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 400;
    const card = track.querySelector<HTMLElement>(".ic-specialist");
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

  function onBookClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (dragRef.current.moved) {
      event.preventDefault();
      dragRef.current.moved = false;
      return;
    }
    onBook();
  }

  return (
    <div className="ic-specialists-carousel">
      <div
        ref={trackRef}
        className={`ic-specialists-carousel__track${trackCentered ? " ic-specialists-carousel__track--centered" : ""}${dragging ? " ic-specialists-carousel__track--dragging" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={() => {
          dragRef.current.active = false;
          setDragging(false);
        }}
      >
        {specialists.map((specialist) => (
          <article key={specialist.slug} className="ic-specialist">
            <div className="ic-specialist__media">
              <Image
                src={specialist.photo}
                alt={specialist.name}
                fill
                className="object-cover object-top"
                sizes="360px"
                draggable={false}
                onLoad={syncTrackLayout}
              />
            </div>
            <div className="ic-specialist__content">
              <div className="ic-specialist__body">
                <p className="ic-specialist__name">{specialist.name}</p>
                <p className="ic-specialist__role">{specialist.role}</p>
                <div className="ic-specialist__actions">
                  <button
                    type="button"
                    className="ic-specialist__btn ic-specialist__btn--primary"
                    onClick={onBookClick}
                  >
                    Запись
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="ic-specialists-carousel__controls">
        <CarouselArrow direction="prev" onClick={() => scroll(-1)} />
        <CarouselArrow direction="next" onClick={() => scroll(1)} />
      </div>
    </div>
  );
}
