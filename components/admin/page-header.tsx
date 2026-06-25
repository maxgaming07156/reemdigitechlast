import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  backHref?: string;
  backLabel?: string;
}

export function AdminPageHeader({ title, description, action, backHref, backLabel }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
      <div>
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-indigo-500 transition-colors mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {backLabel ?? "Back"}
          </Link>
        )}
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">{title}</h1>
        {description && <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function AdminEmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink-200 dark:border-ink-700 p-12 text-center">
      <h3 className="font-display font-semibold text-ink-900 dark:text-white">{title}</h3>
      <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400 max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
