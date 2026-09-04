import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline" | "danger" | "warning" | "success";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-muted text-foreground border border-border",
    accent: "bg-accent text-accentForeground font-bold",
    outline: "bg-transparent text-foreground border border-border",
    danger: "bg-red-950/80 text-red-300 border border-red-800",
    warning: "bg-amber-950/80 text-amber-300 border border-amber-800",
    success: "bg-emerald-950/80 text-emerald-300 border border-emerald-800",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-mono uppercase tracking-wider select-none",
        variantStyles,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
