"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface SegmentedTab {
  label: string;
  href?: string;
  value?: string;
  count?: number;
}

/**
 * Pill-style tab strip. Pass hrefs for route tabs, or values plus onChange
 * for local state tabs.
 */
export function SegmentedTabs({
  tabs,
  value,
  onChange,
  className,
  exact = false,
}: {
  tabs: SegmentedTab[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  exact?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border bg-muted/40 p-1",
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const active = tab.href
          ? exact
            ? pathname === tab.href
            : pathname === tab.href || pathname.startsWith(tab.href + "/")
          : tab.value === value;

        const classes = cn(
          "inline-flex h-8 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors",
          active
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        );

        const content = (
          <>
            {tab.label}
            {typeof tab.count === "number" && (
              <span
                className={cn(
                  "rounded-full px-1.5 text-[11px] leading-5",
                  active
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {tab.count}
              </span>
            )}
          </>
        );

        if (tab.href) {
          return (
            <Link
              key={tab.href}
              href={tab.href}
              role="tab"
              aria-selected={active}
              className={classes}
            >
              {content}
            </Link>
          );
        }

        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            className={classes}
            onClick={() => tab.value && onChange?.(tab.value)}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
