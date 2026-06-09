import { CALENDAR_EMBED_MONTH } from "@/lib/site-data";

export function EventsCalendar() {
  return (
    <section className="section bg-white">
      <div className="container-site">
        <h2 className="section-title">Мероприятия и анонсы событий</h2>
        <div className="rounded-[20px] border border-border overflow-hidden bg-white h-[520px]">
          <iframe
            title="Календарь ИЖСИЗ"
            src={CALENDAR_EMBED_MONTH}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
