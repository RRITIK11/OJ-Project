"use client";

import { CheckSquare, Terminal, Gavel } from "lucide-react";
import { useProblemForm } from "@/context/ProblemFormContext";
import { cn } from "@/lib/utils";
import { Panel, PanelBody, PanelHeader, PanelTab } from "./ProblemPage/Panel";
import TestCaseSection from "./TestCase/TestCaseSection";
import TestResultSection from "./TestCase/TestResultSection";
import VerdictSection from "./TestCase/VerdictSection";

export default function InputOutputEditor() {
  const { result, showResult, resultWindow, setResultWindow } =
    useProblemForm();

  const accepted = result?.verdict === "Accepted";

  return (
    <Panel>
      <PanelHeader>
        <PanelTab
          active={resultWindow === "testcase"}
          onClick={() => setResultWindow("testcase")}
        >
          <CheckSquare className="h-3.5 w-3.5" />
          Test cases
        </PanelTab>
        <PanelTab
          active={resultWindow === "testresult"}
          onClick={() => setResultWindow("testresult")}
        >
          <Terminal className="h-3.5 w-3.5" />
          Test result
        </PanelTab>
        {showResult && result && (
          <PanelTab
            active={resultWindow === "verdict"}
            onClick={() => setResultWindow("verdict")}
          >
            <Gavel className="h-3.5 w-3.5" />
            <span
              className={cn(
                "font-semibold",
                accepted ? "text-success" : "text-destructive"
              )}
            >
              {result.verdict}
            </span>
          </PanelTab>
        )}
      </PanelHeader>
      <PanelBody>
        {resultWindow === "testcase" && <TestCaseSection />}
        {resultWindow === "testresult" && <TestResultSection />}
        {resultWindow === "verdict" && <VerdictSection />}
      </PanelBody>
    </Panel>
  );
}
