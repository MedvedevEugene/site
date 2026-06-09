import Link from "next/link";
import type { Metadata } from "next";

interface PageShellProps {
  title: string;
  description: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}

export function PageShell({ title, description, breadcrumbs = [], children }: PageShellProps) {
  return (
    <section className="py-8 md:py-12">
      <div className="container-site">
        <div className="text-sm text-muted mb-6">
          <Link href="/">Главная</Link>
          {breadcrumbs.map((b) => (
            <span key={b.label}>
              {" / "}
              {b.href ? <Link href={b.href}>{b.label}</Link> : b.label}
            </span>
          ))}
        </div>
        <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium m-0 mb-4">{title}</h1>
        <p className="text-lg text-muted max-w-[720px] m-0 mb-10">{description}</p>
        {children}
      </div>
    </section>
  );
}

export function createPageMetadata(title: string): Metadata {
  return { title };
}
