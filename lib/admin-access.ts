export type UserRole = "user" | "admin";

const DEFAULT_ADMIN_EMAILS = ["medvedev_ea67@mail.ru"];

export function getAdminEmailList() {
  const fromEnv = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return [...new Set([...DEFAULT_ADMIN_EMAILS, ...fromEnv])];
}

export function isAdminEmail(email: string) {
  return getAdminEmailList().includes(email.trim().toLowerCase());
}

export function resolveUserRole(email: string, dbRole?: string | null): UserRole {
  if (dbRole === "admin" || isAdminEmail(email)) return "admin";
  return "user";
}
