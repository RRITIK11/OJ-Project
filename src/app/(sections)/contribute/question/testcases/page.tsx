"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { useAddProblemForm } from "@/context/AddProblemForm";
import TestCase from "@/components/ContributePage/TestCase";
import { Field, StepShell } from "@/components/ContributePage/StepShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TestCasesStep() {
  const {
    testCases,
    addTestcase,
    hints,
    setHints,
    constraints,
    setConstraints,
    followUp,
    setFollowUp,
    submitForm,
  } = useAddProblemForm();
  const [submitting, setSubmitting] = React.useState(false);

  const visibleCount = testCases.filter((t) => t.visible).length;

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await submitForm();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StepShell
      title="Test cases"
      description="Hidden cases decide the verdict. Visible cases are shown as examples on the problem page."
      backHref="/contribute/question/solution"
      onSubmit={handleSubmit}
      submitLabel="Submit for review"
      submitting={submitting}
      aside={
        <>
          <ul className="list-disc space-y-1 pl-4">
            <li>At least 3 cases, and at least 2 marked visible.</li>
            <li>Visible cases must include the expected output.</li>
            <li>Use the same format you described on the previous step.</li>
            <li>Only the first 5 visible cases are shown to solvers.</li>
          </ul>
          <p>
            An explanation on a visible case goes a long way towards making the
            question clear.
          </p>
          <p className="font-medium text-foreground">Hints</p>
          <p>
            Optional nudges for people who get stuck. Separate several hints
            with <code className="font-mono">###</code>.
          </p>
        </>
      }
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            Cases{" "}
            <span className="font-normal text-muted-foreground">
              ({testCases.length} total, {visibleCount} visible)
            </span>
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addTestcase}
          >
            <Plus className="h-3.5 w-3.5" />
            Add case
          </Button>
        </div>
        <div className="space-y-3">
          {testCases.map((testcase, index) => (
            <TestCase key={testcase.id} testcase={testcase} index={index} />
          ))}
        </div>
      </div>

      <Field
        label="Constraints"
        htmlFor="constraints"
        hint="Separate constraints with ###"
      >
        <Textarea
          id="constraints"
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          placeholder="1 <= n <= 10^5 ### -10^9 <= a[i] <= 10^9"
          className="min-h-[72px] font-mono text-xs"
        />
      </Field>

      <Field label="Hints" htmlFor="hints" hint="Separate hints with ###">
        <Textarea
          id="hints"
          value={hints}
          onChange={(e) => setHints(e.target.value)}
          placeholder="Think about what a hash map buys you ### Can you do it in one pass?"
          className="min-h-[72px]"
        />
      </Field>

      <Field label="Follow up" htmlFor="followUp">
        <Input
          id="followUp"
          value={followUp}
          onChange={(e) => setFollowUp(e.target.value)}
          placeholder="Can you solve it in O(n) time?"
        />
      </Field>
    </StepShell>
  );
}
