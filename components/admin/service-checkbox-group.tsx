"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllServiceNames } from "@/lib/data/services";

const ALL_SERVICES = getAllServiceNames();

interface ServiceCheckboxGroupProps {
  value: string[];
  onChange: (services: string[]) => void;
}

export function ServiceCheckboxGroup({ value, onChange }: ServiceCheckboxGroupProps) {
  function toggle(service: string) {
    if (value.includes(service)) {
      onChange(value.filter((s) => s !== service));
    } else {
      onChange([...value, service]);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {ALL_SERVICES.map((service) => {
        const checked = value.includes(service);
        return (
          <button
            key={service}
            type="button"
            onClick={() => toggle(service)}
            className={cn(
              "flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-colors text-left",
              checked
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
                : "border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:border-ink-300"
            )}
          >
            <span
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded border shrink-0",
                checked ? "bg-indigo-500 border-indigo-500" : "border-ink-300 dark:border-ink-600"
              )}
            >
              {checked && <Check className="h-3 w-3 text-white" />}
            </span>
            {service}
          </button>
        );
      })}
    </div>
  );
}
