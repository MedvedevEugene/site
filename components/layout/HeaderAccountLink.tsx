"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export function HeaderAccountLink() {
  const [label, setLabel] = useState("Личный кабинет");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/auth/me", { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => {
        if (d.user?.email)
          setLabel(d.user.name?.trim().split(/\s+/)[0] || "Личный кабинет");
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return (
    <Link href="/account" className="header-account-link">
      <svg
        width="12"
        height="16"
        viewBox="0 0 12 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="6" cy="4" r="3" />
        <path d="M1 13c0-6 10-6 10 0v1H1Z" />
      </svg>
      {label}
    </Link>
  );
}
