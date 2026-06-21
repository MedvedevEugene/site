"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { CallbackPopupVariantId } from "@/lib/callback-popup-variants";

const CallbackPopupContext = createContext<{
  openCallbackPopup: (variant?: CallbackPopupVariantId) => void;
}>({
  openCallbackPopup: () => {},
});

export function CallbackPopupProvider({
  children,
  onOpen,
}: {
  children: ReactNode;
  onOpen: (variant: CallbackPopupVariantId) => void;
}) {
  return (
    <CallbackPopupContext.Provider
      value={{
        openCallbackPopup: (variant = "default") => onOpen(variant),
      }}
    >
      {children}
    </CallbackPopupContext.Provider>
  );
}

export function useCallbackPopup() {
  return useContext(CallbackPopupContext);
}
