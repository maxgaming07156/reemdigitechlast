"use client";

import * as React from "react";
import { Loader2, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface AdminNotesFieldProps {
  initialValue: string | null;
  onSave: (notes: string) => Promise<{ success: boolean; message: string }>;
}

export function AdminNotesField({ initialValue, onSave }: AdminNotesFieldProps) {
  const [value, setValue] = React.useState(initialValue ?? "");
  const [savedValue, setSavedValue] = React.useState(initialValue ?? "");
  const [status, setStatus] = React.useState<"idle" | "saving" | "saved">("idle");

  async function handleBlur() {
    if (value === savedValue) return;
    setStatus("saving");
    const result = await onSave(value);
    if (result.success) {
      setSavedValue(value);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1500);
    } else {
      setStatus("idle");
    }
  }

  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        rows={2}
        placeholder="Add a private note…"
        className="text-xs py-2 pr-8"
      />
      <span className="absolute top-2 right-2">
        {status === "saving" && <Loader2 className="h-3.5 w-3.5 animate-spin text-ink-400" />}
        {status === "saved" && <Check className="h-3.5 w-3.5 text-emerald-500" />}
      </span>
    </div>
  );
}
