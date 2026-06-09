"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
