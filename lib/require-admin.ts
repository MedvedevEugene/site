import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/user-auth";

export async function requireAdminApi() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function requireAdminUser() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function hasAdminAccess(): Promise<boolean> {
  const user = await getCurrentUser();
  return Boolean(user && user.role === "admin");
}

export type { UserRole } from "@/lib/admin-access";
