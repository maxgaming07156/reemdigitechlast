"use client";

import * as React from "react";
import { Eye, Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { renderMarkdown } from "@/lib/markdown";
import { cn } from "@/lib/utils";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

export function MarkdownEditor({ value, onChange, rows = 16 }: MarkdownEditorProps) {
  const [mode, setMode] = React.useState<"write" | "preview">("write");

  return (
    <div className="rounded-xl border border-ink-200 dark:border-ink-700 overflow-hidden">
      <div className="flex items-center gap-1 border-b border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-900 px-2 py-1.5">
        <button
          type="button"
          onClick={() => setMode("write")}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
            mode === "write"
              ? "bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm"
              : "text-ink-500 hover:text-ink-700"
          )}
        >
          <Pencil className="h-3.5 w-3.5" /> Write
        </button>
        <button
          type="button"
          onClick={() => setMode("preview")}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
            mode === "preview"
              ? "bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm"
              : "text-ink-500 hover:text-ink-700"
          )}
        >
          <Eye className="h-3.5 w-3.5" /> Preview
        </button>
        <span className="ml-auto pr-2 text-[11px] text-ink-400">Markdown supported — # ## ### **bold** *italic*</span>
      </div>

      {mode === "write" ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="border-0 rounded-none focus-visible:ring-0 font-mono text-sm"
          placeholder="# Your article title&#10;&#10;Start writing in markdown…"
        />
      ) : (
        <div
          className="p-4 min-h-[200px] max-h-[480px] overflow-y-auto text-sm [&_h1]:font-display [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:mt-4 [&_h1]:mb-2 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:font-display [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1.5 [&_p]:text-ink-600 dark:[&_p]:text-ink-300 [&_p]:leading-relaxed [&_p]:mb-3"
          dangerouslySetInnerHTML={{ __html: value ? renderMarkdown(value) : "<p class='text-ink-400'>Nothing to preview yet.</p>" }}
        />
      )}
    </div>
  );
}
