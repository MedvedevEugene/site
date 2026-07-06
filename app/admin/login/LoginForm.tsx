"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ToolLogin } from "@/components/tools/ToolLogin";
import { AdminCard } from "@/components/admin/AdminShell";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  return (
    <div className="min-h-screen bg-cream-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AdminCard title="Вход в админ-панель">
          <p className="text-sm text-muted m-0 mb-5">
            Доступ только для email с ролью <strong>admin</strong>. Войдите так же, как в ИИ-инструменты.
            Нет доступа?{" "}
            <Link href="/" className="text-primary underline">
              На главную
            </Link>
          </p>
          <ToolLogin
            variant="inline"
            title="Вход по email"
            description="Код придёт на почту. После входа откроется админ-панель, если ваш email в списке администраторов."
            onSuccess={(user) => {
              if (user.role === "admin") {
                router.push(next);
                router.refresh();
              } else {
                router.push("/account?error=no-admin");
              }
            }}
          />
        </AdminCard>
      </div>
    </div>
  );
}
