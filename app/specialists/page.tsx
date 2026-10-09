import type { Metadata } from "next";
import { SpecialistsPage } from "@/components/specialists/SpecialistsPage";
import { getSpecialistDisplayRecords } from "@/lib/content";
import { resolveSpecialistsForCarousel } from "@/lib/specialists-display";
export const metadata: Metadata = { title: "Специалисты ИЖСИЗ", description: "Психологи, системные расстановщики, преподаватели и ведущие групп института. Выберите специалиста или оставьте заявку на подбор." };
export const dynamic = "force-dynamic";
export default async function Page() { return <SpecialistsPage specialists={resolveSpecialistsForCarousel(await getSpecialistDisplayRecords())} />; }
