"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

function AccordionToggleIcon({ open }: { open: boolean }) {
  return (
    <span className="ic-accordion__icon" aria-hidden>
      <span className="ic-accordion__icon-circle" />
      <svg
        className={`ic-accordion__icon-svg ${open ? "ic-accordion__icon-svg--open" : ""}`}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          fillRule="evenodd"
          stroke="#222222"
          strokeLinecap="square"
          strokeWidth="1"
          transform="translate(1 1)"
        >
          <path className="ic-accordion__icon-h" d="M0 11h22" />
          <path className="ic-accordion__icon-v" d="M11 0v22" />
        </g>
      </svg>
    </span>
  );
}

export function FAQ({
  items,
  variant = "default",
}: {
  items: FAQItem[];
  variant?: "default" | "ic-accordion";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (variant === "ic-accordion") {
    return (
      <div className="ic-accordion">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <article key={item.question} className="ic-accordion__item">
              <div className={`ic-accordion__card${isOpen ? " is-open" : ""}`}>
                <button
                  type="button"
                  className="ic-accordion__trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="ic-accordion__question">{item.question}</span>
                  <AccordionToggleIcon open={isOpen} />
                </button>
                {isOpen && (
                  <div className="ic-accordion__panel">
                    <p className="ic-accordion__answer">{item.answer}</p>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="accordion-item w-full border-0"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <span className="text-2xl font-light shrink-0 leading-none">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <p className="px-6 pb-2 m-0 text-muted text-[15px] leading-relaxed">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
