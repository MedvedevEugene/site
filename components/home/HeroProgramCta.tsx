"use client";

import { SafeImage } from "@/components/ui/SafeImage";
import { IMAGES } from "@/lib/site-data";
import { useProgramPopup } from "@/components/layout/ProgramPopupContext";

export function HeroProgramCta() {
  const { openProgramPopup } = useProgramPopup();

  return (
    <button type="button" onClick={openProgramPopup} className="hero-tilda__cta">
      <SafeImage
        src="/images/hero/cta-favicon.svg"
        alt=""
        width={20}
        height={20}
        className="w-5 h-5 shrink-0"
      />
      Выбрать программу
    </button>
  );
}
