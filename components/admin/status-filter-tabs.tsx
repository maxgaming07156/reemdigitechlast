"use client";

import { cn } from "@/lib/utils";

interface StatusFilterTabsProps {
  options: { value: string; label: string; count: number }[];
  active: string;
  onChange: (value: string) => void;
}

export function StatusFilterTabs({ options, active, onChange }: StatusFilterTabsProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
            active === opt.value
              ? "bg-ink-900 dark:bg-white text-white dark:text-ink-900"
              : "bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-ink-200 dark:hover:bg-ink-700"
          )}
        >
          {opt.label} <span className="opacity-60">{opt.count}</span>
        </button>
      ))}
    </div>
  );
}
