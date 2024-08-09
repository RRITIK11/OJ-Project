"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ProblemSection from "./ProblemPage/ProblemSection";
import Link from "next/link";
import { ProblemFormProvider } from "@/context/ProblemFormContext";

import CodeEditor from "./CodeEditor";
import InputOutputEditor from "./InputOutputEditor";

export default function ProblemEditor({children }: any) {
  return (
      <div className="h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} className="overflow-scroll">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={30}>
                <ProblemSection>{children}</ProblemSection>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* need to update soon for dynamic route  */}
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
