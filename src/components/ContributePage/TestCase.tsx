"use client";

import { Trash2 } from "lucide-react";
import {
  type TestcaseInterface,
  useAddProblemForm,
} from "@/context/AddProblemForm";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TestCase({
  testcase,
  index,
}: {
  testcase: TestcaseInterface;
  index: number;
}) {
  const { deleteTestcase, updateTestcase } = useAddProblemForm();

  return (
    <div className="grid gap-3 rounded-lg border bg-muted/20 p-3 md:grid-cols-[1fr_1fr_1fr_auto]">
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">
          Input <span className="text-destructive">*</span>
        </p>
        <Textarea
          value={testcase.input}
          onChange={(e) =>
            updateTestcase({ ...testcase, input: e.target.value })
          }
          placeholder={`Case ${index + 1} input`}
          spellCheck={false}
          className="min-h-[72px] resize-y bg-background font-mono text-xs"
        />
      </div>
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">
          Output{" "}
          {testcase.visible && <span className="text-destructive">*</span>}
        </p>
        <Textarea
          value={testcase.output ?? ""}
          onChange={(e) =>
            updateTestcase({ ...testcase, output: e.target.value })
          }
          placeholder="Expected output"
          spellCheck={false}
          className="min-h-[72px] resize-y bg-background font-mono text-xs"
        />
      </div>
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">
          Explanation
        </p>
        <Textarea
          value={testcase.explanation ?? ""}
          onChange={(e) =>
            updateTestcase({ ...testcase, explanation: e.target.value })
          }
          placeholder="Optional, shown with visible cases"
          className="min-h-[72px] resize-y bg-background text-xs"
        />
      </div>
      <div className="flex items-center gap-3 md:flex-col md:items-end md:justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-xs font-medium">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-input accent-primary"
            checked={testcase.visible}
            onChange={(e) =>
              updateTestcase({ ...testcase, visible: e.target.checked })
            }
          />
          Visible
        </label>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Remove test case"
          className="text-muted-foreground hover:text-destructive"
          onClick={() => deleteTestcase(testcase.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
