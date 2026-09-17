"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import ProblemSection from "./ProblemPage/ProblemSection";
import CodeEditor from "./CodeEditor";
import InputOutputEditor from "./InputOutputEditor";
import { Panel } from "./ProblemPage/Panel";

function LoginRequired() {
  return (
    <Panel className="items-center justify-center bg-muted/20">
      <div className="flex max-w-xs flex-col items-center gap-4 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Lock className="h-5 w-5" />
        </span>
        <div className="space-y-1">
          <p className="text-sm font-medium">Log in to start coding</p>
          <p className="text-sm text-muted-foreground">
            The editor, test runner and submissions are available to signed-in
            members.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/signup">Create account</Link>
          </Button>
        </div>
      </div>
    </Panel>
  );
}

export default function ProblemEditor({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={45} minSize={25}>
        <ProblemSection>{children}</ProblemSection>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={55} minSize={30}>
        {isAuthenticated ? (
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={62} minSize={20}>
              <CodeEditor />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={38} minSize={15}>
              <InputOutputEditor />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <LoginRequired />
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
