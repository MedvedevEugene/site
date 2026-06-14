"use client";

import { useState, type ReactNode } from "react";
import { TopBar, Header } from "./SiteChrome";
import { CallbackPopup, CookieBanner } from "@/components/forms/CallbackPopup";
import { ProgramSelectionPopup } from "@/components/forms/ProgramSelectionPopup";
import { ProgramPopupProvider } from "@/components/layout/ProgramPopupContext";
import { ContactFooterSection } from "@/components/layout/ContactFooterSection";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);

  return (
    <ProgramPopupProvider onOpen={() => setProgramOpen(true)}>
      <TopBar onCallbackClick={() => setCallbackOpen(true)} />
      <div className="site-nav bg-white">
        <Header onCallbackClick={() => setCallbackOpen(true)} />
      </div>
      <main>{children}</main>
      <ContactFooterSection />
      <CallbackPopup open={callbackOpen} onClose={() => setCallbackOpen(false)} />
      <ProgramSelectionPopup open={programOpen} onClose={() => setProgramOpen(false)} />
      <CookieBanner />
    </ProgramPopupProvider>
  );
}
