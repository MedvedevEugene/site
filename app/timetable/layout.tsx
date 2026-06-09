import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Расписание",
};

export default function TimetableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
