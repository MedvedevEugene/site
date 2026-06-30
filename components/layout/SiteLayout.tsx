"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { TopBar, Header } from "./SiteChrome";
import { CallbackPopup, CookieBanner } from "@/components/forms/CallbackPopup";
import { ProgramSelectionPopup } from "@/components/forms/ProgramSelectionPopup";
import { ProgramPopupProvider } from "@/components/layout/ProgramPopupContext";
import { CallbackPopupProvider } from "@/components/layout/CallbackPopupContext";
import { ContactFooterSection } from "@/components/layout/ContactFooterSection";
import type { CallbackPopupVariantId } from "@/lib/callback-popup-variants";

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const standaloneLanding = pathname === "/business-cource";
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [callbackVariant, setCallbackVariant] = useState<CallbackPopupVariantId>("default");
  const [programOpen, setProgramOpen] = useState(false);

  function openCallback(variant: CallbackPopupVariantId = "default") {
    setCallbackVariant(variant);
    setCallbackOpen(true);
  }

  return (
    <CallbackPopupProvider onOpen={openCallback}>
      <ProgramPopupProvider onOpen={() => setProgramOpen(true)}>
        {!standaloneLanding && (
          <>
            <TopBar onCallbackClick={() => openCallback("default")} />
            <div className="site-nav bg-white">
              <Header onCallbackClick={() => openCallback("default")} />
            </div>
          </>
        )}
        <main>{children}</main>
        {!standaloneLanding && <ContactFooterSection />}
        <CallbackPopup
          open={callbackOpen}
          variant={callbackVariant}
          onClose={() => setCallbackOpen(false)}
        />
        <ProgramSelectionPopup open={programOpen} onClose={() => setProgramOpen(false)} />
        <CookieBanner />
      </ProgramPopupProvider>
    </CallbackPopupProvider>
  );
}
