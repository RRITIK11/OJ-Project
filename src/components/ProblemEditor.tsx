"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FaLock } from "react-icons/fa";
import ProblemSection from "./ProblemPage/ProblemSection";
import Link from "next/link";
import { ProblemFormProvider } from "@/context/ProblemFormContext";

import CodeEditor from "./CodeEditor";
import InputOutputEditor from "./InputOutputEditor";
import { useAuth } from "@/context/AuthContext";

export default function ProblemEditor({ children }: any) {
  const { isAuthenticated } = useAuth();
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

        {isAuthenticated ? (
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
        ) : (
          <ResizablePanel defaultSize={50} className="overflow-scroll">
            <div className="bg-[#222222] flex flex-col justify-center items-center h-screen rounded-xl p-8">
              <div className="text-center mb-6 flex flex-col justify-center items-center">
                <FaLock className="text-6xl text-gray-400 mb-4" />
                <h1 className="text-2xl font-bold text-gray-200">
                  Login Required
                </h1>
              </div>
              <div className="flex gap-4">
                <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300">
                  Login
                </Link>
                <Link href="/signup" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300">
                  Sign Up
                </Link>
              </div>
            </div>
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
