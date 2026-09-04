import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  highlighted?: boolean;
  bordered?: boolean;
}

export function Card({
  className,
  highlighted = false,
  bordered = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative transition-colors duration-150",
        bordered && "border border-border hover:border-border-hover",
        highlighted && "border-2 border-accent hover:border-accent bg-[#0f0a09]/50",
        "bg-transparent p-6 md:p-8",
        className
      )}
      {...props}
    >
      {highlighted && (
        <div className="absolute -top-[2px] left-8 h-1 w-16 bg-accent" />
      )}
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-2 mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-xl md:text-2xl font-bold tracking-tight text-foreground", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-mutedForeground tracking-normal", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-base text-foreground", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-6 pt-4 border-t border-border flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  );
}
