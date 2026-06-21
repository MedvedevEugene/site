import Link from "next/link";
import { AdminEventsCalendar } from "@/components/calendar/AdminEventsCalendar";

export function TimetablePageSection() {
  return (
    <section className="timetable-page bg-white">
      <div className="container-site">
        <nav className="timetable-page__breadcrumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span className="timetable-page__breadcrumbs-sep">/</span>
          <span aria-current="page">Расписание</span>
        </nav>

        <h1 className="timetable-page__title">Расписание</h1>
        <p className="timetable-page__intro">
          В этом разделе вы найдёте расписание всех наших программ, занятий и групп — выберите подходящее
          время, чтобы присоединиться.
        </p>

        <AdminEventsCalendar shellClassName="timetable-page__calendar" />
      </div>
    </section>
  );
}
