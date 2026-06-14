"use client";

import { SafeImage } from "@/components/ui/SafeImage";
import { IMAGES } from "@/lib/site-data";
import { useProgramPopup } from "@/components/layout/ProgramPopupContext";

export function HeroProgramCta() {
  const { openProgramPopup } = useProgramPopup();

  return (
    <button type="button" onClick={openProgramPopup} className="hero-tilda__cta">
      <SafeImage
        src={IMAGES.logoCircle}
        alt=""
        width={19}
        height={19}
        className="w-[19px] h-[19px] shrink-0"
      />
      Подобрать программу
    </button>
  );
}
