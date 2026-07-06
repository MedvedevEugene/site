import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/auth";
import { isAdminEmail, resolveUserRole, type UserRole } from "@/lib/admin-access";
import { getCurrentUser, USER_SESSION_COOKIE } from "@/lib/user-auth";

function getSecret() {
  const raw = process.env.USER_SESSION_SECRET || process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!raw) return null;
  return new TextEncoder().encode(raw);
}

export async function hasAdminAccess(): Promise<boolean> {
  const cookieStore = await cookies();
  const secret = getSecret();

  const adminToken = cookieStore.get(SESSION_COOKIE)?.value;
  if (adminToken && secret) {
    try {
      const { payload } = await jwtVerify(adminToken, secret);
      if (payload.role === "admin") return true;
    } catch {
      // ignore
    }
  }

  const user = await getCurrentUser();
  if (!user) return false;
  return user.role === "admin";
}

export async function requireAdminApi() {
  if (!(await hasAdminAccess())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function requireAdminUser() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return null;
  return user;
}

export type { UserRole };
