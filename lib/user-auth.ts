import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export const USER_SESSION_COOKIE = "izhsiz_user";

export type UserSession = {
  id: string;
  email: string;
  name: string | null;
};

function getSecret() {
  const raw = process.env.USER_SESSION_SECRET || process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!raw) return null;
  return new TextEncoder().encode(raw);
}

export async function createUserSessionToken(user: UserSession) {
  const secret = getSecret();
  if (!secret) throw new Error("USER_SESSION_SECRET not configured");

  return new SignJWT({ role: "user", sub: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}

export async function verifyUserSessionToken(token: string) {
  const secret = getSecret();
  if (!secret) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "user" || typeof payload.sub !== "string" || typeof payload.email !== "string") {
      return null;
    }
    return { id: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(USER_SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await verifyUserSessionToken(token);
  if (!session) return null;

  const user = await prisma.user.findUnique({ where: { id: session.id } });
  if (!user) return null;

  return { id: user.id, email: user.email, name: user.name };
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function generateAuthCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}
