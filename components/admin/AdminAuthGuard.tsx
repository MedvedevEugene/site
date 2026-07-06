import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { hasAdminAccess } from "@/lib/require-admin";

export async function AdminAuthGuard({ children }: { children: ReactNode }) {
  if (!(await hasAdminAccess())) {
    redirect("/admin/login");
  }
  return children;
}
