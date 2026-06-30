import { BusinessCoursePage } from "@/components/business-course/BusinessCoursePage";
import { createPageMetadata } from "@/components/ui/PageShell";

export const metadata = createPageMetadata("Бизнес курс ИЖСИЗ");

export default function BusinessCourseRoute() {
  return <BusinessCoursePage />;
}
