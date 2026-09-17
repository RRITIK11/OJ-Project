"use client";

import * as React from "react";
import { Plus, X } from "lucide-react";
import { useProblemForm } from "@/context/ProblemFormContext";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function TestCaseSection() {
  const { testcases, addTestcase, updateTestcase, deleteTestcase } =
    useProblemForm();
  const [activeId, setActiveId] = React.useState<string | undefined>(
    testcases[0]?.id
  );

  React.useEffect(() => {
    if (!testcases.find((t) => t.id === activeId)) {
      setActiveId(testcases[0]?.id);
    }
  }, [testcases, activeId]);

  const active = testcases.find((t) => t.id === activeId);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-wrap items-center gap-2">
        {testcases.map((testcase, idx) => {
          const isActive = testcase.id === activeId;
          return (
            <div
              key={testcase.id}
              className={cn(
                "group inline-flex h-7 items-center overflow-hidden rounded-md border text-xs font-medium transition-colors",
                isActive
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "bg-muted/40 text-muted-foreground hover:text-foreground"
              )}
            >
              <button
                type="button"
                className="px-2.5"
                onClick={() => setActiveId(testcase.id)}
              >
                Case {idx + 1}
              </button>
              {testcases.length > 1 && (
                <button
                  type="button"
                  aria-label={`Remove case ${idx + 1}`}
                  className="flex h-full w-5 items-center justify-center border-l border-transparent opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                  onClick={() => deleteTestcase(testcase.id)}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          );
        })}

        {testcases.length < 6 && (
          <button
            type="button"
            onClick={addTestcase}
            aria-label="Add test case"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-dashed text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {active ? (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">Input</p>
          <Textarea
            value={active.input}
            onChange={(e) => updateTestcase(active.id, e.target.value)}
            className="min-h-[120px] resize-y font-mono text-xs"
            placeholder="Enter the input for this case"
            spellCheck={false}
          />
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          This problem has no visible test cases. Add one to try your code.
        </p>
      )}
    </div>
  );
}
