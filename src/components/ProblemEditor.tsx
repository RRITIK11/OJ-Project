"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import CodeEditor from "./CodeEditor";
import InputOutputEditor from "./InputOutputEditor";

export default function ProblemEditor({ className, loading ,children}: any) {
  return (
    <div>
        <div className={className}>
          <ResizablePanelGroup direction="horizontal" className="gap-1">
            <ResizablePanel defaultSize={50}>
              {children}
            </ResizablePanel>

            <ResizableHandle withHandle className="" />

            <ResizablePanel defaultSize={50} className="overflow-scroll">
              <ResizablePanelGroup direction="vertical" className="gap-1">
                <ResizablePanel
                  defaultSize={40}
                >
                  {loading ? <div>loading</div> : <CodeEditor/>}
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel
                  defaultSize={10}>
                  {loading ? <div>loading</div> : <InputOutputEditor/>}
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
    </div>
  );
}
