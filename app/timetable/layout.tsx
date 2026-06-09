import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Расписание",
};

export default function TimetableLayout({ children }: { children: ReactNode }) {
  return children;
}
