"use client";

import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useTheme } from "next-themes";
import { Difficulty } from "@/config/constants";
import { useAddProblemForm } from "@/context/AddProblemForm";
import { Field, StepShell } from "@/components/ContributePage/StepShell";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function QuestionStep() {
  const { resolvedTheme } = useTheme();
  const {
    title,
    setTitle,
    difficulty,
    setDifficulty,
    description,
    setDescription,
  } = useAddProblemForm();

  return (
    <StepShell
      title="Name and describe the question"
      description="Write the statement the way you would want to read it. Markdown is supported."
      backHref="/contribute/question/background"
      nextHref="/contribute/question/solution"
      aside={
        <>
          <p className="font-medium text-foreground">
            Great titles are concise, descriptive and specific.
          </p>
          <ul className="space-y-1">
            <li className="text-destructive/80">✗ Find Substring</li>
            <li className="text-success">✓ Shortest Unsorted Continuous Subarray</li>
          </ul>
          <p>
            Check the problem set first so you are not duplicating an existing
            question.
          </p>
          <p className="font-medium text-foreground">Sample statement</p>
          <p>
            Given an array of integers, return indices of the two numbers such
            that they add up to a specific target. You may assume each input has
            exactly one solution, and you may not use the same element twice.
          </p>
          <pre className="whitespace-pre-wrap rounded-md border bg-background p-2 font-mono text-xs">
            {`Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]`}
          </pre>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-[1fr_200px]">
        <Field label="Title" htmlFor="title" required>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Two Sum"
          />
        </Field>
        <Field label="Suggested difficulty" htmlFor="difficulty" required>
          <Select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          >
            <option value={Difficulty.Easy}>Easy</option>
            <option value={Difficulty.Medium}>Medium</option>
            <option value={Difficulty.Hard}>Hard</option>
          </Select>
        </Field>
      </div>

      <Field label="Description" required>
        <div data-color-mode={resolvedTheme === "light" ? "light" : "dark"}>
          <MDEditor
            value={description}
            onChange={(value) => setDescription(value || "")}
            height={440}
            visibleDragbar={false}
            previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
          />
        </div>
      </Field>
    </StepShell>
  );
}
