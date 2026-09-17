"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuid } from "uuid";
import { StepShell } from "@/components/ContributePage/StepShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { slugToTitle } from "@/lib/format";

interface DraftCase {
  id: string;
  input: string;
  output: string;
}

function newCase(): DraftCase {
  return { id: uuid(), input: "", output: "" };
}

function TestcasesForm() {
  const params = useSearchParams();
  const slug = params.get("problem") || "";
  const title = slug ? slugToTitle(slug) : "";
  const [cases, setCases] = React.useState<DraftCase[]>([
    newCase(),
    newCase(),
  ]);

  const update = (id: string, patch: Partial<DraftCase>) =>
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c))
    );

  const handleSubmit = () => {
    if (!slug) {
      toast.error("Pick a problem first");
      return;
    }
    const complete = cases.filter((c) => c.input.trim() && c.output.trim());
    if (complete.length === 0) {
      toast.error("Add at least one case with input and output");
      return;
    }
    toast("Test-case contributions are in preview. Nothing was saved yet.", {
      icon: "🚧",
    });
  };

  return (
    <StepShell
      title={title ? `Cases for “${title}”` : "Test cases"}
      description={
        slug
          ? "Each case needs an input and the exact expected output."
          : "No problem selected. Go back and pick one."
      }
      backHref="/contribute/testcase/question"
      onSubmit={handleSubmit}
      submitLabel="Submit for review"
      submitDisabled={!slug}
      aside={
        <>
          <p>
            Match the input and output format described on the problem page.
            Trailing whitespace is usually fine, but ordering and separators
            matter.
          </p>
          <p>
            Prefer a few sharp cases over many similar ones. Moderators will
            run them against the reference solution.
          </p>
        </>
      }
    >
      <div className="space-y-3">
        {cases.map((c, index) => (
          <div
            key={c.id}
            className="grid gap-3 rounded-lg border bg-muted/20 p-3 md:grid-cols-[1fr_1fr_auto]"
          >
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                Input {index + 1}
              </p>
              <Textarea
                value={c.input}
                onChange={(e) => update(c.id, { input: e.target.value })}
                spellCheck={false}
                className="min-h-[72px] resize-y bg-background font-mono text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                Expected output
              </p>
              <Textarea
                value={c.output}
                onChange={(e) => update(c.id, { output: e.target.value })}
                spellCheck={false}
                className="min-h-[72px] resize-y bg-background font-mono text-xs"
              />
            </div>
            <div className="flex items-start justify-end">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Remove case"
                className="text-muted-foreground hover:text-destructive"
                disabled={cases.length === 1}
                onClick={() =>
                  setCases((prev) => prev.filter((x) => x.id !== c.id))
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setCases((prev) => [...prev, newCase()])}
          disabled={cases.length >= 10}
        >
          <Plus className="h-3.5 w-3.5" />
          Add case
        </Button>
      </div>
    </StepShell>
  );
}

export default function TestcasesStep() {
  return (
    <React.Suspense fallback={null}>
      <TestcasesForm />
    </React.Suspense>
  );
}
