import type { Metadata } from "next";
import { Unbounded, Montserrat } from "next/font/google";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SITE } from "@/lib/constants";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.fullName}`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "Обучение и расстановки, которые помогают обрести устойчивость в жизни, отношениях и бизнесе.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${montserrat.variable}`}>
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
