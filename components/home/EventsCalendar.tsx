import { TimetableCalendar } from "@/components/calendar/TimetableCalendar";

export function EventsCalendar() {
  return (
    <section className="section bg-white">
      <div className="container-site">
        <h2 className="section-title">Мероприятия и анонсы событий</h2>
        <TimetableCalendar compact />
        <p className="text-sm text-muted mt-6 text-center m-0">
          Расписание обновляется через админ-панель института.
        </p>
      </div>
    </section>
  );
}
