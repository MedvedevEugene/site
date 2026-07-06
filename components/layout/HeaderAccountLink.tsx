"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function HeaderAccountLink() {
  const [label, setLabel] = useState("Войти");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user?.email) {
          setLabel(d.user.role === "admin" ? "Профиль · admin" : "Профиль");
        }
      })
      .catch(() => {});
  }, []);

  return (
    <Link href="/account" className="hover:opacity-70 whitespace-nowrap text-base">
      {label}
    </Link>
  );
}
