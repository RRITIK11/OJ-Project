"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  label: string;
  href: string;
}

export function Stepper({ steps }: { steps: Step[] }) {
  const pathname = usePathname();
  const currentIndex = Math.max(
    0,
    steps.findIndex(
      (s) => pathname === s.href || pathname.startsWith(s.href + "/")
    )
  );

  return (
    <ol className="flex items-center gap-2 overflow-x-auto no-visible-scrollbar">
      {steps.map((step, index) => {
        const done = index < currentIndex;
        const current = index === currentIndex;
        return (
          <li key={step.href} className="flex items-center gap-2">
            <Link
              href={step.href}
              className={cn(
                "flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-sm transition-colors",
                current
                  ? "bg-primary/10 font-medium text-primary"
                  : done
                  ? "text-foreground hover:bg-accent"
                  : "text-muted-foreground hover:bg-accent"
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                  current
                    ? "bg-primary text-primary-foreground"
                    : done
                    ? "bg-success text-success-foreground"
                    : "border bg-background text-muted-foreground"
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <span className="whitespace-nowrap">{step.label}</span>
            </Link>
            {index < steps.length - 1 && (
              <span
                className={cn(
                  "h-px w-6 shrink-0 sm:w-10",
                  index < currentIndex ? "bg-success" : "bg-border"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
