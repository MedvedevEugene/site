"use client";

import { useState, type ReactNode } from "react";
import { TopBar, Header } from "./SiteChrome";
import { CallbackPopup, CookieBanner } from "@/components/forms/CallbackPopup";
import { ContactFooterSection } from "@/components/layout/ContactFooterSection";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <>
      <TopBar onCallbackClick={() => setCallbackOpen(true)} />
      <Header onCallbackClick={() => setCallbackOpen(true)} />
      <main>{children}</main>
      <ContactFooterSection />
      <CallbackPopup open={callbackOpen} onClose={() => setCallbackOpen(false)} />
      <CookieBanner />
    </>
  );
}
