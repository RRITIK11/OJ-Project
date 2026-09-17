"use client";

import * as React from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import {
  Code2,
  Copy,
  Check,
  FileInput,
  Play,
  RotateCcw,
  Terminal,
} from "lucide-react";
import { Language, sampleCode } from "@/config/constants";
import { useAuth } from "@/context/AuthContext";
import {
  editorDark,
  editorLight,
  languageExtension,
  languageLabels,
} from "@/lib/editorTheme";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/components/ProblemPage/Panel";
import { cn } from "@/lib/utils";

export default function PlaygroundPage() {
  const { isAuthenticated } = useAuth();
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "light" ? editorLight : editorDark;

  const [lang, setLang] = React.useState<Language>(Language.Cpp);
  const [code, setCode] = React.useState<string>(sampleCode[Language.Cpp]);
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [running, setRunning] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleRun = async () => {
    if (running) return;
    setRunning(true);
    setError("");
    try {
      const response = await axios.post("/api/run", { lang, code, input });
      setOutput(response.data.output ?? "");
    } catch (err: any) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Execution failed";
      setError(typeof message === "string" ? message : JSON.stringify(message));
      setOutput("");
      toast.error("Run failed");
    } finally {
      setRunning(false);
    }
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] w-full max-w-[1400px] flex-col gap-3 p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Playground</h1>
          <p className="text-xs text-muted-foreground">
            Try snippets in any supported language with custom input.
          </p>
        </div>
        {!isAuthenticated && (
          <p className="text-xs text-muted-foreground">
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>{" "}
            to run code.
          </p>
        )}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[3fr_2fr]">
        <Panel className="min-h-[360px]">
          <PanelHeader>
            <PanelTitle icon={Code2}>Code</PanelTitle>
            <div className="ml-auto flex items-center gap-1">
              <Select
                aria-label="Language"
                value={lang}
                onChange={(e) => {
                  const next = e.target.value as Language;
                  setLang(next);
                  setCode(sampleCode[next]);
                }}
                className="h-7 w-32 border-transparent bg-transparent text-xs shadow-none hover:bg-accent"
              >
                {Object.values(Language).map((l) => (
                  <option key={l} value={l}>
                    {languageLabels[l]}
                  </option>
                ))}
              </Select>
              <Button
                variant="ghost"
                size="icon-sm"
                title="Reset to template"
                aria-label="Reset code"
                className="text-muted-foreground"
                onClick={() => setCode(sampleCode[lang])}
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="sm"
                onClick={handleRun}
                loading={running}
                disabled={!isAuthenticated}
                className="ml-1"
              >
                {!running && <Play className="h-3.5 w-3.5" />}
                Run
              </Button>
            </div>
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

        <div className="grid min-h-0 grid-rows-2 gap-3">
          <Panel>
            <PanelHeader>
              <PanelTitle icon={FileInput}>Input</PanelTitle>
            </PanelHeader>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Standard input for your program"
              spellCheck={false}
              className="min-h-0 flex-1 resize-none rounded-none border-0 bg-transparent px-4 py-3 font-mono text-xs shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </Panel>

          <Panel>
            <PanelHeader>
              <PanelTitle icon={Terminal}>Output</PanelTitle>
              {output && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="ml-auto text-muted-foreground"
                  aria-label="Copy output"
                  onClick={copyOutput}
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-success" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              )}
            </PanelHeader>
            <pre
              className={cn(
                "min-h-0 flex-1 overflow-auto whitespace-pre-wrap break-words px-4 py-3 font-mono text-xs leading-relaxed",
                error && "text-destructive",
                !output && !error && "text-muted-foreground"
              )}
            >
              {error
                ? error
                : output
                ? output
                : running
                ? "Running…"
                : "Output will appear here after you run your code."}
            </pre>
          </Panel>
        </div>
      </div>
    </div>
  );
}
