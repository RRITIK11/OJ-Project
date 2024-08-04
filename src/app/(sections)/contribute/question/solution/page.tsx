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

const page = () => {
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
          Do you have any workable ideas or code you want to share? Link your
          playground or write your pseudocode here.
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
        
        <div className="w-full flex gap-2 my-2">
          <h1 className="font-bold text-3xl">Hint : </h1>
          <input
            type="text"
            placeholder="e.g. hint1,hint2,.."
            className="grow px-2 rounded-xl"
          />
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
        <div className="bg-gray-200 border-2 border-black text-sm p-4">
          <div>
            You can share a Playground link or write your pseudocode here!
          </div>
          <br />
          <div className="font-bold">Sample</div>
          <br />
          <div>The idea is</div>
          <div>
            {`When we iterate the array, we put target - current and index as (key, value) into a dictionary.
We check if the current number already exists in the dictionary. If it exists, then we have found the answer. If not, we keep searching until we find the answer or reach the end of the array.`}
          </div>
          <br />
          <pre className="bg-gray-400 ">
            {`class Solution(object):
  def twoSum(self, nums, target):
    match = {}
    for idx, n in enumerate(nums):
      if n not in match:
        match[target - n] = idx
      else:
        return match[n], idx
    return -1, -1`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default page;
