import { NextResponse } from "next/server";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
  link?: string;
}

const DEMO_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "Расстановочная группа (онлайн)",
    start: "2026-06-15T10:00:00+03:00",
    end: "2026-06-15T18:00:00+03:00",
    description: "Групповая работа с личными запросами",
  },
  {
    id: "2",
    title: "Базовый курс — модуль 3",
    start: "2026-06-20T11:00:00+03:00",
    end: "2026-06-20T15:00:00+03:00",
    description: "Обучение расстановкам",
  },
  {
    id: "3",
    title: "Индивидуальные консультации",
    start: "2026-06-22T09:00:00+03:00",
    end: "2026-06-22T21:00:00+03:00",
    description: "Запись через сайт",
  },
];

export async function GET() {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;

  if (calendarId && apiKey) {
    const now = new Date().toISOString();
    const url = new URL("https://www.googleapis.com/calendar/v3/calendars/" + encodeURIComponent(calendarId) + "/events");
    url.searchParams.set("key", apiKey);
    url.searchParams.set("timeMin", now);
    url.searchParams.set("maxResults", "20");
    url.searchParams.set("singleEvents", "true");
    url.searchParams.set("orderBy", "startTime");

    try {
      const res = await fetch(url.toString(), { next: { revalidate: 300 } });
      const data = await res.json();

      const events: CalendarEvent[] = (data.items || []).map((item: {
        id: string;
        summary: string;
        description?: string;
        location?: string;
        htmlLink?: string;
        start: { dateTime?: string; date?: string };
        end: { dateTime?: string; date?: string };
      }) => ({
        id: item.id,
        title: item.summary,
        description: item.description,
        location: item.location,
        link: item.htmlLink,
        start: item.start.dateTime || item.start.date || "",
        end: item.end.dateTime || item.end.date || "",
      }));

      return NextResponse.json({ events, source: "google" });
    } catch {
      return NextResponse.json({ events: DEMO_EVENTS, source: "demo" });
    }
  }

  return NextResponse.json({ events: DEMO_EVENTS, source: "demo" });
}
