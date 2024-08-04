"use client"
import React, {useState} from "react";
import CodeMirror from "@uiw/react-codemirror";

import { createTheme } from "@uiw/codemirror-themes";

import { tags as t } from '@lezer/highlight';
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";



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


function page() {
  const [language, setLanguage] = useState("c++");
  const getLanguageExtension = (lang : string) => {
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
    <div className='flex items-center justify-center h-full'>
      no data
    </div>
  )
}

export default page