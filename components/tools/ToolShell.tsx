"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export function ToolShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="py-8 md:py-12">
      <div className="container-site">
        <nav className="text-sm text-muted mb-6">
          <Link href="/">Главная</Link>
          {" / "}
          <Link href="/individual-consultations">Психологическая помощь</Link>
          {" / "}
          <span>{title}</span>
        </nav>
        <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium m-0 mb-4">{title}</h1>
        <p className="text-lg text-muted max-w-[640px] m-0 mb-10">{description}</p>
        {children}
      </div>
    </section>
  );
}
