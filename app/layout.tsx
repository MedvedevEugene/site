import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Unbounded, Montserrat } from "next/font/google";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SITE } from "@/lib/constants";
import "./globals.css";
import "./business-course.css";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
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
  children: ReactNode;
}>) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${montserrat.variable}`}>
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
