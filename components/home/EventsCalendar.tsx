import { TimetableCalendar } from "@/components/calendar/TimetableCalendar";

export function EventsCalendar() {
  return (
    <section className="section bg-white">
      <div className="container-site">
        <h2 className="section-title">Мероприятия и анонсы событий</h2>
        <div className="calendar-shell mt-10">
          <TimetableCalendar compact />
        </div>
      </div>
    </section>
  );
}
