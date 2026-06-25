"use client";

import * as React from "react";
import Image from "next/image";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ImageUrlListProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

export function ImageUrlList({ value, onChange }: ImageUrlListProps) {
  const [draft, setDraft] = React.useState("");

  function addUrl() {
    const trimmed = draft.trim();
    if (trimmed) {
      onChange([...value, trimmed]);
      setDraft("");
    }
  }

  function removeUrl(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {value.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-ink-100 border border-ink-200 dark:border-ink-700 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Gallery ${i + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeUrl(i)}
                className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink-900/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addUrl();
            }
          }}
          placeholder="https://example.com/image.jpg"
        />
        <Button type="button" variant="outline" onClick={addUrl}>
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>
    </div>
  );
}
