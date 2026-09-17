"use client";

import Link from "next/link";
import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import { Code2 } from "lucide-react";
import { Language } from "@/config/constants";
import { useAddProblemForm } from "@/context/AddProblemForm";
import {
  editorDark,
  editorLight,
  languageExtension,
  languageLabels,
} from "@/lib/editorTheme";
import { Field, StepShell } from "@/components/ContributePage/StepShell";
import { Panel, PanelHeader, PanelTitle } from "@/components/ProblemPage/Panel";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function SolutionStep() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "light" ? editorLight : editorDark;
  const {
    code,
    setCode,
    lang,
    setLang,
    inputFormat,
    setInputFormat,
    outputFormat,
    setOutputFormat,
  } = useAddProblemForm();

  return (
    <StepShell
      title="Share a reference solution"
      description="Verdicts are produced by comparing user output with the output of this program."
      backHref="/contribute/question/question"
      nextHref="/contribute/question/testcases"
      aside={
        <>
          <p>
            Write a complete program in any supported language. It should read
            from standard input and print to standard output.
          </p>
          <p>
            Try it in the{" "}
            <Link
              href="/playground"
              className="font-medium text-primary hover:underline"
            >
              playground
            </Link>{" "}
            with a few edge cases before submitting.
          </p>
          <p className="font-medium text-foreground">Skeleton (C++)</p>
          <pre className="whitespace-pre-wrap rounded-md border bg-background p-2 font-mono text-xs">
            {`#include <bits/stdc++.h>
using namespace std;

int main() {
  // read input, compute, print
}`}
          </pre>
          <p>
            Input and output formats are shown to solvers. Separate individual
            statements with <code className="font-mono">###</code>.
          </p>
        </>
      }
    >
      <Field label="Solution" required>
        <Panel className="h-[420px]">
          <PanelHeader>
            <PanelTitle icon={Code2}>Code</PanelTitle>
            <Select
              aria-label="Language"
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              containerClassName="ml-auto"
              className="h-7 w-32 border-transparent bg-transparent text-xs shadow-none hover:bg-accent"
            >
              {Object.values(Language).map((l) => (
                <option key={l} value={l}>
                  {languageLabels[l]}
                </option>
              ))}
            </Select>
          </PanelHeader>
          <div className="min-h-0 flex-1 overflow-hidden">
            <CodeMirror
              value={code}
              height="100%"
              className="h-full"
              theme={theme}
              extensions={[languageExtension(lang)]}
              onChange={(value) => setCode(value)}
              basicSetup={{ foldGutter: false }}
            />
          </div>
        </Panel>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Input format"
          htmlFor="inputFormat"
          hint="Separate statements with ###"
        >
          <Textarea
            id="inputFormat"
            value={inputFormat}
            onChange={(e) => setInputFormat(e.target.value)}
            placeholder="First line contains n ### Second line contains n integers"
            className="min-h-[96px] font-mono text-xs"
          />
        </Field>
        <Field
          label="Output format"
          htmlFor="outputFormat"
          hint="Separate statements with ###"
        >
          <Textarea
            id="outputFormat"
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            placeholder="Print a single integer"
            className="min-h-[96px] font-mono text-xs"
          />
        </Field>
      </div>
    </StepShell>
  );
}
