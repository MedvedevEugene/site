"use client";

import { useSearchParams } from "next/navigation";

export function AccountNoAdminNotice() {
  const searchParams = useSearchParams();
  if (searchParams.get("error") !== "no-admin") return null;

  return (
    <p className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 m-0 mb-6 max-w-2xl">
      У этого email нет прав администратора. Попросите добавить вас в разделе «Доступ» у существующего админа
      или укажите email в <code>ADMIN_EMAILS</code> на Vercel.
    </p>
  );
}
