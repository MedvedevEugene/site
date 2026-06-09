"use client";

import { useEffect, useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-[800px] mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="border-b border-border">
            <button
              type="button"
              className="w-full bg-transparent border-0 text-left py-5 text-base font-medium flex justify-between items-center gap-4"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              {item.question}
              <span className="text-2xl font-light shrink-0">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <p className="pb-5 m-0 text-muted text-[15px] leading-relaxed">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
