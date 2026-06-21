import { AdminEventsCalendar } from "@/components/calendar/AdminEventsCalendar";

export function EventsCalendar() {
  return (
    <section className="bg-white pb-[70px]">
      <div className="container-site section-heading-band">
        <h2 className="section-title">
          Мероприятия
          <br />
          и анонсы событий
        </h2>
      </div>
      <div className="container-site">
        <AdminEventsCalendar shellClassName="mt-10" />
      </div>
    </section>
  );
}
