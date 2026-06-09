"use client";

import { useState, type ReactNode } from "react";
import { TopBar, Header, Footer } from "./SiteChrome";
import { CallbackPopup } from "@/components/forms/CallbackPopup";
import { CookieBanner } from "@/components/forms/CookieBanner";

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
