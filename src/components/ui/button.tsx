import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent-solid";
  size?: "sm" | "default" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    // Primary is text-only with animated underline
    if (variant === "primary") {
      const sizeClasses = {
        sm: "text-xs py-1.5 gap-1.5",
        default: "text-sm py-2.5 gap-2",
        lg: "text-base py-3.5 gap-2.5",
      }[size];

      return (
        <button
          ref={ref}
          className={cn(
            "group relative inline-flex items-center justify-center font-semibold uppercase tracking-wider text-accent transition-all duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            sizeClasses,
            className
          )}
          {...props}
        >
          <span>{children}</span>
          <span className="absolute bottom-0 left-0 h-[2px] w-full bg-accent origin-left transition-transform duration-150 ease-out group-hover:scale-x-110" />
        </button>
      );
    }

    if (variant === "secondary" || variant === "outline") {
      const sizeClasses = {
        sm: "text-xs py-2 px-4 gap-2",
        default: "text-sm py-3 px-6 gap-2.5",
        lg: "text-base py-4 px-8 gap-3",
      }[size];

      return (
        <button
          ref={ref}
          className={cn(
            "inline-flex items-center justify-center font-medium uppercase tracking-wider border border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background transition-colors duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            sizeClasses,
            className
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    if (variant === "accent-solid") {
      const sizeClasses = {
        sm: "text-xs py-2 px-4 gap-2",
        default: "text-sm py-3 px-6 gap-2.5",
        lg: "text-base py-4 px-8 gap-3",
      }[size];

      return (
        <button
          ref={ref}
          className={cn(
            "inline-flex items-center justify-center font-bold uppercase tracking-wider bg-accent text-accent-foreground hover:bg-accent-hover transition-colors duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
            sizeClasses,
            className
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    // Ghost
    const sizeClasses = {
      sm: "text-xs py-1.5 px-3 gap-1.5",
      default: "text-sm py-2 px-4 gap-2",
      lg: "text-base py-3 px-6 gap-2.5",
    }[size];

    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center text-mutedForeground hover:text-foreground font-medium uppercase tracking-wider transition-colors duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          sizeClasses,
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <span className="absolute bottom-0 left-0 h-[1px] w-full bg-foreground scale-x-0 origin-left transition-transform duration-150 ease-out group-hover:scale-x-100" />
      </button>
    );
  }
);
Button.displayName = "Button";
