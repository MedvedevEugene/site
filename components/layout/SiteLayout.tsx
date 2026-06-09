"use client";

import { useState, type ReactNode } from "react";
import { TopBar, Header, Footer } from "./SiteChrome";
import { CallbackPopup, CookieBanner } from "@/components/forms/CallbackPopup";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <>
      <TopBar onCallbackClick={() => setCallbackOpen(true)} />
      <Header onCallbackClick={() => setCallbackOpen(true)} />
      <main>{children}</main>
      <Footer />
      <CallbackPopup open={callbackOpen} onClose={() => setCallbackOpen(false)} />
      <CookieBanner />
    </>
  );
}
