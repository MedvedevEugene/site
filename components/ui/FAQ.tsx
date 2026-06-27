"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

function AccordionToggleIcon({ open }: { open: boolean }) {
  return (
    <span className="ic-accordion__icon-stack" aria-hidden>
      <span className="ic-accordion__icon ic-accordion__icon--default">
        <span className={`ic-accordion__icon-lines${open ? " is-open" : ""}`} />
        <span className="ic-accordion__icon-circle" />
      </span>
      <span className="ic-accordion__icon ic-accordion__icon--hover">
        <span className={`ic-accordion__icon-lines${open ? " is-open" : ""}`} />
        <span className="ic-accordion__icon-circle is-visible" />
      </span>
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
                <div className="ic-accordion__header">
                  <button
                    type="button"
                    className="ic-accordion__trigger"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="ic-accordion__question">{item.question}</span>
                    <AccordionToggleIcon open={isOpen} />
                  </button>
                </div>
                <div className="ic-accordion__panel" aria-hidden={!isOpen}>
                  <div className="ic-accordion__panel-inner">
                    <div className="ic-accordion__textwrapper">
                      <p className="ic-accordion__answer">{item.answer}</p>
                    </div>
                  </div>
                </div>
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
