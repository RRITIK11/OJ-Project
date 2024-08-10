"use client";
import React, { useState } from "react";
import Link from "next/link";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { tags as t } from "@lezer/highlight";
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
    { tag: t.variableName, color: "#9cdcfe" },
    { tag: [t.string, t.special(t.brace)], color: "#ce9178" },
    { tag: t.number, color: "#b5cea8" },
    { tag: t.bool, color: "#569cd6" },
    { tag: t.null, color: "#569cd6" },
    { tag: t.keyword, color: "#c586c0" },
    { tag: t.operator, color: "#d4d4d4" },
    { tag: t.className, color: "#4ec9b0" },
    { tag: t.definition(t.typeName), color: "#4ec9b0" },
    { tag: t.typeName, color: "#4ec9b0" },
    { tag: t.angleBracket, color: "#d4d4d4" },
    { tag: t.tagName, color: "#569cd6" },
    { tag: t.attributeName, color: "#9cdcfe" },
  ],
});

const Solution = () => {
  const [language, setLanguage] = useState("c++");
  const getLanguageExtension = (lang: string) => {
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
    <div className="w-full flex flex-row text-black h-screen overflow-hidden">
      {/* left-section */}
      <div className="w-[60%] flex flex-col px-8 mt-[100px]">
        <h1 className="font-bold text-3xl">Share your solution *</h1>
        <div className="text-lg">
          Give correct solution of your question...
        </div>

        <div className="flex flex-col bg-[#212121] grow rounded-xl overflow-hidden">
          <header className="flex flex-row bg-[#333333] p-2 gap-4 text-sm px-4">
            <div>{`</> Code `}</div>
            <div className="bg-none dark:text-white text-black">
              <select
                name="language"
                className="bg-[#333333]"
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
              >
                <option value="c++">C++</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="javascript">Javascript</option>
              </select>
            </div>
          </header>
          <div className="overflow-y-auto grow">
            <CodeMirror
              value="//Write your code here..."
              height="inherit"
              theme={customTheme}
              extensions={[getLanguageExtension(language)]}
              onChange={(value, viewUpdate) => {
                console.log("value:", value);
              }}
            />
          </div>
        </div>
        <div className="flex gap-2 ">
        <div className="w-[50%] flex flex-col gap-2 my-2">
          <h1 className="font-bold text-xl">Input Format: </h1>
          <textarea
            placeholder={`[statement1, statement2, statement3,...]`}
            className="grow p-2 rounded-xl"
          />
        </div>
        <div className="w-[50%] flex flex-col gap-2 my-2">
          <h1 className="font-bold text-xl">Output Format: </h1>
          <textarea
            placeholder={`[statement1, statement2, statement3,...]`}
            className="grow p-2 rounded-xl"
          />
        </div>

        </div>
        
        

        <div className="w-full p-2">
          <div className="flex flex-row justify-between px-10 py-2">
            <Link href="/contribute/question/question">
              <div className="flex justify-center items-center w-14 h-14 bg-[#756D61] rounded-full font-bold text-white">
                {"<"}
              </div>
            </Link>
            <Link href="/contribute/question/testcases">
              <div className="flex justify-center items-center w-14 h-14 bg-[#756D61] rounded-full font-bold text-white">
                {">"}
              </div>
            </Link>
          </div>
        </div>

      </div>

      {/* righ-section */}
      <div className="w-[40%] bg-[#8e816d] flex flex-col justify-center items-center p-12">
        <div className="bg-gray-200 border-2 border-black text-sm p-4 rounded-xl">
          <div>
            Write your code and give input and output format!
          </div>
          <br />
          <div className="font-bold text-blue">Sample</div>
          <br />
          <div>The idea is</div>
          <div>
            {`You have to give correct solution for your question in any language you want. As Verdit is done based on your code output comparison.`}
          </div>
          <div>Tip : Run your code on <Link href="/compiler" className="font-bold text-blue-600 hover:text-blue-400">Playground</Link> before submitting and check for variour testcases and edge cases.</div>
          <br />
          <div>Language : C++</div>
          <pre className="bg-gray-400 ">
            {`#include <bits/stdc++.h>
using namespace std;

int main(){
  //your logic comes here
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Solution;
