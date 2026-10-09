import type { Metadata } from "next";
import { PsychologicalHelpPage } from "@/components/psychological-help/PsychologicalHelpPage";
import { getMediaUrl, getSpecialistDisplayRecords } from "@/lib/content";
import { resolveSpecialistsForCarousel } from "@/lib/specialists-display";
import { prisma } from "@/lib/db";
import { withDbTimeout } from "@/lib/db-timeout";

export const metadata: Metadata = {
  title: "Психологическая помощь",
  description:
    "Индивидуальные консультации, системные расстановки, расстановочные группы и телесно-ориентированная терапия. Поможем выбрать подходящий формат.",
};
export const dynamic = "force-dynamic";
export default async function Page() {
  const [specialists, events, heroImage] = await Promise.all([
    getSpecialistDisplayRecords(),
    withDbTimeout(
      () =>
        prisma.event.findMany({
          where: {
            published: true,
            startAt: { gte: new Date() },
            eventType: {
              in: ["group", "consultation", "webinar", "practice", "meeting"],
            },
          },
          orderBy: { startAt: "asc" },
          take: 3,
        }),
      [],
    ),
    getMediaUrl(
      "psychological-help-hero",
      "/images/individual-consultations/hero.png",
    ),
  ]);
  return (
    <PsychologicalHelpPage
      specialists={resolveSpecialistsForCarousel(specialists)}
      events={events.map((event) => ({
        ...event,
        startAt: event.startAt.toISOString(),
        endAt: event.endAt.toISOString(),
      }))}
      heroImage={heroImage}
    />
  );
}
