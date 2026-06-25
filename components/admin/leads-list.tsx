"use client";

import * as React from "react";
import { LeadCard } from "@/components/admin/lead-card";
import { StatusFilterTabs } from "@/components/admin/status-filter-tabs";
import { AdminEmptyState } from "@/components/admin/page-header";
import type { Lead, LeadStatus } from "@/types/database";

export function LeadsList({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = React.useState<"all" | LeadStatus>("all");

  const counts = React.useMemo(() => {
    const base: Record<string, number> = { all: leads.length, new: 0, contacted: 0, qualified: 0, closed: 0, lost: 0 };
    for (const lead of leads) base[lead.status]++;
    return base;
  }, [leads]);

  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  const options = [
    { value: "all", label: "All", count: counts.all },
    { value: "new", label: "New", count: counts.new },
    { value: "contacted", label: "Contacted", count: counts.contacted },
    { value: "qualified", label: "Qualified", count: counts.qualified },
    { value: "closed", label: "Closed", count: counts.closed },
    { value: "lost", label: "Lost", count: counts.lost },
  ];

  return (
    <div>
      <div className="mb-5">
        <StatusFilterTabs options={options} active={filter} onChange={(v) => setFilter(v as typeof filter)} />
      </div>

      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No leads in this view"
          description="Try a different filter, or check back once new submissions come in."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  );
}
