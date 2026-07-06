"use client";

import { useEffect, useState } from "react";
import { AdminShell, AdminCard } from "@/components/admin/AdminShell";
import { LEAD_STATUS_LABELS, LEAD_TYPE_LABELS, leadTypeLabel, type LeadStatus } from "@/lib/lead-labels";

type LeadRow = {
  id: string;
  type: string;
  status: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  contactMethod: string | null;
  comment: string | null;
  source: string | null;
  createdAt: string;
};

type StatusFilter = LeadStatus | "all";

const FILTERS: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "new", label: "Новые" },
  { id: "in_progress", label: "В работе" },
  { id: "done", label: "Завершённые" },
  { id: "spam", label: "Спам" },
];

export function AdminLeadsClient() {
  const [filter, setFilter] = useState<StatusFilter>("new");
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const qs = filter === "all" ? "" : `?status=${filter}`;
      const res = await fetch(`/api/admin/leads${qs}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Не удалось загрузить заявки");
        return;
      }
      setLeads(data.leads || []);
      setCounts(data.counts || {});
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [filter]);

  async function setStatus(id: string, status: LeadStatus) {
    const res = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) load();
  }

  function countFor(id: StatusFilter) {
    if (id === "all") return counts.all || 0;
    return counts[id] || 0;
  }

  return (
    <AdminShell>
      <AdminCard title="Заявки и лиды (CRM)">
        <p className="text-sm text-muted m-0 mb-6">
          Все обращения с сайта: обратный звонок, футер, квиз консультации, попапы курсов. Telegram-уведомления
          остаются, если настроен бот.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                filter === f.id
                  ? "bg-[#272344] text-white border-[#272344]"
                  : "bg-white text-muted border-border hover:border-primary"
              }`}
            >
              {f.label}
              <span className="ml-1.5 opacity-70">({countFor(f.id)})</span>
            </button>
          ))}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {loading ? (
          <p className="text-muted animate-pulse">Загрузка…</p>
        ) : leads.length === 0 ? (
          <p className="text-muted m-0">Заявок в этой категории пока нет.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {leads.map((lead) => (
              <div key={lead.id} className="border border-border rounded-[12px] p-4 bg-[#fafaf8]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-sm">
                      {lead.name || "Без имени"}
                      <span className="text-muted font-normal ml-2">
                        {new Date(lead.createdAt).toLocaleString("ru-RU")}
                      </span>
                    </div>
                    <div className="text-xs text-primary mt-1">
                      {leadTypeLabel(lead.type)}
                      {lead.source ? ` · ${lead.source}` : ""}
                    </div>
                    <div className="text-sm mt-2 space-y-0.5">
                      {lead.phone && <div>📞 {lead.phone}</div>}
                      {lead.email && <div>✉️ {lead.email}</div>}
                      {lead.contactMethod && <div>Связь: {lead.contactMethod}</div>}
                    </div>
                  </div>
                  <select
                    value={lead.status}
                    onChange={(e) => setStatus(lead.id, e.target.value as LeadStatus)}
                    className="text-sm border border-border rounded-lg px-3 py-2 bg-white"
                  >
                    {(Object.keys(LEAD_STATUS_LABELS) as LeadStatus[]).map((s) => (
                      <option key={s} value={s}>
                        {LEAD_STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </div>
                {lead.comment && (
                  <div className="mt-3">
                    <button
                      type="button"
                      className="text-xs text-primary underline"
                      onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                    >
                      {expanded === lead.id ? "Скрыть комментарий" : "Показать комментарий"}
                    </button>
                    {expanded === lead.id && (
                      <p className="text-sm text-muted m-0 mt-2 whitespace-pre-wrap">{lead.comment}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <details className="mt-8 text-xs text-muted">
          <summary className="cursor-pointer">Типы заявок</summary>
          <ul className="mt-2 pl-4">
            {Object.entries(LEAD_TYPE_LABELS).map(([k, v]) => (
              <li key={k}>
                {k} — {v}
              </li>
            ))}
          </ul>
        </details>
      </AdminCard>
    </AdminShell>
  );
}
