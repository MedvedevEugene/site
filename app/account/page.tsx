import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AccountSection } from "@/components/account/AccountSection";
import { AccountNoAdminNotice } from "@/components/account/AccountNoAdminNotice";

export const metadata: Metadata = {
  title: "Мой аккаунт",
};

export default function AccountPage() {
  return (
    <section className="py-8 md:py-12">
      <div className="container-site">
        <nav className="text-sm text-muted mb-6">
          <Link href="/">Главная</Link>
          {" / "}
          <span>Мой аккаунт</span>
        </nav>
        <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium m-0 mb-4">Мой аккаунт</h1>
        <p className="text-lg text-muted max-w-[640px] m-0 mb-10">
          Вход по email, история прохождений ИИ-инструментов и доступ к админ-панели для администраторов.
        </p>
        <Suspense fallback={null}>
          <AccountNoAdminNotice />
        </Suspense>
        <AccountSection />
      </div>
    </section>
  );
}
