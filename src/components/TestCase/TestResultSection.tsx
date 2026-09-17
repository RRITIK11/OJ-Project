"use client";

import * as React from "react";
import { Play } from "lucide-react";
import type { VerdictInterface } from "@/app/api/run/[problemName]/route";
import { useProblemForm } from "@/context/ProblemFormContext";
import { EmptyState } from "@/components/layout/EmptyState";
import { CodeBlock } from "../ProblemPage/Panel";
import { cn } from "@/lib/utils";

export default function TestResultSection() {
  const { customOutput } = useProblemForm();
  const [current, setCurrent] = React.useState<VerdictInterface | undefined>();

  React.useEffect(() => {
    setCurrent(customOutput?.[0]);
  }, [customOutput]);

  if (!customOutput || customOutput.length === 0 || !current) {
    return (
      <EmptyState
        icon={Play}
        title="No results yet"
        description="Run your code against the test cases to see the output here."
        className="py-10"
      />
    );
  }

  const passed = customOutput.filter((c) => c.status === "Accepted").length;
  const allPassed = passed === customOutput.length;
  const currentPassed = current.status === "Accepted";

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <p
          className={cn(
            "text-sm font-semibold",
            allPassed ? "text-success" : "text-destructive"
          )}
        >
          {allPassed ? "All cases passed" : "Some cases failed"}
        </p>
        <p className="text-xs text-muted-foreground">
          {passed} / {customOutput.length} passed
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {customOutput.map((output, idx) => {
          const isActive = output.id === current.id;
          const ok = output.status === "Accepted";
          return (
            <button
              key={output.id}
              type="button"
              onClick={() => setCurrent(output)}
              className={cn(
                "inline-flex h-7 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition-colors",
                isActive
                  ? "bg-background shadow-sm ring-1 ring-border"
                  : "bg-muted/40 text-muted-foreground hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  ok ? "bg-success" : "bg-destructive"
                )}
              />
              Case {idx + 1}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3">
        <CodeBlock label="Input" value={current.input} />
        <CodeBlock
          label="Output"
          value={current.output}
          tone={currentPassed ? "success" : "destructive"}
        />
        <CodeBlock label="Expected" value={current.expected} />
      </div>
    </div>
  );
}
