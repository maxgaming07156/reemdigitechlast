"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({ value, onChange, placeholder }: TagInputProps) {
  const [draft, setDraft] = React.useState("");

  function addTag() {
    const trimmed = draft.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setDraft("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  return (
    <div>
      <div
        className={cn(
          "flex flex-wrap items-center gap-2 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-3 py-2 min-h-11 focus-within:ring-2 focus-within:ring-indigo-500"
        )}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-full bg-indigo-50 dark:bg-indigo-500/15 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300"
          >
            {tag}
            <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addTag();
            } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
              removeTag(value[value.length - 1]);
            }
          }}
          onBlur={addTag}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[100px] bg-transparent text-sm outline-none placeholder:text-ink-400"
        />
      </div>
      <p className="mt-1.5 text-xs text-ink-400">Press Enter or comma to add a tag.</p>
    </div>
  );
}
