import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-ink-100 text-ink-700 dark:bg-ink-700 dark:text-ink-200",
        indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
        amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
        green: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
        red: "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300",
        blue: "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
