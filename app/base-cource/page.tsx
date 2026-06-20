import { BaseCoursePage } from "@/components/base-course/BaseCoursePage";
import { createPageMetadata } from "@/components/ui/PageShell";

export const metadata = createPageMetadata("Базовый курс по расстановкам");

export default function BaseCourseRoute() {
  return <BaseCoursePage />;
}
