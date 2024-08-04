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
    <div className="h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} className="overflow-scroll">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={30}>
              <ProblemSection>
              {children}
            </ProblemSection>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle withHandle/>

          <ResizablePanel defaultSize={50} className="overflow-scroll">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={30}>
                <CodeEditor />
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={20}>
                <InputOutputEditor />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

        </ResizablePanelGroup>
    </div>
  );
}
