"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface StatusOption {
  value: string;
  label: string;
}

interface StatusSelectProps {
  value: string;
  options: StatusOption[];
  onUpdate: (newStatus: string) => Promise<{ success: boolean; message: string }>;
  colorMap: Record<string, string>;
}

export function StatusSelect({ value, options, onUpdate, colorMap }: StatusSelectProps) {
  const router = useRouter();
  const [current, setCurrent] = React.useState(value);
  const [isPending, setIsPending] = React.useState(false);

  async function handleChange(newStatus: string) {
    setIsPending(true);
    const previous = current;
    setCurrent(newStatus);
    const result = await onUpdate(newStatus);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      setCurrent(previous);
      toast.error(result.message);
    }
    setIsPending(false);
  }

  return (
    <Select value={current} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger
        className={cn(
          "h-8 w-auto min-w-[120px] text-xs font-medium border-0 capitalize",
          colorMap[current] ?? "bg-ink-100 text-ink-700"
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="capitalize">
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
