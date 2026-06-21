import { TimetableCalendar } from "@/components/calendar/TimetableCalendar";

interface AdminEventsCalendarProps {
  shellClassName?: string;
}

export function AdminEventsCalendar({ shellClassName = "" }: AdminEventsCalendarProps) {
  return (
    <div className={`calendar-shell ${shellClassName}`.trim()}>
      <TimetableCalendar compact />
    </div>
  );
}
