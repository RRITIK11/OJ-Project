"use client";

import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import { Code2, RotateCcw } from "lucide-react";
import { useProblemForm } from "@/context/ProblemFormContext";
import { Language, sampleCode } from "@/config/constants";
import {
  editorDark,
  editorLight,
  languageExtension,
  languageLabels,
} from "@/lib/editorTheme";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Panel, PanelHeader, PanelTitle } from "./ProblemPage/Panel";

export default function CodeEditor() {
  const { lang, updateLang, updateCode, code } = useProblemForm();
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "light" ? editorLight : editorDark;

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle icon={Code2}>Code</PanelTitle>
        <div className="ml-auto flex items-center gap-1">
          <Select
            aria-label="Language"
            value={lang}
            onChange={(e) => updateLang(e.target.value as Language)}
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
            aria-label="Reset code to template"
            onClick={() => updateCode(sampleCode[lang])}
            className="text-muted-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
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
          onChange={(value) => updateCode(value)}
          basicSetup={{
            foldGutter: false,
            highlightActiveLineGutter: true,
          }}
        />
      </div>
    </Panel>
  );
}
