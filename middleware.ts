import { NextResponse, type NextRequest } from "next/server";
import { USER_SESSION_COOKIE } from "@/lib/user-auth";

/** Edge: только наличие cookie; полная проверка роли — в layout / API. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasUserCookie = Boolean(request.cookies.get(USER_SESSION_COOKIE)?.value);

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!hasUserCookie) {
      const login = new URL("/admin/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login")) {
    if (!hasUserCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
