"use client";

import { createContext, useContext, type ReactNode } from "react";

const ProgramPopupContext = createContext<{ openProgramPopup: () => void }>({
  openProgramPopup: () => {},
});

export function ProgramPopupProvider({
  children,
  onOpen,
}: {
  children: ReactNode;
  onOpen: () => void;
}) {
  return (
    <ProgramPopupContext.Provider value={{ openProgramPopup: onOpen }}>
      {children}
    </ProgramPopupContext.Provider>
  );
}

export function useProgramPopup() {
  return useContext(ProgramPopupContext);
}
