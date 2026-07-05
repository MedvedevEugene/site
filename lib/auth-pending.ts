import { SignJWT, jwtVerify } from "jose";

const PENDING_COOKIE = "izhsiz_auth_pending";

function getSecret() {
  const raw = process.env.USER_SESSION_SECRET || process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!raw) return null;
  return new TextEncoder().encode(raw);
}

export async function createPendingLoginToken(email: string, code: string) {
  const secret = getSecret();
  if (!secret) throw new Error("USER_SESSION_SECRET not configured");

  return new SignJWT({ purpose: "login", email, code })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);
}

export async function verifyPendingLoginToken(token: string) {
  const secret = getSecret();
  if (!secret) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    if (
      payload.purpose !== "login" ||
      typeof payload.email !== "string" ||
      typeof payload.code !== "string"
    ) {
      return null;
    }
    return { email: payload.email, code: payload.code };
  } catch {
    return null;
  }
}

export { PENDING_COOKIE };
