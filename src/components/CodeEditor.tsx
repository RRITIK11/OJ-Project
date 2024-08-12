"use client"
import React, {useState} from "react";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { tags as t } from '@lezer/highlight';
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { useProblemForm } from "@/context/ProblemFormContext";
import { Language, sampleCode } from "@/config/constants";

const customTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#212121",
    foreground: "#d4d4d4",
    caret: "#d4d4d4",
    selection: "#264f78",
    selectionMatch: "#264f78",
    lineHighlight: "#2a2a2a",
    gutterBackground: "#1e1e1e",
    gutterForeground: "#8c8c8c",
  },
  styles: [
    { tag: t.comment, color: "#6a9955" },
    { tag: t.variableName, color: '#9cdcfe' },
    { tag: [t.string, t.special(t.brace)], color: '#ce9178' },
    { tag: t.number, color: '#b5cea8' },
    { tag: t.bool, color: '#569cd6' },
    { tag: t.null, color: '#569cd6' },
    { tag: t.keyword, color: '#c586c0' },
    { tag: t.operator, color: '#d4d4d4' },
    { tag: t.className, color: '#4ec9b0' },
    { tag: t.definition(t.typeName), color: '#4ec9b0' },
    { tag: t.typeName, color: '#4ec9b0' },
    { tag: t.angleBracket, color: '#d4d4d4' },
    { tag: t.tagName, color: '#569cd6' },
    { tag: t.attributeName, color: '#9cdcfe' },
  ],
});




function CodeEditor() {


  const {lang , updateLang,updateCode, code} = useProblemForm();


  const getLanguageExtension = (lang : Language) => {
    switch (lang) {
      case "javascript":
        return javascript({ jsx: true });
      case "c++":
        return cpp();
      case "python":
        return python();
      case "java":
        return java();
      default:
        return cpp();
    }
  };
  
  return (
    <div className="flex flex-col bg-[#212121] h-full rounded-[8px] overflow-hidden ">
      <header className="flex flex-row bg-[#333333] p-1 text-sm px-4">
        <div className="p-2 px-4 hover:bg-[#212121] rounded-xl">{`</> Code `}</div>

          <select name="language" value={lang} className="bg-[#333333]  dark:text-white text-black p-2 hover:bg-[#212121] rounded-xl" onChange={(e : any)=>{
            updateLang(e.target.value);
            updateCode(sampleCode[e.target.value])
          }}>
            <option value={Language.Cpp}>C++</option>
            <option value={Language.Python}>Python</option>
            <option value={Language.Java}>Java</option>
            <option value={Language.JavaScript}>Javascript</option>
          </select>
      </header>
      
      <div className="grow overflow-y-auto text-lg">
        <CodeMirror
          value={code}
          height="inherit"
          theme={customTheme}
          extensions={[getLanguageExtension(lang)]}
          onChange={(value, viewUpdate) => {
            updateCode(value)
          }}
          className="h-full"
        />
      </div>
    </div>
  );
}

export default CodeEditor;
