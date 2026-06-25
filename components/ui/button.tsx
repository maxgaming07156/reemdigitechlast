import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-ink-900 text-white hover:bg-ink-800 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100",
        indigo: "bg-indigo-500 text-white hover:bg-indigo-600 shadow-[0_0_0_0_rgba(18,109,206,0.4)] hover:shadow-[0_0_24px_4px_rgba(18,109,206,0.35)]",
        amber: "bg-amber-400 text-ink-900 hover:bg-amber-300",
        outline: "border border-ink-200 dark:border-ink-700 bg-transparent hover:bg-ink-50 dark:hover:bg-ink-800",
        ghost: "hover:bg-ink-100 dark:hover:bg-ink-800",
        link: "text-indigo-500 underline-offset-4 hover:underline",
        white: "bg-white text-ink-900 hover:bg-white/90",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
