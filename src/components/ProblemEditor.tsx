"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ProblemSection from "./ProblemPage/ProblemSection";
import Link from "next/link";

import CodeEditor from "./CodeEditor";
import InputOutputEditor from "./InputOutputEditor";

export default function ProblemEditor({ className, children }: any) {
  return (
    <div className={`${className}`}>
        <ResizablePanelGroup direction="horizontal" className="gap-1">
          <ResizablePanel defaultSize={50}>
            <ProblemSection>
              {children}
            </ProblemSection>
          </ResizablePanel>

          <ResizableHandle withHandle/>

          <ResizablePanel defaultSize={50} className="overflow-scroll">
            <ResizablePanelGroup direction="vertical" className="gap-1">
              <ResizablePanel defaultSize={40}>
                <CodeEditor />
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={10}>
                <InputOutputEditor />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  );
}
