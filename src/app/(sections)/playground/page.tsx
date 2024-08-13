"use client";
import axios from "axios";
import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { Language } from "@/config/constants";
import { FaPlay } from "react-icons/fa";

type BoilerCode = {
  [key: string]: string;
};

function Compiler() {
  const boilerCode: BoilerCode = {
    "c++": `// Enter your code here
#include <iostream>
using namespace std;
int main() {
   cout << "Hello World" << endl;
   return 0;
}`,
    "java": `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
    "python": `print('Hello World')`,
    "javascript": `console.log('Hello World')`
  };

  const [code, setCode] = useState<string>(boilerCode["c++"]);
  const [lang, setLang] = useState<string>("c++");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleSubmit = async () => {
    setIsRunning(true);
    const payload = {
      lang,
      code,
      input
    };

    try {
      const response = await axios.post("/api/run", payload);
      setOutput(response.data.output);
    } catch (error: any) {
      console.error(error.response);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-950 text-gray-200">
      <h1 className="text-4xl font-bold mt-8 mb-6 text-center">Algo Galaxy Playground</h1>
      <div className="flex-1 w-full flex flex-col md:flex-row gap-4 p-4">
        {/* Code Editor */}
        <div className="flex-1 bg-gray-800 rounded-xl overflow-hidden ">
          <div className="px-4 py-2"> {"</>"} Code</div>
          <CodeMirror
            value={code}
            height="calc(100vh - 200px)" // Adjust height to account for header and other elements
            theme={vscodeDark}
            extensions={[javascript({ jsx: true })]}
            onChange={(code) => setCode(code)}
          />
        </div>
        {/* Code Controls */}
        <div className="flex-1 flex flex-col bg-gray-700 rounded-xl p-4">
          <select
            className="border border-gray-600 rounded-lg py-2 px-4 mb-4 bg-gray-800 text-gray-200"
            onChange={(e) => {
              const selectedLang: string = e.target.value;
              setLang(selectedLang);
              setCode(boilerCode[selectedLang] || "// Code not available");
            }}
          >
            <option value={Language.Cpp}>C++</option>
            <option value={Language.Python}>Python</option>
            <option value={Language.Java}>Java</option>
            <option value={Language.JavaScript}>JavaScript</option>
          </select>
          <textarea
            name="input"
            id="input"
            placeholder="Enter your Input here"
            className="border border-gray-600 rounded-lg p-2 mb-4 bg-gray-800 text-gray-200"
            rows={6}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex-grow bg-gray-800 p-4 rounded-md mb-4 overflow-auto">
            <p className="font-mono text-sm">{output}</p>
          </div>
          <button
            onClick={handleSubmit}
            type="button"
            className={`flex items-center justify-center p-2 bg-blue-600 rounded-lg text-white font-semibold transition duration-300 ${isRunning ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
            disabled={isRunning}
          >
            <FaPlay className="mr-2" size={18} />
            {isRunning ? "Running..." : "Run"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Compiler;
