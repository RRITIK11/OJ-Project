"use client";

import { CheckCircle2, Gavel, XCircle } from "lucide-react";
import { useProblemForm } from "@/context/ProblemFormContext";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/layout/EmptyState";
import { CodeBlock } from "../ProblemPage/Panel";
import { cn } from "@/lib/utils";

export default function VerdictSection() {
  const { result } = useProblemForm();

  if (!result) {
    return (
      <EmptyState
        icon={Gavel}
        title="No verdict yet"
        description="Submit your solution to run it against every test case."
        className="py-10"
      />
    );
  }

  const accepted = result.verdict === "Accepted";
  const total = result.Result.totalTestCase || 0;
  const passed = result.Result.totalTestCasePassed || 0;
  const pct = total > 0 ? (passed / total) * 100 : 0;

  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className={cn(
            "flex items-center gap-2 text-base font-semibold",
            accepted ? "text-success" : "text-destructive"
          )}
        >
          {accepted ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <XCircle className="h-5 w-5" />
          )}
          {result.verdict}
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="font-mono text-foreground">
            {passed} / {total}
          </span>{" "}
          test cases passed
        </p>
      </div>

      <Progress
        value={pct}
        indicatorClassName={accepted ? "bg-success" : "bg-destructive"}
      />

      {accepted ? (
        <div className="rounded-lg border border-success/30 bg-success/5 px-4 py-6 text-center">
          <p className="text-sm font-medium">All test cases passed.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Your submission has been recorded. Nice work.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground">
            First failing test case
          </p>
          <CodeBlock
            label="Input"
            value={result.Result.firstFailedTestCase?.input}
          />
          <CodeBlock
            label="Your output"
            value={result.Result.firstFailedTestCase?.output}
            tone="destructive"
          />
          <CodeBlock
            label="Expected"
            value={result.Result.firstFailedTestCase?.expected}
            tone="success"
          />
        </div>
      )}
    </div>
  );
}
