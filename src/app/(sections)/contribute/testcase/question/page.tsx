"use client";

import * as React from "react";
import Link from "next/link";
import axios from "axios";
import { ArrowRight, Check, Search } from "lucide-react";
import { StepShell } from "@/components/ContributePage/StepShell";
import { EmptyState } from "@/components/layout/EmptyState";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { problemSlug } from "@/lib/format";
import { cn } from "@/lib/utils";

interface ProblemRow {
  _id: string;
  number: string;
  title: string;
  difficulty: string;
}

export default function PickProblemStep() {
  const [problems, setProblems] = React.useState<ProblemRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<ProblemRow | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await axios.get("/api/problem/verifiedProblems");
        if (!cancelled) setProblems(response.data.problems ?? []);
      } catch {
        if (!cancelled) setProblems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = problems.filter((p) =>
    p.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <StepShell
      title="Which problem needs more cases?"
      description="Pick a verified problem. You will add inputs and expected outputs on the next step."
      backHref="/contribute"
      aside={
        <>
          <p>
            Good extra cases target edge conditions: empty input, maximum
            sizes, duplicates, negative numbers, and anything that broke your
            own first attempt.
          </p>
          <p>
            This flow is in preview. Cases you enter are not stored yet, but
            the interface is ready for when the review pipeline lands.
          </p>
        </>
      }
    >
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search problems"
          className="pl-8"
        />
      </div>

      <div className="max-h-[420px] space-y-1 overflow-y-auto rounded-lg border p-1">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5">
              <Skeleton className="h-4 w-6" />
              <Skeleton className="h-4 w-48" />
            </div>
          ))}

        {!loading && filtered.length === 0 && (
          <EmptyState
            title="No matching problems"
            description="Try a different search term."
            className="py-8"
          />
        )}

        {!loading &&
          filtered.map((p) => {
            const active = selected?._id === p._id;
            return (
              <button
                key={p._id}
                type="button"
                onClick={() => setSelected(p)}
                aria-pressed={active}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                  active ? "bg-primary/10 text-primary" : "hover:bg-accent"
                )}
              >
                <span className="w-8 shrink-0 font-mono text-xs text-muted-foreground">
                  {p.number}
                </span>
                <span className="flex-1 truncate font-medium">{p.title}</span>
                <DifficultyBadge
                  difficulty={p.difficulty}
                  className="px-2 py-0 text-[10px]"
                />
                {active && <Check className="h-4 w-4" />}
              </button>
            );
          })}
      </div>

      <div className="flex justify-end">
        <Button asChild disabled={!selected}>
          <Link
            href={
              selected
                ? `/contribute/testcase/testcases?problem=${problemSlug(
                    selected.title
                  )}`
                : "#"
            }
            aria-disabled={!selected}
            className={cn(!selected && "pointer-events-none opacity-50")}
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </StepShell>
  );
}
