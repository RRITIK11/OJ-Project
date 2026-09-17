import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg border bg-card",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PanelHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-10 shrink-0 items-center gap-1 border-b bg-muted/40 px-1.5",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PanelBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-0 flex-1 overflow-y-auto", className)}>
      {children}
    </div>
  );
}

const tabClasses = (active: boolean, disabled?: boolean) =>
  cn(
    "inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors",
    active
      ? "bg-background text-foreground shadow-sm ring-1 ring-border"
      : "text-muted-foreground hover:text-foreground",
    disabled && "pointer-events-none opacity-40"
  );

export function PanelTab({
  active,
  href,
  onClick,
  children,
  disabled,
  className,
}: {
  active: boolean;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(tabClasses(active, disabled), className)}
        aria-current={active ? "page" : undefined}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(tabClasses(active, disabled), className)}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

export function PanelTitle({
  icon: Icon,
  children,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 px-2 text-xs font-medium text-foreground">
      {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
      {children}
    </span>
  );
}

/** Monospace read-only block used for inputs, outputs and expected values. */
export function CodeBlock({
  label,
  value,
  className,
  tone = "default",
}: {
  label?: string;
  value?: string | number | null;
  className?: string;
  tone?: "default" | "success" | "destructive";
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
      )}
      <pre
        className={cn(
          "min-h-[2.5rem] overflow-x-auto whitespace-pre-wrap break-words rounded-md border bg-muted/50 px-3 py-2 font-mono text-xs leading-relaxed",
          tone === "success" && "border-success/30 bg-success/5",
          tone === "destructive" && "border-destructive/30 bg-destructive/5"
        )}
      >
        {value === undefined || value === null || value === "" ? (
          <span className="text-muted-foreground">(empty)</span>
        ) : (
          String(value)
        )}
      </pre>
    </div>
  );
}
