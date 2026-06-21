import { HeroSection } from "@/components/home/HeroSection";
import { ProgramCatalog } from "@/components/home/ProgramCatalog";
import { ResonanceCarousel } from "@/components/home/ResonanceCarousel";
import { EventsCalendar } from "@/components/home/EventsCalendar";
import { SupportTabs } from "@/components/home/SupportTabs";
import { FeaturePillars } from "@/components/home/FeaturePillars";
import { VideoTabs } from "@/components/home/VideoTabs";
import { DiplomasSection } from "@/components/home/DiplomasSection";
import { PathSection } from "@/components/home/PathSection";
import { IMAGES } from "@/lib/site-data";

export default async function HomePage() {
  const media = {
    "hero-portrait": IMAGES.heroPortrait,
    diploma: IMAGES.diploma,
  };

  return (
    <>
      <HeroSection heroPortrait={media["hero-portrait"] || IMAGES.heroPortrait} />
      <ProgramCatalog />
      <ResonanceCarousel />
      <EventsCalendar />
      <SupportTabs />
      <FeaturePillars />
      <VideoTabs />
      <DiplomasSection diplomaUrl={media.diploma} />
      <PathSection />
    </>
  );
}
